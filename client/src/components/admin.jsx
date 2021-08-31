import React, { Component } from 'react';
import AdminTableRow from './adminTableRow';
import AdminModal from './adminModal';
import ProductForm from './productForm';
import config from '../config.json'

class Admin extends Component {

    constructor(){
        super();
        this.state = {
            products: [],
            show_adding_modal: false,
            show_edit_modal: false,
            edit_id: 0,
            title: '',
            price: null,
            description: '',
            image: ''
        }
    }

    componentDidMount() {
        fetch(`${config.SERVER_URL}/api/products`)
        .then(res => res.json())
        .then((json) => this.setState({ products: json }));
    }

    showAddingModal = () => {
        this.setState({show_adding_modal: true});
    }


    hideAddingModal = () => {
        this.setState({show_adding_modal: false});
    }

    showEditModal = product => {
        this.setState({edit_id: product._id})
        this.setState({title: product.title});
        this.setState({price: product.price});
        this.setState({description: product.description});
        this.setState({image: product.image});
        this.setState({show_edit_modal: true});
    }


    hideEditModal = () => {
        this.setState({show_edit_modal: false});
    }

    addProduct = (event) => {
        event.preventDefault();

        const product = {
            title: this.state.title,
            price: this.state.price,
            description: this.state.description,
            image: this.state.image
        }

        fetch(`${config.SERVER_URL}/api/products`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body:  JSON.stringify(product)
        })
        .then(res => res.json())
        .then((json) => {
            const products = [...this.state.products];
            products.push(json);
            this.setState({products});
            this.hideAddingModal();
        }
        );
    }

    updateNewProduct = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    }

    editProduct = (event) => {
        event.preventDefault();

        const product = {
            title: this.state.title,
            price: this.state.price,
            description: this.state.description,
            image: this.state.image
        }

        fetch(`${config.SERVER_URL}/api/products/${this.state.edit_id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body:  JSON.stringify(product)
        })
        .then(res => res.json())
        .then((json) => {
            const products = [...this.state.products];
            const index = products.findIndex(p => p._id === this.state.edit_id);
            products[index] = json;
            this.setState({products});
            this.hideEditModal();
        }
        );
    }

    deleteProduct = productId => {
        fetch(`${config.SERVER_URL}/api/products/${productId}`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"}
        })
        .then(res => res.json())
        .then((json) => {
            const products = this.state.products.filter(p => p._id !== productId);
            this.setState({products});
        }
        );
    }

    render() { 
        return (
        <div style={{maxWidth: '1000px', margin: 'auto'}}>
            <AdminModal title="Add New Product" show={this.state.show_adding_modal} handleClose={this.hideAddingModal}>
                <ProductForm onChange={this.updateNewProduct} onSubmit={this.addProduct}/>
            </AdminModal>
            <AdminModal title="Edit Product" show={this.state.show_edit_modal} handleClose={this.hideEditModal}>
                <ProductForm onChange={this.updateNewProduct} onSubmit={this.editProduct} title={this.state.title} price={this.state.price} description={this.state.description} image={this.state.image}/>
            </AdminModal>
            <h1>Admin</h1>
            <button className="btn btn-primary" onClick={this.showAddingModal} style={{margin: '20px 10px', float: 'right'}}>Add New Product</button>
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    { this.state.products.map(product => <AdminTableRow key={product._id} product={product} editProduct={this.showEditModal} deleteProduct={this.deleteProduct} />)}
                </tbody>
            </table>
        </div>
        );
    }
}
 
export default Admin;