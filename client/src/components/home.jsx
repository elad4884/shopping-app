import React, { Component } from 'react';
import ProductCard from "./productCard";
import ShoppingCart from './shoppingCart';
import config from '../config.json'

class Home extends Component {
    state = {
        products: [],
        shopping_cart: []
    }

    componentDidMount() {
        fetch(`${config.SERVER_URL}/api/products`)
            .then(res => res.json())
            .then((json) => this.setState({ products: json }))
            .catch((err) => console.log(err));
    }

    addToShoppingCart = product => {
        const shopping_cart = [...this.state.shopping_cart];
        const index = shopping_cart.findIndex(cart => cart._id === product._id)
        if (index >= 0) {
            shopping_cart[index].amount++;
        }
        else {
            shopping_cart.push(
                {
                    _id: product._id,
                    title: product.title,
                    cost: product.price,
                    amount: 1,
                }
            )
        }
        this.setState({ shopping_cart });
    }

    checkoutShoppingCart = () => {
        fetch(`${config.SERVER_URL}/api/carts`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(
                {
                    products: this.state.shopping_cart.map(p => p =
                    {
                        _id: p._id,
                        cost: p.cost,
                        amount: p.amount
                    }),
                    time_stamp: new Date()
                })
        })
            .then(res => res.json())
            .then((json) => {
                this.setState({ shopping_cart: [] });
            }
            );
    }

    render() {
        return (
            <div style={{ maxWidth: '1200px', margin: 'auto' }}>
                <h1>Home</h1>
                <div style={{ float: 'right', padding: '7px 15px' }}>
                    <ShoppingCart cart={this.state.shopping_cart} checkout={this.checkoutShoppingCart} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', paddingTop: '100px' }}>
                    {this.state.products.map(product =>
                        <ProductCard key={product._id} product={product} addToShoppingCart={this.addToShoppingCart} />
                    )}
                </div>
            </div>
        );
    }
}

export default Home;