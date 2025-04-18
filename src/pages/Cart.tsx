import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CombinedCheckoutCart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [contactInfo, setContactInfo] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  useEffect(() => {
    const storedCart = sessionStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleChange = (e) => {
    setContactInfo({ ...contactInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking Info:", contactInfo);
    alert("Booking received! We will contact you on WhatsApp to confirm.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-white to-[#ffe4d4] py-10">
      <motion.div
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">Checkout & Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Cart Section */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Cart</h2>
            {cart.length === 0 ? (
              <p className="text-gray-600 text-center">Your cart is empty.</p>
            ) : (
              cart.map((item) => (
                <motion.div
                  key={item.id}
                  className="border p-4 rounded-lg flex justify-between items-center mb-4"
                >
                  <div>
                    <h3 className="text-xl font-semibold">{item.name}</h3>
                    <p className="text-gray-600">₹{item.discounted_price}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
                  >
                    Remove
                  </button>
                </motion.div>
              ))
            )}
          </div>

          {/* Checkout Section */}
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Your Details</h2>
            <input type="text" name="name" placeholder="Full Name" className="input-box" onChange={handleChange} required />
            <input type="tel" name="phone" placeholder="WhatsApp Number" className="input-box" onChange={handleChange} required />
            <input type="text" name="address" placeholder="Address" className="input-box" onChange={handleChange} required />
            <input type="text" name="city" placeholder="City" className="input-box" onChange={handleChange} required />
            <input type="text" name="state" placeholder="State" className="input-box" onChange={handleChange} required />
            <input type="text" name="zip" placeholder="ZIP Code" className="input-box" onChange={handleChange} required />
            <button type="submit" className="w-full py-3 bg-[#FF5733] text-white rounded-md hover:bg-[#ff4019] transition-colors">Book Now</button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default CombinedCheckoutCart;
