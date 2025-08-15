import React from "react";
import CartItem from "./CartItem";

export default function Cart({ isOpen, toggleCart, cart, setCart }) {
  const updateQty = (id, qty) => {
    if (qty <= 0) {
      setCart(cart.filter((item) => item.id !== id));
    } else {
      setCart(cart.map((item) => (item.id === id ? { ...item, qty } : item)));
    }
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const grandTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: isOpen ? 0 : "-400px",
        width: "350px",
        height: "100%",
        background: "#e1f6eeff",
        boxShadow: "-2px 0 5px rgba(0,0,0,0.2)",
        padding: "1rem",
        transition: "right 0.3s ease-in-out",
        zIndex: 1000,
      }}
    >
      <button
        onClick={toggleCart}
        style={{
          float: "right",
          border: "none",
          background: "#e1f6eeff",
          fontWeight: "bold",
        }}
      >
        X
      </button>
      <h4 className="fw-bold">Shopping Cart</h4>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cart.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            updateQty={updateQty}
            removeItem={removeItem}
          />
        ))
      )}

      <h5>
        Grand Total: <span className="fw-bold">${grandTotal.toFixed(2)}</span>
      </h5>
      <button
        style={{
          background: "#5CA38C",
          color: "white",
          padding: "4px 7px",
          borderRadius: "5px",
          border: "none",
        }}
      >
        Checkout
      </button>
    </div>
  );
}
