import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {
    const { title, description } = this.props;
    return (
      <div className="container my-3">
        <div className="row">
          <div className="col-md-4">
            <div className="card" style={{ width: "18rem" }}>
              <img
                src="https://ichef.bbci.co.uk/news/1024/branded_news/12070/production/_130604837_p0g44g33.jpg"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <a href="/" className="btn btn-primary">
                  Go somewhere
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
