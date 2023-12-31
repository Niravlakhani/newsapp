import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {
    const { title, description, imageUrl, newUrl, author, date, source } =
      this.props;
    return (
      <div className="container my-3">
        <div className="row">
          <div className="col-md-4">
            <div className="card" style={{ width: "22rem" }}>
              <div className="d-flex position-absolute end-0 justify-content-end">
                <span
                  class="badge rounded-pill bg-danger"
                  style={{ left: "91%", zIndex: "1" }}
                >
                  {source}
                </span>
              </div>
              <img
                src={
                  !!imageUrl
                    ? imageUrl
                    : "https://s.yimg.com/uu/api/res/1.2/DTcngAiVh8oGttXPcminFw--~B/Zmk9ZmlsbDtoPTYzMDtweW9mZj0wO3c9MTIwMDthcHBpZD15dGFjaHlvbg--/https://media-mbst-pub-ue1.s3.amazonaws.com/creatr-uploaded-images/2023-08/75fef1f0-316e-11ee-9ff9-202c3ee6e01a.cf.jpg"
                }
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">
                  {!!title && title.length > 45
                    ? `${title.slice(0, 45)}...`
                    : title}
                </h5>
                <p className="card-text">
                  {!!description && description.length > 88
                    ? `${description.slice(0, 88)}...`
                    : description}
                </p>
                <p className="card-text">
                  <small className="text-body-secondary">
                    By {!!author ? author : "Unknown"} on{" "}
                    {new Date(date).toGMTString()}
                  </small>
                </p>

                <a
                  rel="noreferrer"
                  href={newUrl}
                  target="_blank"
                  className="btn btn-sm btn-dark"
                >
                  Read More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
