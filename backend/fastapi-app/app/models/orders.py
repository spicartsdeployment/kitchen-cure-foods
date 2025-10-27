from pydantic import BaseModel, EmailStr

class CreateOrder(BaseModel):
    email: EmailStr
    paymentId: str
    items: list
    subtotal: float
    tax: float
    totalAmount: float
    status: str
