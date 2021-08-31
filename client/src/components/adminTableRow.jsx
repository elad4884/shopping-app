import React, { Component } from 'react';

class AdminTableRow extends Component {
    render() { 
        return (
            <tr>
                <td>{this.props.product.title}</td>
                <td>{this.props.product.price}$</td>
                <td>
                    <button className="btn btn-primary" onClick={()=> this.props.editProduct(this.props.product)} style={{margin: 10}}>Edit</button>
                    <button className="btn btn-danger" onClick={()=> this.props.deleteProduct(this.props.product._id)}>Delete</button>
                </td>
            </tr>
         );
    }
}
 
export default AdminTableRow;