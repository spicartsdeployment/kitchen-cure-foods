from fastapi import APIRouter
from app.db.mongo import db
from app.models.product import ProductResponse
# from app.services.auth import role_required

router = APIRouter(prefix="/products", tags=["Products"])

@router.get("/", response_model=list[ProductResponse])
# @role_required("admin")
async def get_products(current_user):
    products_cursor = db.products.find()
    products = []
    async for product in products_cursor:
        products.append(ProductResponse(
            id=str(product["_id"]),
            name=product["name"],
            price=product["price"]
        ))
    return products

@router.get("/special")
# @role_required("admin", "manager")
async def special_access(current_user):
    return {"message": f"Welcome {current_user['username']} with role {current_user['role']}!"}
