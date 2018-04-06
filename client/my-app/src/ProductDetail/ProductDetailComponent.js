import React, { Component } from 'react';
import {Icon} from 'react-fa';
import queryString from 'query-string';
import { Button } from 'react-materialize';
import axios from 'axios';

class ProductDetailComponent extends Component {
  constructor(props){
    super(props);

    this.state = {
      id: '',
      name: '',
      price: '',
      category: '',
      description: ''
    }

    this.deleteProduct = this.deleteProduct.bind(this);
    this.goBack = this.goBack.bind(this);
    this.goToUpdate = this.goToUpdate.bind(this);
  }
  
  componentDidMount(){
    var productId = this.props.match.params.productId;

    this.getProductById(productId)
    .then(response => this.setState(
      { 
        id: productId,
        name: response.product.name,
        price: response.product.price,
        category: response.product.category,
        description: response.product.description 
      }))
    .catch(err => console.log(err));
  }

  goBack() {
    this.props.history.push(`/read`);
  }

  goToUpdate(){
    var productId = this.state.id;
    this.props.history.push(`/update/${productId}`);

  }
  async getProductById(id) {

    const jsonPromise = await fetch(`/api/product/${id}`);
    const body = await jsonPromise.json();

    if (jsonPromise.status !== 200) throw Error(body.message);

    return body;
  };

  async deleteProduct() {
    var productId = this.state.id;
    axios.delete(`/api/product/${this.state.id}`).then(response => console.log(response))
    .catch(error => console.log(error));
    this.goBack();
  };

  render() {
    return (
      <div className="Product">
          <Icon className='icon' name='cc-paypal' size='2x'/>
          <h3>{this.state.name}</h3>
          <p>Categoria : {this.state.category}</p>
          <p>Precio : {this.state.price}</p>
          <Button onClick={this.goToUpdate}>Editar</Button><br/><br/>
          <Button onClick={this.deleteProduct}>Supprimir</Button>
      </div>
    );
  }
}

export default ProductDetailComponent;
