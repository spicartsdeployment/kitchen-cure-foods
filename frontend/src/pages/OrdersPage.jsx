// src/pages/OrdersPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOrdersByEmail, downloadOrderPdf } from "../services/OrderService";
import { X } from "lucide-react";

const OrdersPage = () => {
  const { email } = useParams();
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const email = "mounikumar@demo.com";
    console.log("email: ", email);
    const getOrdersData = async () => {
      try {
        const ordersData = await getOrdersByEmail(email);
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    getOrdersData();
  }, [email]);

  const handleDownload = async (orderId) => {
    try {
      const response = await downloadOrderPdf(orderId);
      const blob = new Blob([response.data], { type: "application/pdf" });

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `KCF_Order_${orderId}.pdf`;
      document.body.appendChild(a);
      a.click();

      // Cleanup
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      alert("Failed to download order PDF.");
    }
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <img
          src="/src/assets/no-orders.png"
          alt="empty-cart"
          className="w-50 h-auto object-contain rounded-2xl"
        />
        <h2 className="text-2xl font-semibold text-gray-700">
          No Orders Found
        </h2>
        <p className="py-4">Let's fill it with goodness from nature 🌿</p>
        <button
          onClick={() => {
            navigate("/products");
          }}
          className="bg-green-700 hover:bg-green-800 text-white py-2 px-6 rounded-lg cursor-pointer transition"
        >
          Shop Now
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 mt-10">
      <div className="max-w-6xl container mx-auto mt-8">
        <div className="bg-white p-6">
          <h2 className="text-2xl font-semibold mb-4 border-b border-amber-500 pb-2">
            My Orders
          </h2>

          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="border border-gray-300 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-5 flex flex-col justify-between"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-100 pb-3">
                  <h3 className="font-semibold text-lg text-gray-800">
                    Order #{order.orderId.toUpperCase()}
                  </h3>
                  <span className="text-xs text-gray-500 mt-1 sm:mt-0">
                    Order Date: {new Date(order.orderDate).toLocaleString()}
                  </span>
                </div>

                {/* Items */}
                <ul className="p-3 space-y-2 text-sm text-gray-700 bg-gray-100 rounded-lg">
                  {order.items.map((item) => (
                    <li
                      key={item._id}
                      className="flex justify-between items-center  p-2"
                    >
                      <div className="flex items-center space-x-2">
                        <img
                          src={
                            item.images?.[0] ||
                            "/src/assets/placeholder-image.png"
                          }
                          alt={item.name}
                          className="w-10 h-10 object-cover rounded-md"
                        />
                        <span>{item.name}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-600 font-semibold">
                        <span>{item.quantity}</span>
                        <X size={15} />
                        <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Footer */}
                <div className="mt-4 flex flex-col sm:flex-row justify-between items-center sm:items-end">
                  <div className="text-center sm:text-left mb-3 sm:mb-0 px-2">
                    <table className="w-full text-left text-sm text-gray-700 overflow-hidden">
                      <tbody>
                        <tr>
                          <td>Subtotal</td>
                          <td className="px-3">
                            : Rs. {order.subtotal.toFixed(2)}
                          </td>
                        </tr>
                        <tr>
                          <td>Tax</td>
                          <td className="px-3">: Rs. {order.tax.toFixed(2)}</td>
                        </tr>
                        <tr>
                          <td>Total</td>
                          <td className="px-3">
                            : Rs. {order.totalAmount.toFixed(2)}
                          </td>
                        </tr>
                        <tr>
                          <td>Status</td>
                          <td className="px-3 text-green-800 font-semibold">
                            : {order.status}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <button
                    onClick={() => handleDownload(order._id)}
                    className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow-sm transition"
                  >
                    Download PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrdersPage;
