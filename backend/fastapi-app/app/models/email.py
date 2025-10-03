from typing import List, Optional, Annotated
from pydantic import BaseModel, EmailStr, Field

class EmailMessage(BaseModel):
    name: str
    email: EmailStr
    phone: Annotated[str, Field(pattern=r'^\+?\d{7,15}$')]
    category: str
    subject: str
    message: str

class ScheduleAppointment(BaseModel):
    name: str
    email: EmailStr
    phone: Annotated[str, Field(pattern=r'^\+?\d{7,15}$')]
    message: str
    
class ConsultationForm(BaseModel):
    # Personal Information
    name: str
    email: EmailStr
    phone: Annotated[str, Field(pattern=r'^\+?\d{7,15}$')]   # phone regex
    age: Annotated[int, Field(ge=1, le=120)]                 # integer range
    gender: Optional[str]
    height: Annotated[float, Field(ge=30, le=300)]           # cm
    weight: Annotated[float, Field(ge=2, le=500)]            # kg

    # Health & Lifestyle Information
    description: Optional[str] = None
    allergies: Optional[str] = None
    dietaryPreferences: Optional[str] = None
    sleepPattern: Optional[str] = None
    physical: Optional[str] = None

    # Goals & Consultation Preferences
    primaryHealthGoalsCheckbox: List[str]
    preferredConsultationTypeRadio: Optional[str] = None
    preferredLanguage: Optional[str] = None
    bestTimeForConsultation: Optional[str] = None