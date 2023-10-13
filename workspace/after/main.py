import sqlite3
import datetime

from fastapi import FastAPI, Response, status

from .models import Plant, WateringEvent, SalesEvent, GenericEvent

context: dict[str, any] = {}

@asynccontextmanager
async def lifespan(app: FastAPI):
    # startup events
    con = sqlite3.connect("greenhouse.db", autocommit=True)
    cur = con.cursor()
    context["db_cursor"] = cur
    yield

    # shutdown events
    con.close()


app = FastAPI(lifespan=lifespan)


@app.get("/plants", status_code=200)
def get_plants() -> list[Plant]:
    all_plants: list[Plant] = []

    for row in context["db_cursor"].execute("SELECT plant.* FROM plants WHERE plant.id NOT IN (SELECT plant_id FROM sales_events)"):
        plant = Plant(
            id=int(row["id"]),
            name=row["name"],
            species=row["species"],
            sell_price=float(row["sell_price"]),
            watering_interval_days=int(row["watering_interval_days"])
        )
        all_plants.append(plant)
    
    return all_plants


@app.post("/sales_events", status_code=201)
def sell_plant(event: SalesEvent, res: Response):
    # does the plant exist?
    plant = context["db_cursor"].execute(
        "SELECT * FROM plants WHERE id=?",
        (event.plant_id)
        ).fetchone()
    if plant is None:
        res.status_code = status.HTTP_404_NOT_FOUND
        return {"message": "Plant not found"}

    # has the plant already been sold?
    sold_events = context["db_cursor"].execute(
        "SELECT * FROM sales_events WHERE plant_id=?",
        (event.plant_id)
        ).fetchone()
    if sold_events is not None:
        res.status_code = status.HTTP_403_FORBIDDEN
        return {"message": "Plant is already sold"}
    
    # sell the plant
    context["db_cursor"].execute(
        "INSERT INTO sales_events(plant_id, customer_name, event_date) VALUES (?, ?, ?)",
        (event.plant_id, event.customer_name, event.event_date)
        )


@app.post("/watering_events", status_code=201)
def water_plant(event: WateringEvent, res: Response):
    # does the plant exist?
    plant = context["db_cursor"].execute(
        "SELECT * FROM plants WHERE id=?",
        (event.plant_id)
        ).fetchone()
    if plant is None:
        res.status_code = status.HTTP_404_NOT_FOUND
        return {"message": "Plant not found"}
    
    watering_interval = int(plant["watering_interval_days"])
    # when was it last watered?
    last_watered_event = context["db_cursor"].execute(
        "SELECT * FROM watering_events WHERE plant_id=? ORDER BY event_date DESC",
        (event.plant_id)
        ).fetchone()

    last_watered = datetime.strptime(last_watered_event["event_date"], "%d/%m/%y %H:%M:%S.%f")
    event_watering_datetime = datetime.strptime(event.event_date, "%d/%m/%y %H:%M:%S.%f")
    if last_watered + datetime.timedelta(days=watering_interval) > event_watering_datetime:
        res.status_code = status.HTTP_403_FORBIDDEN
        return {"message": "This plant has been watered too recently"}

    # plant exists and can be watered
    context["db_cursor"].execute(
        "INSERT INTO watering_events(plant_id, event_date) VALUES (?, ?)",
        (event.plant_id, event.event_date)
        )


@app.get("/plant/{plant_id}/events", status_code=200)
def all_plant_events(plant_id: int, res: Response) -> list[GenericEvent]:
    # does the plant exist?
    plant = context["db_cursor"].execute(
        "SELECT * FROM plants WHERE id=?",
        (plant_id)
        ).fetchone()
    if plant is None:
        res.status_code = status.HTTP_404_NOT_FOUND
        return {"message": "Plant not found"}
    
    watering_events = context["db_cursor"].execute(
        "SELECT event_date FROM watering_events WHERE plant_id=? ORDER BY event_date DESC",
        (plant_id)
        )
    
    sales_events = context["db_cursor"].execute(
        "SELECT event_date FROM sales_events WHERE plant_id=? ORDER BY event_date DESC",
        (plant_id)
        )

    result: list[GenericEvent] = []
    for row in watering_events:
        e = GenericEvent("watering", row["event_date"])
        result.append(e)
    
    for row in sales_events:
        e = GenericEvent("sales", row["event_date"])
        result.append(e)
    
    return result