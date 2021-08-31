import React, { Component } from 'react';

class ProductForm extends Component {

    render() { 
        return (
            <form onSubmit={this.props.onSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" className="form-control" name="title" onChange={this.props.onChange} required value={this.props.title} />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input type="number" step="0.01" className="form-control" name="price" onChange={this.props.onChange} required value={this.props.price} />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <input type="text" className="form-control" name="description" onChange={this.props.onChange} required value={this.props.description} />
                </div>
                <div className="form-group">
                    <label>Image Url</label>
                    <input type="text" className="form-control" name="image" onChange={this.props.onChange} required value={this.props.image} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
         );
    }
}
 
export default ProductForm;