from fastapi import APIRouter, Form, HTTPException, status
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import smtplib
import os
from app.models.email import EmailMessage, ScheduleAppointment

router = APIRouter(prefix="/email", tags=["Email"])

# MailMug SMTP details
# Host	smtp.mailmug.net
# Port	2525
# Username	edwub3yapnci3lmc
# Password	jyfhhznejndrsq0m

MOCK_HOST: str = os.getenv("MOCK_HOST","")
MOCK_PORT: str = os.getenv("MOCK_PORT","")
MOCK_USERNAME: str = os.getenv("MOCK_USERNAME","")
MOCK_PASSWORD: str = os.getenv("MOCK_PASSWORD","")
MOCK_FROM: str = os.getenv("MOCK_FROM","")
MOCK_TO: str = os.getenv("MOCK_TO","")

# SMTP Server details
smtp_server = MOCK_HOST
port = MOCK_PORT
login = MOCK_USERNAME
password = MOCK_PASSWORD

sender_email = MOCK_FROM
receiver_email = MOCK_TO

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
        msg["Subject"] = f"New Enquiry: {subject}"
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
                  <h2 style="margin: 0;">New Enquiry</h2>
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
                  <h2 style="margin: 0;">New Enquiry</h2>
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