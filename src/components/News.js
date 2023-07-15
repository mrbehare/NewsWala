import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProp={
    country:"in",
    pageSize: 6,
    category: "sports"
  }

  static PropsTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category: PropTypes.string
  }
capitalizeFirstLetter=(str)=> {
  return str.charAt(0).toUpperCase() + str.slice(1);
  
}
  constructor(props) {
    super(props);
    console.log("This is the constructor of the News component");
    this.state = { articles: [], loading: false, page: 1,totalResults:0 };
    document.title=`NewsWala-${this.capitalizeFirstLetter(this.props.category)}`
  }
  
  async componentDidMount() {
    this.props.setProgress(10)
    let url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2cc3143c4aeb4106af64e1d8363b4b41&pageSize=${this.props.pageSize}`;
      this.props.setProgress(30)
      this.setState({loading:true})
    let data = await fetch(url);
    this.props.setProgress(50)
    let parseData = await data.json();
    this.props.setProgress(70)
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading:false
    });
    this.props.setProgress(100)
  }
  // handlePrevClick = async () => {
  //   let url = ` https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2cc3143c4aeb4106af64e1d8363b4b41&page=${
  //     this.state.page - 1
  //   }&pageSize=${this.props.pageSize}`;
  //   this.setState({loading:true})
  //   let data = await fetch(url);
  //   let parseData = await data.json();

  //   this.setState();
  //   console.log(this.state.page)
  //   this.setState({
  //     page: this.state.page - 1,
  //     articles: parseData.articles,
  //     loading:false
  //   });
  // };

  // handleNextClick = async () => {
  //   if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {
  //   } else {
  //     let url = ` https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2cc3143c4aeb4106af64e1d8363b4b41&page=${
  //       this.state.page + 1
  //     }&pageSize=${this.props.pageSize}`;
  //     this.setState({loading:true})
  //     let data = await fetch(url);
  //     let parseData = await data.json();
  //     this.setState({
  //       page: this.state.page + 1,
  //       articles: parseData.articles,
  //       loading:false
  //     });
  //   }
  // };

  fetchMoreData = async () => {
    
    this.setState({page:this.state.page+1})
    let url = ` https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2cc3143c4aeb4106af64e1d8363b4b41&page=${
      this.state.page+1
    }&pageSize=${this.props.pageSize}`;
   
    this.setState({loading:true})
    let data = await fetch(url);
    
    let parseData = await data.json();

    this.setState({
      page: this.state.page ,
      articles: this.state.articles.concat(parseData.articles),
      loading:false
    });
   
  };

  render() {
    return (
      <>
        <h1 className="text-center " style={{margin:'25px 0px',marginTop:'60px'}} >NewsWala - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
{/* {this.state.loading&&<Spinner />} */}
<InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner/>} 
          endMessage={<h3 className="text-center my-3 ">No More Data to Show</h3>}>
            <div className="container  ">
        <div className="row">
        { this.state.articles.map((element) => (
  <div className="col-md-4" key={element.url}>
    <NewsItem
      title={element.title}
      description={element.description}
      imageUrl={
        element.urlToImage}
      newsUrl={element.url}
      author={element.author}
      date={element.publishedAt}
      source={element.source.name}
    />
  </div>
  
))}
        </div>
        </div>
        </InfiniteScroll>
        
        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr;Previous
          </button>
          <button
            disabled={
              this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next&rarr;
          </button>
        </div> */}
      </>
    );
  }
}
