import React from "react";
import { Link } from "react-router-dom";

const Cart = ({ products }) => {

    // Filter out products with quantity value 0 or below
    const cartItems = products.filter(product => product.value > 0);

    return (
        <div>
            {cartItems.length === 0 ? (
                <React.Fragment>
                    <h3 className="cart-heading">Your Cart Items</h3> {/* Display heading even when cart is empty */}
                    <p className="cart-text">There are {cartItems.length} items in your cart.</p>
                    <Link to="/" className="btn btn-success">Continue Shopping</Link>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <h3 className="cart-heading">Your Cart Items</h3>
                    <div className="cart">
                        <ul>
                            {cartItems.map((product) => (
                                <li key={product.id} className="cart-item">
                                    <img src={product.image} alt={product.desc} className="cart-item-image" />
                                    <div className="cart-item-description">
                                        {product.desc}
                                    </div>
                                    <span className="cart-item-quantity">Quantity: {product.value}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* Add Check Out button */}
                    <Link
                        to="/checkout"
                        className="btn btn-primary"
                    >
                        Check Out
                    </Link>
                </React.Fragment>
            )}
        </div>
    );
};

export default Cart;