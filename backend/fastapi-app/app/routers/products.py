from fastapi import APIRouter, HTTPException, Depends, status
from app.models.products import Product
from app.db.mongo import db
from bson import ObjectId

router = APIRouter(prefix="/products", tags=["Products"])

@router.get("/getProducts")
async def get_products():
    products = await db.products.find().to_list(100)
    for p in products:
        p["_id"] = str(p["_id"])
    return products

@router.get("/{id}")
async def get_product(id: str):
    # Validate ObjectId
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid Product ID")

    # Fetch product from DB
    product = await db.products.find_one({"_id": ObjectId(id)})
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")

    # Convert ObjectId to string
    product["_id"] = str(product["_id"])
    
    return {"product": product}

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