import sqlite3
import datetime

from fastapi import FastAPI, Response, status

from .models import Plant, WateringEvent

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

    for row in context["db_cursor"].execute("SELECT * FROM plants"):
        plant = Plant(
            id=int(row["id"]),
            name=row["name"],
            species=row["species"],
            sell_price=float(row["sell_price"]),
            watering_interval_days=int(row["watering_interval_days"])
        )
        all_plants.append(plant)
    
    return all_plants


@app.post("/watering_events", status_code=201)
def water_plant(event: WateringEvent, res: Response):
    # is it time to water this plant?
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