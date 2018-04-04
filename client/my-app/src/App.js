import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Switch, Route, Router } from 'react-router';
import { Navbar, NavItem, Row, Input, Button, Icon } from 'react-materialize';
import CreateComponent from './CreateProduct/CreateComponent';
import ReadComponent from './Products/ProductsComponent';
import createBrowserHistory from 'history/createBrowserHistory'
import ProductComponent from './ProductDetail/ProductDetailComponent';

const history = createBrowserHistory();

const Root = () => (
  <Router history={history}>
  <Switch>
    <Route path="/create" component={CreateComponent} />
    <Route path="/read" component={ReadComponent} />
    <Route path="/product/:productId" component={ProductComponent} />
  </Switch>
</Router>)

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <div className="row">
          <Navbar className='Navbar' brand='Pc Componentes' center>
            <NavItem href='/create'>Crear</NavItem>
            <NavItem href='/read'>Consultar</NavItem>
          </Navbar>
        </div>
        <div className="row">
          <Root/>
        </div>
      </div>
    );
  }
}

export default App;
