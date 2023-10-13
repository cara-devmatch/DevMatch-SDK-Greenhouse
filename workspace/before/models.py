from pydantic import BaseModel

class Plant(BaseModel):
    id: int
    name: str
    species: str
    sell_price: float
    watering_interval_days: int


class WateringEvent(BaseModel):
    plant_id: int
    event_date: str