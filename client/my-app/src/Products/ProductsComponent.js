import React, { Component } from 'react';
import axios from 'axios';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import { Input, Row } from 'react-materialize';


class ProductsComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      filteredProducts: [],
      // searchValue: ''
    };

    this.handleRow = this.handleRow.bind(this);
  }

  handleRow(productid) {
    this.props.history.push(`/product/${productid}`);
  }

  handleSearch(e) {

    var searchValue = e.target.value;

    if (searchValue.length < 3) {
      this.setState({
        filteredProducts: this.state.products
      });
    } else {
      this.setState(
        {
          filteredProducts: this.state.products
            .filter(product => product.name.toLowerCase()
              .indexOf(searchValue.toLowerCase()) !== -1)
        }
      );
    }
  }

  componentDidMount() {
    this.callApi()
      .then(response => this.setState(
        {
          products: response.products,
          filteredProducts: response.products
        }))
      .catch(err => console.log(err));
  }

  async callApi() {

    const jsonPromise = await fetch('/api/product');
    const body = await jsonPromise.json();

    if (jsonPromise.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    const data = this.state.filteredProducts;

    const columns = [
      {
        Header: 'Id',
        accessor: '_id',
        show: false
      }, {
        Header: 'Name',
        accessor: 'name'
      }, {
        Header: 'Price',
        accessor: 'price'
      }, {
        Header: 'Category',
        accessor: 'category'
      }, {
        Header: 'Description',
        accessor: 'description'
      }
    ]
    return (
      <div className="read">
        <Row>
          <Input placeholder="Buscar un producto" name="name" s={6} label="Producto"
            // value={this.state.searchValue}
            onChange={this.handleSearch.bind(this)}
          />
        </Row>
        <Row>
          <ReactTable
            getTdProps={(state, rowInfo, column, instance) => {
              return {
                onClick: (e) => {
                  this.handleRow(rowInfo.row._id);
                }
              }
            }
            }
            data={data}
            columns={columns} />
        </Row>
      </div>
    );
  }
}

export default ProductsComponent;
