from fastapi import APIRouter
from app.models.products import Product
from app.db.mongo import db
# import razorpay, os

router = APIRouter(prefix="/products", tags=["Products"])

@router.get("/get")
async def get_products():
    products = await db.products.find().to_list(100)
    for p in products:
        p["_id"] = str(p["_id"])
    return products

@router.post("/create")
async def add_product(product: Product):
    result = await db.products.insert_one(product.dict())
    return {"inserted_id": str(result.inserted_id)}

# @router.post("/create-order")
# async def create_order(data: dict):
#     order = razorpay_client.order.create({
#         "amount": data["amount"] * 100,
#         "currency": "INR",
#         "payment_capture": 1
#     })
#     return order