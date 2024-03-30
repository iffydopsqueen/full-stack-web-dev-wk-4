import React, { useState } from "react";
import { Modal } from "react-bootstrap";
// Importing Bootstrap icons
import { BsDashCircleFill, BsPlusCircleFill } from "react-icons/bs";

const DisplayProducts = ({ products, handleValueChange }) => {
    const [show, setShow] = useState(false);
    const [showImge, setShowImge] = useState({});

    // State for sorting option
    const [sortBy, setSortBy] = useState("normal");

    const handleClose = () => setShow(false);
    const handleShow = (product) => {
        setShow(true);
        setShowImge(product);
    };

    // Function to handle sorting change
    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    // Sorting logic
    const sortedProducts = [...products];
    switch (sortBy) {
        case "lowest":
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case "highest":
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        default:
            sortedProducts.sort((a, b) => a.id - b.id);
    }

    return (
        <>
            {/* Dropdown for sorting options */}
            <div className="sort-dropdown">
                <p>Sort Price By:</p>
                <select onChange={handleSortChange}>
                    <option value="normal">Normal</option>
                    <option value="lowest">Lowest</option>
                    <option value="highest">Highest</option>
                </select>
            </div>

            {/* Product list */}
            <div className="product-list">
                {sortedProducts.map((product) => (
                    <div key={product.id} className="product-item">
                        <div className="product-details">
                            <div className="product-description">
                                {product.desc}
                            </div>
                            <div className="product-price">
                                ${product.price}
                            </div>
                        </div>
                        
                        <div className="product-content">
                            {/* The event attribute 'handleShow' calls the show handler */}
                            <img src={product.image} alt={product.desc} onClick={() => handleShow(product)} />
                            <div className="product-value">
                                <button onClick={() => handleValueChange(product.id, { target: { value: product.value - 1 }})}>
                                    <BsDashCircleFill />
                                </button>
                                <button onClick={() => handleValueChange(product.id, { target: { value: product.value + 1 }})}>
                                    <BsPlusCircleFill />
                                </button>
                                <input type="text" value={product.value} readOnly/>    {/* disabled the input field */}
                                <span> Quantity</span>
                            </div>
                        </div>
                    </div>
                ))}
                {/* Creating the 'modal' component */}
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{showImge.desc}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <img 
                            src={showImge.image} 
                            width="350"
                            alt={showImge.desc}
                            className="mx-5"
                        />
                        <p><span className="text-dark">Ratings:</span> {showImge.ratings}/5</p>
                    </Modal.Body>
                </Modal>
            </div>
        </>
    );
};

export default DisplayProducts;