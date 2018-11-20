import React, { Component } from "react";
import TextFieldGroup from "../common/TextFieldGroup";
import axios from "axios";

class BizHash extends Component {
  constructor() {
    super();
    this.state = {
      dochash1: "",
      dochash2: "",
      receipt1: "",
      receipt2: "",
      log1: "Waiting for input...",
      log2: "Waiting for input...",
      log3: "Waiting for input...",
      submitting1: false,
      submitting2: false,
      submitting3: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmiti1 = this.onSubmiti1.bind(this);
    this.onSubmiti2 = this.onSubmiti2.bind(this);
    this.onSubmiti3 = this.onSubmiti3.bind(this);
    this.isEven = this.isEven.bind(this);
  }

  onSubmiti1() {
    if (this.state.dochash1) {
      //run the API
      this.setState(
        { submitting1: true, log1: "waiting for server response" },
        () => {
          axios
            .post("http://businesshash.cloud.hashcorp.com:4000/api/v1/hash", {
              hash: this.state.dochash1
            })
            .then(res => {
              // console.log(res);
              this.setState({
                submitting1: false,
                log1: res.data.receiptId
              });
            })

            .catch(err => {
              console.log(err);
              this.setState({
                submitting1: false,
                log1: err.toString()
              });
            });
        }
      );
    }
  }

  onSubmiti2() {
    if (this.state.receipt1) {
      //run the API
      this.setState(
        { submitting2: true, log2: "waiting for server response" },
        () => {
          axios
            .get("http://businesshash.cloud.hashcorp.com:4000/api/v1/hash", {
              params: {
                receiptId: this.state.receipt1
              }
            })
            .then(res => {
              // console.log(res);
              this.setState({
                submitting2: false,
                log2: `DocumentHash: ${res.data.documentHash}, Timestamp: ${
                  res.data.timestamp
                }`
              });
            })
            .catch(err => {
              this.setState({
                submitting2: false,
                log2: err.toString()
              });
              console.log(err);
            });
        }
      );
    }
  }

  onSubmiti3() {
    if (
      this.state.receipt2 &&
      this.state.dochash2 &&
      this.isEven(this.state.dochash2)
    ) {
      //run the API
      this.setState(
        { submitting3: true, log3: "waiting for server response" },
        () => {
          axios
            .get("http://businesshash.cloud.hashcorp.com:4000/api/v1/hash", {
              params: {
                receiptId: this.state.receipt2,
                hash: this.state.dochash2
              }
            })
            .then(res => {
              console.log(res);
              this.setState({
                submitting3: false,
                log3: res.data.exist ? "Verified" : "Could not verify!"
              });
            })
            .catch(err => {
              this.setState({
                submitting3: false,
                log3: err.toString()
              });
              console.log(err);
            });
        }
      );
    }
  }

  isEven(dochash) {
    return dochash.length % 2 === 0;
  }

  onChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  render() {
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h4>Store the Hash</h4>
            </div>
            <div className="col-md-10">
              <TextFieldGroup
                placeholder="Enter Hash of the Document"
                name="dochash1"
                value={this.state.dochash1}
                onChange={this.onChange}
                info="Enter Hash of the Document"
              />
            </div>
            <div className="col-md-2">
              <button
                className="btn btn-block btn-secondary"
                type="button"
                data-toggle="collapse"
                data-target="#collapseOne"
                aria-controls="collapseOne"
                onClick={this.onSubmiti1}
              >
                {this.state.submitting1 ? "Submitting" : "Submit"}
              </button>
            </div>
            <div className="col-md-12">
              <div className="mh-10 logger-area m-auto">{this.state.log1}</div>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-md-12">
              <h4>Get the Hash</h4>
            </div>
            <div className="col-md-10">
              <TextFieldGroup
                placeholder="Enter the receipt ID"
                name="receipt1"
                value={this.state.receipt1}
                onChange={this.onChange}
              />
            </div>
            <div className="col-md-2">
              <button
                className="btn btn-block btn-secondary"
                type="button"
                data-toggle="collapse"
                data-target="#collapseOne"
                aria-controls="collapseOne"
                onClick={this.onSubmiti2}
              >
                {this.state.submitting2 ? "Submitting" : "Submit"}
              </button>
            </div>
            <div className="col-md-12">
              <div className="mh-10 logger-area m-auto">{this.state.log2}</div>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-md-12">
              <h4>Verify the Hash</h4>
            </div>
            <div className="col-md-5">
              <TextFieldGroup
                placeholder="Enter the receipt ID"
                name="receipt2"
                value={this.state.receipt2}
                onChange={this.onChange}
              />
            </div>
            <div className="col-md-5">
              <TextFieldGroup
                placeholder="Enter the Document Hash"
                name="dochash2"
                value={this.state.dochash2}
                onChange={this.onChange}
              />
            </div>
            <div className="col-md-2">
              <button
                className="btn btn-block btn-secondary"
                type="button"
                data-toggle="collapse"
                data-target="#collapseOne"
                aria-controls="collapseOne"
                onClick={this.onSubmiti3}
              >
                {this.state.submitting3 ? "Submitting" : "Submit"}
              </button>
            </div>
            <div className="col-md-12">
              <div className="mh-10 logger-area m-auto">{this.state.log3}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BizHash;
