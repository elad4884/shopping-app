import React, { Component } from 'react';
import { Dropdown } from "react-bootstrap";

class ShoppingCart extends Component {

    getTotalCost(){
        let total = 0;
        this.props.cart.forEach(product => {
            total += product.amount * product.cost;
        });
        return total;
    }
    
    render() { 
        const shopping_cart = this.props.cart;
        return ( 
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Shopping Cart
                    <span className="badge badge-primary">{shopping_cart.length}</span>
                </Dropdown.Toggle>

                <Dropdown.Menu style={{width: '300px', padding: 0}}>
                    {shopping_cart.map(cart_item => 
                        <div key={cart_item.title} style={{padding: '7px 15px', borderBottom: '1px solid #ddd'}}>
                            <span className='badge badge-light' hidden={cart_item.amount <= 1} style={{float: 'right', fontSize: 16}}>x{cart_item.amount}</span>
                            {cart_item.title}
                            <div style={{color: 'green'}}>{(cart_item.cost * cart_item.amount).toFixed(2)}$</div>
                        </div>
                    )}
                    <div style={{padding: '17px', alignItems: 'center', fontSize: 20, background: '#eee'}}>
                        Total Price: <span style={{color: 'green'}}>{this.getTotalCost().toFixed(2)}$</span>
                        <button className="btn btn-primary" onClick={this.props.checkout} style={{float: 'right'}}>Pay</button>
                    </div>
                </Dropdown.Menu>
            </Dropdown>
         );
    }
}
 
export default ShoppingCart;