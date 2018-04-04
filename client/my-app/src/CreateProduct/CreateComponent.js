import React, { Component } from 'react';
import axios from 'axios';
import { Navbar, NavItem, Row, Input, Button, Icon } from 'react-materialize';


class CreateComponent extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      name: '',
      price: '',
      category: '',
      description: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event){
    this.callApi();
  }

  handleChange(event){
    const target = event.target;
    const input = target.name;
    this.setState({
      [input]: event.target.value
    });
  }

  async callApi() {
    axios.post(
      '/api/product', 
      {
        name: this.state.name,
        price: this.state.price,
        category: this.state.category,
        description: this.state.description
      }
    ).then(response => console.log(response))
    .catch(error => console.log(error));
  };

  render() {
    return (
        <div className="create">
          <div className="row">
            <div className="col s12 m6 l6">
              <Row>
                <Input placeholder="Placeholder" name="name" s={6} label="Nombre" value={this.state.name} onChange={this.handleChange}/>
                <Input s={6} label="Precio" name="price" value={this.state.price} onChange={this.handleChange} />
                <Input label="Categoria" name="category" s={12} value={this.state.category} onChange={this.handleChange} />
                <Input label="Descripcion" name="description" s={12} value={this.state.description} onChange={this.handleChange} />
              </Row>
            </div>
          </div>
          <div className="row">
            <div className="col s1">
              <Button waves='light' type="submit" onClick={this.handleSubmit}>Crear<Icon right>add</Icon></Button>
            </div>
          </div>
        </div>
    );
  }
}

export default CreateComponent;
