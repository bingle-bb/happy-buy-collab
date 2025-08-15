import React from "react";

export default function CartItem({ item, updateQty, removeItem }) {
  return (
    <div
      style={{
        borderBottom: "1px solid #c1dfdcff",
        marginBottom: "1rem",
        paddingBottom: "0.5rem",
      }}
    >
      <p className="mt-3 mb-1">
        <strong>{item.title}</strong>
      </p>
      <p className=" mb-1">${item.price.toFixed(2)}</p>
      <input
        type="number"
        min="1"
        value={item.qty}
        onChange={(e) => updateQty(item.id, parseInt(e.target.value))}
        style={{
          width: "50px",
          marginRight: "0.5rem",
          borderRadius: "5px",
          border: "1px solid #bee0baff",
        }}
      />
      <span className="ms-1">
        Total:{" "}
        <span className="fw-bold">${(item.price * item.qty).toFixed(2)}</span>
      </span>
      <span
        onClick={() => removeItem(item.id)}
        style={{
          color: "#f95b5bff",
          padding: "4px 7px",
          borderRadius: "5px",
          border: "none",
          marginLeft: "2rem",
          cursor: "pointer",
          fontSize: "14px",
        }}
      >
        Remove
      </span>
    </div>
  );
}
