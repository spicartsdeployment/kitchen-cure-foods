from pydantic import BaseModel, EmailStr

class EmailMessage(BaseModel):
    name: str
    email: EmailStr
    phone: str
    category: str
    subject: str
    message: str

class ScheduleAppointment(BaseModel):
    name: str
    email: EmailStr
    phone: str
    message: str