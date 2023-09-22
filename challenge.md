# The Greenhouse

Your friends own a large greenhouse, and recently set up some great technology that can care for plants at the push of a button! However, they could use some help putting together an API so they can interact with their new technology from afar. You've decided to use Python's FastAPI framework to build this REST API for them, and store the data in a SQL database.

# Plant Inventory

It's important that your friends can check up on the status of their plants. Plants have an ID, name (your friends treat their plants like family), species, sell price, and watering interval (in days).Create a GET endpoint at `/plants` that returns all of this information in a JSON format like so:

```json
[
    {
        "id": 3,
        "name": "Frederick",
        "species": "rainbow carrot",
        "sell_price": 6.50,
        "watering_interval": 2
    }
]
```
