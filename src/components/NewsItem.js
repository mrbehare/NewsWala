import React, { Component } from "react";

export class NewsItem extends Component {

  render() {
    let { title, description,imageUrl,newsUrl,author,date,source} = this.props;
    return (
      <div className="my-3" >
        <div className="card" >
          <img src= {imageUrl?imageUrl:"https://cdn.pixabay.com/photo/2021/08/04/13/06/software-developer-6521720_640.jpg"} className="card-img-top" alt="..." />
          <div className="card-body">
          <span className="badge rounded-pill bg-success text-light">{source}</span>
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted"> <strong>By {!author?"Unknown":author}on {new Date(date).toGMTString()} </strong></small></p>
            <a href={newsUrl}  target ="blank" className="btn btn-sm btn-primary btn-dark">
             Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
