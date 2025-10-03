from fastapi import APIRouter, Form, HTTPException, status
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import smtplib
import os
import json
from app.models.email import EmailMessage, ScheduleAppointment, ConsultationForm
from app.core.logger import logger
from app.db.mongo import db

router = APIRouter(prefix="/email", tags=["Email"])

SMTP_HOST: str = os.getenv("SMTP_HOST","")
SMTP_PORT: str = os.getenv("SMTP_PORT","")
SMTP_USERNAME: str = os.getenv("SMTP_USERNAME","")
SMTP_PASSWORD: str = os.getenv("SMTP_PASSWORD","")
SMTP_FROM: str = os.getenv("SMTP_FROM","")
SMTP_TO: str = os.getenv("SMTP_TO","")

# SMTP Server details
smtp_server = SMTP_HOST
port = SMTP_PORT
login = SMTP_USERNAME
password = SMTP_PASSWORD

sender_email = SMTP_FROM
receiver_email = SMTP_TO

@router.post("/send-message/")
async def send_message(form: EmailMessage):
    
    try:  
        name = form.name
        email = form.email
        message = form.message
        phone = form.phone
        category = form.category
        subject = form.subject
              
        # Build the email
        msg = MIMEMultipart("alternative")
        msg["Subject"] = f"New Message: {subject}"
        msg["From"] = email
        msg["To"] = receiver_email

        # Plain text fallback
        text_body = f"""
        New Message Received

        From: {name}
        Email: {email}
        Phone: {phone}
        Category: = {category}

        Message:
        {message}
        """

        # HTML Body with inline CSS
        html_body = f"""
        <html>
          <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
            <table width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
              <tr>
                <td style="padding: 20px; text-align: center; background: #4f46e5; color: #ffffff; border-radius: 8px 8px 0 0;">
                  <h2 style="margin: 0;">New Message Received</h2>
                </td>
              </tr>
              <tr>
                <td style="padding: 20px; color: #333;">
                  <p><strong>From:</strong> {name}</p>
                  <p><strong>Email:</strong> {email}</p>
                  <p><strong>Phone:</strong> {phone}</p>
                  <p><strong>Category:</strong> {category}</p>
                  <p><strong>Message:</strong></p>
                  <div style="background: #f3f4f6; padding: 15px; border-radius: 6px; color: #111;">
                    {message}
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding: 15px; text-align: center; font-size: 12px; color: #888;">
                  This email was sent automatically by FastAPI Demo.
                </td>
              </tr>
            </table>
          </body>
        </html>
        """

        # Attach both plain text and HTML versions
        msg.attach(MIMEText(text_body, "plain"))
        msg.attach(MIMEText(html_body, "html"))

        # Send email
        with smtplib.SMTP(smtp_server, port) as server:
            server.set_debuglevel(1)  # shows SMTP logs
            server.esmtp_features["auth"] = "LOGIN PLAIN"
            server.login(login, password)
            server.sendmail(sender_email, receiver_email, msg.as_string())

        return {"status": "success", "message": "Message sent successfully"}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to send enquiry: {str(e)}"
        )

@router.post("/schedule-appointment/")
async def send_message(form: ScheduleAppointment):
    
    try:  
        name = form.name
        email = form.email
        message = form.message
        phone = form.phone
              
        # Build the email
        msg = MIMEMultipart("alternative")
        msg["Subject"] = f"New Appointment Request from {name}"
        msg["From"] = email
        msg["To"] = receiver_email

        # Plain text fallback
        text_body = f"""
        New Appointment Request

        From: {name}
        Email: {email}
        Phone: {phone}

        Message:
        {message}
        """

        # HTML Body with inline CSS
        html_body = f"""
        <html>
          <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
            <table width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
              <tr>
                <td style="padding: 20px; text-align: center; background: #4f46e5; color: #ffffff; border-radius: 8px 8px 0 0;">
                  <h2 style="margin: 0;">New Appointment Request</h2>
                </td>
              </tr>
              <tr>
                <td style="padding: 20px; color: #333;">
                  <p><strong>From:</strong> {name}</p>
                  <p><strong>Email:</strong> {email}</p>
                  <p><strong>Phone:</strong> {phone}</p>
                  <p><strong>Message:</strong></p>
                  <div style="background: #f3f4f6; padding: 15px; border-radius: 6px; color: #111;">
                    {message}
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding: 15px; text-align: center; font-size: 12px; color: #888;">
                  This email was sent automatically by FastAPI Demo.
                </td>
              </tr>
            </table>
          </body>
        </html>
        """

        # Attach both plain text and HTML versions
        msg.attach(MIMEText(text_body, "plain"))
        msg.attach(MIMEText(html_body, "html"))

        # Send email
        with smtplib.SMTP(smtp_server, port) as server:
            server.set_debuglevel(1)  # shows SMTP logs
            server.esmtp_features["auth"] = "LOGIN PLAIN"
            server.login(login, password)
            server.sendmail(sender_email, receiver_email, msg.as_string())

        return {"status": "success", "message": "Message sent successfully"}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to send enquiry: {str(e)}"
        )

@router.post("/consult/")
async def send_message(form: ConsultationForm):
  logger.info(f"Received consultation form: {json.dumps(form.dict(), indent=4)}")
    
  # Step 1: Store in MongoDB (backup before sending email)
  try:
      logger.info(f"Inserting into DB")
      await db.consultationForms.insert_one(form.dict())
      logger.info(f"Record inserted successfully in DB")
  except Exception as e:
      logger.info(f"DB insert failed: {str(e)}")
      raise HTTPException(status_code=500, detail=f"Failed to send consult form: {str(e)}")

  # Step 2: Try sending the email
  try:
    logger.info(f"Building email to send")
    
    # Build Email
    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"Consultation Form from {form.name}"
    msg["From"] = form.email
    msg["To"] = receiver_email

    logger.info(f"Building Plain text fallback")
    
    # Plain text fallback
    text_body = f"""
    New Consultation Form

    From: {form.name}
    Email: {form.email}
    Phone: {form.phone}
    Age: {form.age}
    Gender: {form.gender}
    Height: {form.height}
    Weight: {form.weight}

    Medical Conditions: {form.description}
    Allergies: {form.allergies}
    Dietary Preferences: {form.dietaryPreferences}
    Sleep Pattern: {form.sleepPattern}
    Physical Activity: {form.physical}

    Primary Health Goals: {", ".join(form.primaryHealthGoalsCheckbox)}
    Preferred Consultation Type: {form.preferredConsultationTypeRadio}
    Preferred Language: {form.preferredLanguage}
    Best Time For Consultation: {form.bestTimeForConsultation}
    """

    logger.info(f"Building HTML Body")
    
    # HTML Body
    html_body = f"""
    <html>
      <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
        <table width="100%" cellspacing="0" cellpadding="0" style="max-width: 700px; margin: auto; background: #ffffff; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
          <tr>
            <td style="padding: 20px; text-align: center; background: #16a34a; color: #ffffff; border-radius: 8px 8px 0 0;">
              <h2 style="margin: 0;">New Consultation Form</h2>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px; color: #333; font-size: 14px;">
              <p><strong>Name:</strong> {form.name}</p>
              <p><strong>Email:</strong> {form.email}</p>
              <p><strong>Phone:</strong> {form.phone}</p>
              <p><strong>Age:</strong> {form.age}</p>
              <p><strong>Gender:</strong> {form.gender}</p>
              <p><strong>Height:</strong> {form.height} cm</p>
              <p><strong>Weight:</strong> {form.weight} Kg</p>
              <hr/>
              <p><strong>Medical Conditions:</strong> {form.description}</p>
              <p><strong>Allergies:</strong> {form.allergies}</p>
              <p><strong>Dietary Preferences:</strong> {form.dietaryPreferences}</p>
              <p><strong>Sleep Pattern:</strong> {form.sleepPattern}</p>
              <p><strong>Physical Activity:</strong> {form.physical}</p>
              <hr/>
              <p><strong>Primary Health Goals:</strong> {", ".join(form.primaryHealthGoalsCheckbox)}</p>
              <p><strong>Consultation Type:</strong> {form.preferredConsultationTypeRadio}</p>
              <p><strong>Preferred Language:</strong> {form.preferredLanguage}</p>
              <p><strong>Best Time:</strong> {form.bestTimeForConsultation}</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 15px; text-align: center; font-size: 12px; color: #888;">
              This email was sent automatically by Consultation Form.
            </td>
          </tr>
        </table>
      </body>
    </html>
    """

    # Attach versions
    msg.attach(MIMEText(text_body, "plain"))
    msg.attach(MIMEText(html_body, "html"))

    logger.info(f"Sending email to {receiver_email} via {smtp_server}:{port}")
    
    # Send email
    with smtplib.SMTP(smtp_server, port) as server:
        server.set_debuglevel(1)
        server.esmtp_features["auth"] = "LOGIN PLAIN"
        server.login(login, password)
        server.sendmail(sender_email, receiver_email, msg.as_string())

    return {"status": "success", "message": "Message sent successfully"}
  except Exception as e:
    raise HTTPException(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        detail=f"Failed to send consult form: {str(e)}"
    )
  
# region Old - Using Gmail SMTP (Commented Out)
# # Gmail SMTP Server
# @router.post("/send-enquiry1/")
# async def send_enquiry1(
#     name: str = Form(...),
#     email: str = Form(...),
#     message: str = Form(...)
# ):
#     sender_email = "your_email@gmail.com"
#     sender_password = "your_app_password"  # app password, not actual Gmail password
#     receiver_email = "receiver_email@gmail.com"

#     msg = MIMEMultipart()
#     msg["From"] = sender_email
#     msg["To"] = receiver_email
#     msg["Subject"] = "New Enquiry Received"

#     body = f"From: {name}\nEmail: {email}\n\nMessage:\n{message}"
#     msg.attach(MIMEText(body, "plain"))

#     try:
#         with smtplib.SMTP("smtp.gmail.com", 587) as server:
#             server.starttls()
#             server.login(sender_email, sender_password)
#             server.sendmail(sender_email, receiver_email, msg.as_string())
#         return {"status": "success", "message": "Enquiry sent successfully"}
#     except Exception as e:
#         raise HTTPException(
#             status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
#             detail=f"Failed to send enquiry: {str(e)}"
#         )

# endregion