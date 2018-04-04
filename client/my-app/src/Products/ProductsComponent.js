import React, { Component } from 'react';
import axios from 'axios';
import ReactTable from 'react-table';
import "react-table/react-table.css";


class ProductsComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
    };

    this.handleRow = this.handleRow.bind(this);
  }

  handleRow(productid) {
    this.props.history.push(`/product/${productid}`);
  }

  componentDidMount() {
    this.callApi()
      .then(response => this.setState({ products: response.products }))
      .catch(err => console.log(err));
  }

  async callApi() {

    const jsonPromise = await fetch('/api/product');
    const body = await jsonPromise.json();

    if (jsonPromise.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    const data = this.state.products;

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
        <ReactTable
          getTdProps={(state, rowInfo, column, instance) => {
            return {
              onClick: (e, handleOriginal) => {
                if (handleOriginal) {
                  this.handleRow(rowInfo.row._id);
                }
              }
            }
          }
          }
          data={data}
          columns={columns} />
      </div>
    );
  }
}

export default ProductsComponent;
