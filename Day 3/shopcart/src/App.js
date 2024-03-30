// Required Library Components 
import "./styles.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./navbar";
import DisplayProducts from "./displayProducts";
import productsData from "./products";
import Cart from "./cart";
import Checkout from "./checkout";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: productsData,
      totalQuantity: 0 // Initialize total quantity - keep track of the total quantity
    };
  }

  componentDidMount() {
    this.calculateTotalQuantity(); // Calculate total quantity on mount
  }

  // Function to calculate total quantity
  calculateTotalQuantity = () => {
    const { products } = this.state;
    const totalQuantity = products.reduce((total, product) => total + product.value, 0);
    this.setState({ totalQuantity });
  };

  // Function to handle changes in the input field's value
  handleValueChange = (productId, e) => {
    const { value } = e.target;
    const { products } = this.state;

    let updatedValue = parseInt(value) || 0;
    // Ensure value doesn't go below 0
    updatedValue = Math.max(0, updatedValue);
    
    // Updates the state with the new value entered by the user
    const updatedProducts = products.map(product => {
      if (product.id === productId) {
        return { ...product, value: updatedValue }; // Ensure value is a number
      }
      return product;
    });

    this.setState({ products: updatedProducts }, () => {
      this.calculateTotalQuantity(); // Recalculate total quantity after value change
    });
  };

  render() {
    const { products, totalQuantity } = this.state;

    return (
      <Router>
        <div className="App">
          <Navbar totalQuantity={totalQuantity} />
          <Routes>
            <Route
              exact path="/"
              element={
                <DisplayProducts
                  products={products}
                  handleValueChange={this.handleValueChange}
                />
              } 
            />
            {/* Add route for Cart component */}
            <Route path="/cart" element={
              <Cart
                products={products} 
              />
            } 
            />
            {/* Add route for Checkout component */}
            <Route path="/checkout" element={
              <Checkout />
            } />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
