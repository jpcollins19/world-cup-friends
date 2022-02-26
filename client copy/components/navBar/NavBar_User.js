import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../store";
import "./Navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrderDetails } from "../../store/index.js";

const Navbar_User = ({ handleClick, user }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrderDetails(user));
  }, []);

  const orderDetails = useSelector((state) => state.orders).find(
    (order) => order.userId === user.id
  );

  return (
    <div className="header">
      <Link to="/home">
        <h1 id="logo">
          <img className="nft-logo" src="/NFT-Logo.jpg" />
        </h1>
      </Link>

      <nav>
        <div className="nav-links">
          <ul className="nav-list">
            {user.isAdmin === true ? (
              <li className="nav-item">
                <Link to="/products/create" className="nav-btn">
                  Add Product
                </Link>
              </li>
            ) : (
              ""
            )}
            <li className="nav-item">
              {" "}
              <Link to="/home">
                <p id="nav-btn" className="white-text">
                  Home
                </p>
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-btn">Explore</a>
              <ul className="dropdown">
                <li className="dropdown-item">
                  <Link className="dropdown-link" to="/products/Azuki">
                    Azuki
                  </Link>
                </li>
                <li className="dropdown-item">
                  <Link className="dropdown-link" to="/products/Crypto_Punks">
                    Crypto Punks
                  </Link>
                </li>
                <li className="dropdown-item">
                  <Link className="dropdown-link" to="/products/Clone_X">
                    Clone X
                  </Link>
                </li>
                <li className="dropdown-item">
                  <Link className="dropdown-link" to="/products/Tasty_Bones">
                    Tasty Bones
                  </Link>
                </li>
                <li className="dropdown-item">
                  <Link className="dropdown-link" to="/products/The_Metascapes">
                    The Metascapes
                  </Link>
                </li>

                <li className="dropdown-item">
                  <Link className="dropdown-link" to="/products/The_Ladies">
                    The Ladies
                  </Link>
                </li>
                <li className="dropdown-item">
                  <Link className="dropdown-link" to="/products/Grumpets">
                    Grumpets
                  </Link>
                </li>
                <li className="dropdown-item">
                  <Link
                    className="dropdown-link"
                    to="/products/Little_Lemon_Friends"
                  >
                    Little Lemon Friends
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link to="/cart">
                <img
                  src="https://i.ibb.co/tQgMFFz/outline-add-shopping-cart-white-24dp.png"
                  alt="shopping-cart-checkout"
                  className="menu-item cart-contents"
                />
                <span
                  className={
                    !orderDetails ||
                    (orderDetails.totalItems > 0 && !orderDetails.products) ||
                    orderDetails.totalItems === 0
                      ? "cart-contents-count-0"
                      : "cart-contents-count"
                  }
                >
                  {!orderDetails ||
                  (orderDetails.totalItems > 0 && !orderDetails.products) ||
                  orderDetails.totalItems === 0
                    ? 0
                    : orderDetails.totalItems}
                </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/bio">
                <img
                  src="https://i.ibb.co/YD9P9Zw/outline-account-circle-white-24dp.png"
                  alt="account-Logo"
                  id="account-logo"
                />
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" onClick={handleClick}>
                <img
                  src="https://i.ibb.co/XbkS6LJ/outline-logout-white-24dp.png"
                  alt="logout"
                  id="logout-icon"
                />
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(null, mapDispatch)(Navbar_User);
