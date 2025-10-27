from datetime import datetime
import random
import string
from fastapi import APIRouter, HTTPException, status, BackgroundTasks
from app.models.orders import CreateOrder
from app.db.mongo import db
from fastapi.responses import FileResponse
from bson import ObjectId
import pdfkit
import tempfile
import os

router = APIRouter(prefix="/orders", tags=["Orders"])

@router.post("/create", status_code=status.HTTP_201_CREATED)
async def create_order(order: CreateOrder):
    """
    Create a new Order with validation and error handling.
    Adds a 6-character unique orderId field.
    """
    try:
        # Validate totals
        calculated_total = order.subtotal + order.tax
        if abs(calculated_total - order.totalAmount) > 0.01:
            raise HTTPException(
                status_code=400,
                detail="Total amount does not match subtotal + tax."
            )

        # Generate unique orderId
        order_id = generate_unique_order_id()

        # Ensure uniqueness in DB
        existing = await db.orders.find_one({"orderId": order_id})
        while existing:
            order_id = generate_unique_order_id()
            existing = await db.orders.find_one({"orderId": order_id})

        # Prepare order document
        order_data = order.dict()
        order_data["orderId"] = order_id  # add custom field
        order_data["orderDate"] = datetime.utcnow()

        # Insert into MongoDB
        result = await db.orders.insert_one(order_data)
        if not result.inserted_id:
            raise HTTPException(
                status_code=500,
                detail="Failed to save order to database."
            )

        return {
            "message": "Order saved successfully.",
            "order_id": str(result.inserted_id),
            "custom_orderId": order_id
        }

    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"Error while saving order: {e}")
        raise HTTPException(
            status_code=500,
            detail="An unexpected error occurred while saving the order."
        )
        
@router.get("/getOrdersByEmail/{email}")
async def get_orders(email: str):
    """
    Get Orders of a User.
    """
    orders = db.orders.find({"email": email})
    user_orders = []

    async for order in orders:
        order["_id"] = str(order["_id"])
        user_orders.append(order)

    if not user_orders:
        return {"message": f"No orders found for email: {email}"}

    return user_orders

@router.get("/download/{order_id}")
async def download_order_pdf(order_id: str, background_tasks: BackgroundTasks):
    # Validate ObjectId
    if not ObjectId.is_valid(order_id):
        raise HTTPException(status_code=400, detail="Invalid Order ID")

    # Fetch order from MongoDB
    order = await db.orders.find_one({"_id": ObjectId(order_id)})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    # Prepare order data
    order["_id"] = str(order["_id"])
    order_html_items = "".join(
        f"<tr><td>{item['name']}</td><td>{item['quantity']}</td><td>₹{item['price'] * item['quantity']:.2f}</td></tr>"
        for item in order.get("items", [])
    )

    # Build HTML for PDF
    html_content = f"""
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {{
            font-family: 'Helvetica', sans-serif;
            font-size: 14px;
            margin: 20mm;
            padding: 20px;
            color: #333;
          }}
          .header {{
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 2px solid #333;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }}
        .header img {{
            height: 50px;
        }}
        .header-title {{
            font-size: 24px;
            color: #222;
            font-weight: bold;
        }}
         .footer {{
            border-top: 1px solid #333;
            font-size: 12px;
            color: #555;
            position: fixed;
            bottom: 10px;
            width: 100%;
            text-align: center;
            padding-top: 5px;
        }}
        .pagenum:before {{
            content: counter(page);
        }}
          h2 {{
            text-align: center;
            color: #4b5563;
          }}
          table {{
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }}
          th, td {{
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }}
          th {{
            background-color: #f4f4f4;
          }}
          .summary {{
            margin-top: 30px;
            font-size: 14px;
          }}
          .summary p {{
            margin: 5px 0;            
            text-align: right;
          }}
        </style>
      </head>
      <body>
       <!-- Header -->
        <div class="header">
            <img src="https://yavuzceliker.github.io/sample-images/image-1.jpg" alt="Logo">
            
            <div class="header-title">Kitchen Cure Foods</div>
            <div class="summary">
            <p>+91 733 729 2216</p>
            <p>support@kitchencurefoods.com</p>
            </div>            
        </div>
        
        <h2>Order Receipt</h2>
        <p><strong>Order ID:</strong> {order.get('orderId', 'N/A')}</p>
        <p><strong>Email:</strong> {order.get('email', 'N/A')}</p>
        <p><strong>Payment ID:</strong> {order.get('paymentId', 'N/A')}</p>
        <p><strong>Order Date:</strong> {order.get('orderDate', 'N/A')}</p>

        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {order_html_items}
          </tbody>
        </table>

        <div class="summary">
          <p><strong>Subtotal:</strong> ₹{order.get('subtotal', 0):.2f}</p>
          <p><strong>Tax:</strong> ₹{order.get('tax', 0):.2f}</p>
          <p><strong>Total:</strong> ₹{order.get('totalAmount', 0):.2f}</p>
          <p><strong>Status:</strong> {order.get('status', 'N/A')}</p>
        </div>
        
         <!-- Footer -->
        <div class="footer">
        <p>www.kitchencurefoods.com</p>
           <!-- Page <span class="pagenum"></span>-->
        </div>
      </body>
    </html>
    """

    # Generate PDF using wkhtmltopdf
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_pdf:
        config = pdfkit.configuration(
            wkhtmltopdf=r"C:\Program Files\wkhtmltopdf\bin\wkhtmltopdf.exe"
        )
        pdfkit.from_string(html_content, temp_pdf.name, configuration=config)
        pdf_path = temp_pdf.name

    # clean up the temp file after sending
    background_tasks.add_task(os.remove, pdf_path)

    # Send file as response
    filename = f"Order_{order_id}.pdf"
    response = FileResponse(
        pdf_path,
        media_type="application/pdf",
        filename=filename,
    )
    
    return response


# Helpers
def generate_unique_order_id(length: int = 6) -> str:
    """Generate a random 6-character alphanumeric order ID."""
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=length))
