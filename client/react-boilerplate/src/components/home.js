import React, { Component } from "react";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { customers: [], new: ["a"] };
  }
  componentDidMount() {
    this.getCustomer();
  }

  getCustomer() {
    return fetch("http://127.0.0.1:5000/customer", {
      method: "GET"
    })
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            customers: result
          });
        },
        error => {
          return error;
        }
      );
  }

  render() {
    console.log(this.state.customers);
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Task</th>
            </tr>
          </thead>
          <tbody>
            {this.state.customers.map(customer => {
              return (
                <tr key={customer.id}>
                  <td>{customer.id}</td>
                  <td>{customer.task}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Home;
