import React, { useEffect, useState, useRef } from "react";
import { Pagination, Flex, Spin } from "antd";

export default function ProductList({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(false);
  const [percent, setPercent] = useState(-50);

  const productsPerPage = 5;
  const timerRef = useRef(null);

  useEffect(() => {
    // Animate loading spinner progress
    if (loading) {
      timerRef.current = setTimeout(() => {
        setPercent((v) => {
          const next = v + 5;
          return next > 150 ? -50 : next;
        });
      }, 100);
    }
    return () => clearTimeout(timerRef.current);
  }, [percent, loading]);

  useEffect(() => {
    const skip = (currentPage - 1) * productsPerPage;
    setLoading(true);

    fetch(
      `https://dummyjson.com/products?limit=${productsPerPage}&skip=${skip}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setTotalProducts(data.total);
        setLoading(false);
        setPercent(-50); // reset spinner percent after loading
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mt-3">
      <h2 className="text-start mb-3  fw-bold " style={{ color: "#5CA38C" }}>
        Happy Buy Store
      </h2>
      {loading ? (
        <Flex
          align="center"
          justify="center"
          style={{ height: "200px" }}
          gap="middle"
        >
          <Spin percent={percent} />
        </Flex>
      ) : (
        <>
          <div className="products products d-flex flex-column  ">
            {products.map((product) => (
              <div
                key={product.id}
                className="mb-2  d-flex align-items-center"
                style={{
                  width: "100%",
                  padding: "10px 0",
                  borderBottom: "1px solid #73b56d47",
                  gap: "2rem",
                }}
              >
                {/* Left: Product details */}
                <div style={{ flex: 1 }}>
                  <h5 className="fw-bold mb-3">{product.title}</h5>
                  <p className="text-muted ">
                    <small>
                      Brand: {product.brand || "undefined"} | Category:{" "}
                      {product.category}
                    </small>
                  </p>
                  <p className="mb-2" style={{ fontWeight: "bold " }}>
                    Price: ${product.price}
                  </p>
                  <p className="mb-2">
                    {" "}
                    <small>
                      Rating: {product.rating} | Stock: {product.stock}
                    </small>
                  </p>
                  <p className="mb-2">
                    <small>{product.description}</small>
                  </p>
                  <button
                    className="btn text-white"
                    style={{
                      borderRadius: "5px",
                      backgroundColor: "#5ca38cff",
                      padding: "2px 10px",
                    }}
                    onClick={() => addToCart(product)}
                  >
                    <small>Add to Cart</small>
                  </button>
                </div>

                {/* Right: Product image */}
                <div>
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    style={{
                      width: "180px",
                      height: "180px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="d-flex justify-content-center mt-3 mb-5">
            <Pagination
              current={currentPage}
              total={totalProducts}
              pageSize={productsPerPage}
              showSizeChanger={false}
              onChange={handlePageChange}
            />
          </div>
        </>
      )}
    </div>
  );
}
