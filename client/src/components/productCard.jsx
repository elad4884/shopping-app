import React, { Component } from 'react';
import { Card } from "react-bootstrap";

class ProductCard extends Component{
    render(){
        const product = this.props.product;
        return (
            <Card style={{ width: '18rem', margin: '20px' }}>
                <Card.Img variant="top" src={product.image} />
                <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>
                        {product.description}<br />
                        <span style={{fontSize: 24, color: 'green'}}>{product.price}$</span>
                    </Card.Text>
                    <button className="btn btn-primary" onClick={()=>this.props.addToShoppingCart(product)}>Buy</button>
                </Card.Body>
            </Card>
        );
    }
}
 
export default ProductCard;