from typing import Literal
from pydantic import BaseModel

class Plant(BaseModel):
    id: int
    name: str
    species: str
    sell_price: float
    watering_interval_days: int
    is_sold: bool


class GenericEvent(BaseModel):
    event_type: Literal["watering", "sales"]
    event_date: str


class WateringEvent(BaseModel):
    plant_id: int
    event_date: str


class SalesEvent(BaseModel):
    plant_id: int
    customer_name: str
    event_date: str