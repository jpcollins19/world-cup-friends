import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToOrder, editProduct } from "../../store/index.js";
import "./Products.css";
import { Link, useParams } from "react-router-dom";

import "./Product.css";

export default function Product() {
  const state = useSelector((state) => state);
  const thisProductId = useParams().id;

  const product = state.products.filter(
    (product) => product.id === thisProductId
  );

  const products = state.products;

  const category = product.map((pro) => [pro.category])[0];
  // console.log(category);

  const dispatch = useDispatch();
  const user = state.auth;

  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [productId, setProductId] = useState("");

  const userOrderId = state.orders
    .filter((order) => order.userId === user.id)
    .map((order) => order.id)[0];

  const orderToAdd = {
    id: userOrderId,
    totalItems,
    totalPrice,
    productId,
  };

  return (
    <div className="single-product-container">
      {product.map((product) => (
        <div key={product.id}>
          <div className="product-single">
            <img className="product-img" src={product.imageURL} />
            <div className="single-product-details">
              <p>
                <b>Collection </b>
                <Link to={`/products/${product.category}`}>
                  {product.category}
                </Link>
              </p>
              <h1 style={{ margin: "30px 0  " }}>{product.name}</h1>

              <div className="nested-details">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    margin: "0",
                  }}
                >
                  <p style={{ fontSize: "1rem", marginBottom: "5px" }}>
                    Buy Now
                  </p>
                  <p
                    style={{
                      fontSize: "1.6rem",
                      fontWeight: "900",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: "1rem", marginRight: "2px" }}>
                      $
                    </span>
                    {product.price}
                  </p>
                </div>
                <p>
                  <b>Left in stock:</b> {product.inventory}
                </p>
                <button
                  disabled={product.id !== productId || totalItems === 0}
                  onClick={(ev) => {
                    dispatch(addToOrder(orderToAdd, user, product));
                    dispatch(editProduct(orderToAdd, product));
                    setProductId("");
                  }}
                >
                  Add to cart
                </button>
                <input
                  type="number"
                  step={1}
                  placeholder={0}
                  min={0}
                  max={product.inventory}
                  onChange={(ev) => {
                    setTotalItems(ev.target.value * 1);
                    setTotalPrice(ev.target.value * product.price);
                    setProductId(product.id);
                  }}
                ></input>
              </div>
            </div>
          </div>
          <div className="product-suggestions-container">
            {products
              .filter(
                (p) => p.category === product.category && p.id !== product.id
              )
              .slice(0, 4)
              .map((product) => (
                <div key={product.name} className="single-suggested-product">
                  <Link to={`/products/${product.id}`}>
                    <div
                      className=""
                      style={{
                        backgroundImage: `url(${product.imageURL}) `,
                        width: "350px",
                        height: "350px",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        borderTopLeftRadius: "20px",
                        borderTopRightRadius: "20px",
                      }}
                    ></div>
                  </Link>

                  <div className="product-details">
                    <div className="other-details right">
                      <p>
                        <Link to={`/products/${product.category}`}>
                          {product.category}
                        </Link>
                      </p>
                      <p style={{ fontSize: "1.4rem", fontWeight: "900" }}>
                        {product.name}
                      </p>

                      <button
                        disabled={product.id !== productId || totalItems === 0}
                        onClick={(ev) => {
                          dispatch(addToOrder(orderToAdd, user, product));
                          dispatch(editProduct(orderToAdd, product));
                          setProductId("");
                        }}
                      >
                        Add to cart
                      </button>
                      <input
                        type="number"
                        step={1}
                        placeholder={0}
                        min={0}
                        max={product.inventory}
                        onChange={(ev) => {
                          setTotalItems(ev.target.value * 1);
                          setTotalPrice(ev.target.value * product.price);
                          setProductId(product.id);
                        }}
                      ></input>

                      {user.isAdmin === true ? (
                        <div className="edit-delte-btns">
                          {" "}
                          <button
                            onClick={() => {
                              setProductId(product.id);
                              setShow("show");
                              document.body.style.overflow = "hidden";
                            }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => dispatch(destroyProduct(product.id))}
                          >
                            Delete
                          </button>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="price-div right">
                      <p style={{ fontSize: "0.8rem", margin: "0" }}>Buy Now</p>
                      <p
                        style={{
                          fontSize: "1.3rem",
                          fontWeight: "900",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <span style={{ fontSize: "1rem", marginRight: "2px" }}>
                          $
                        </span>
                        {product.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <button>View Collection</button>
        </div>
      ))}
    </div>
  );
}
