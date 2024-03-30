import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ totalQuantity }) => {
    return (
        <header className="App-header">
            <Link to="/" className="nav-link">
                <div className="left-nav">
                    <h1 className="text-heading">Shop 2 </h1>
                    <div className="logo-container">
                        {/* Add the circle div with the "R" inside */}
                        <div className="circle">
                            <h1 className="just-R">R</h1>
                        </div>
                    </div>
                    <h1>eact</h1>
                </div>
            </Link>
            <div className="cart-icon">
                <Link to="/cart" className="nav-link">
                    <FontAwesomeIcon icon={faShoppingCart} />
                    <span> {totalQuantity}</span>  {/* Display total quantity */}
                    <span> items</span>
                </Link>
            </div>
        </header>
    );
};

export default Navbar;