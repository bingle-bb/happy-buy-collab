import React, { useState } from "react";
import ProductList from "../components/ProductList";
import CartDrawer from "../components/Cart";

export default function ShopPage() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const addToCart = (product) => {
    const exists = cart.find((item) => item.id === product.id);
    if (exists) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  return (
    <div>
      <button
        className="btn text-white"
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          borderRadius: "30px",
          backgroundColor: "#5ca38cff",
          fontSize: "13px",
          zIndex: 1000,
        }}
        onClick={toggleCart}
      >
        View Cart ({cart.reduce((total, item) => total + item.qty, 0)})
      </button>

      <ProductList addToCart={addToCart} />
      <CartDrawer
        isOpen={isCartOpen}
        toggleCart={toggleCart}
        cart={cart}
        setCart={setCart}
      />
    </div>
  );
}
