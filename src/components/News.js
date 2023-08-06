import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    pageSize: 5,
    country: "in",
    category: "general",
  };

  static propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string,
  };

  // word first latter capitalize
  capitalizeFirstLetter = (value) => {
    return value
      .split(" ")
      .map((f) => f.charAt(0).toUpperCase() + f.slice(1))
      .join(" ");
  };

  // create constructor
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      pageSize: this.props.pageSize,
      totalResults: 0,
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - NewsMonkey`;
  }

  // create common function for get news data
  async getNewsData() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9ed1f4ef59684fad877330bcbf7df6dd&page=${this.state.page}&pageSize=${this.state.pageSize}`;
    this.setState({ loading: true });
    const data = await fetch(url);
    const parseData = await data.json();
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false,
    });
  }

  // component did mount
  async componentDidMount() {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9ed1f4ef59684fad877330bcbf7df6dd&page=${this.state.page}&pageSize=${this.state.pageSize}`;
    // this.setState({ loading: true });
    // const data = await fetch(url);
    // const parseData = await data.json();
    // this.setState({
    //   articles: parseData.articles,
    //   totalResults: parseData.totalResults,
    //   loading: false,
    // });
    this.getNewsData();
  }

  // on click previous handle
  // handlePrevClick = async () => {
  //   // console.log("yes call previous");
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${
  //   //   this.props.country
  //   // }&category=${
  //   //   this.props.category
  //   // }&apiKey=9ed1f4ef59684fad877330bcbf7df6dd&page=${
  //   //   this.state.page - 1
  //   // }&pageSize=${this.state.pageSize}`;
  //   // this.setState({ loading: true });
  //   // const data = await fetch(url);
  //   // const parseData = await data.json();
  //   // this.setState({
  //   //   articles: parseData.articles,
  //   //   page: this.state.page - 1,
  //   //   loading: false,
  //   // });
  //   this.setState({
  //     page: this.state.page - 1,
  //   });
  //   this.getNewsData();
  // };

  // on click next handle
  // handleNextClick = async () => {
  //   // if (
  //   //   !(
  //   //     this.state.page + 1 >
  //   //     Math.ceil(this.state.totalResults / this.state.pageSize)
  //   //   )
  //   // ) {
  //   //   let url = `https://newsapi.org/v2/top-headlines?country=${
  //   //     this.props.country
  //   //   }&category=${
  //   //     this.props.category
  //   //   }&apiKey=9ed1f4ef59684fad877330bcbf7df6dd&page=${
  //   //     this.state.page + 1
  //   //   }&pageSize=${this.state.pageSize}`;
  //   //   this.setState({ loading: true });
  //   //   const data = await fetch(url);
  //   //   const parseData = await data.json();
  //   //   this.setState({
  //   //     articles: parseData.articles,
  //   //     page: this.state.page + 1,
  //   //     loading: false,
  //   //   });
  //   // }
  //   this.setState({
  //     page: this.state.page + 1,
  //   });
  //   this.getNewsData();
  // };

  // on click page size change
  // handlePageSizeClick = (e) => {
  //   console.log("e :>> ", e.target.value);
  //   this.setState({ pageSize: e.target.value });
  // };

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9ed1f4ef59684fad877330bcbf7df6dd&page=${this.state.page}&pageSize=${this.state.pageSize}`;
    // this.setState({ loading: true });
    const data = await fetch(url);
    const parseData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parseData.articles),
      totalResults: parseData.totalResults,
      // loading: false,
    });
  };

  render() {
    return (
      <>
        <h1 className="text-center" style={{ margin: "35px 0px" }}>
          NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)}{" "}
          Headlines
        </h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles?.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title}
                      description={element.description}
                      imageUrl={element.urlToImage}
                      newUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* previous and next button fot pagination */}
        {/* <div className="container">
          <div className="d-flex justify-content-between">
            <button
              disabled={this.state.page <= 1}
              onClick={this.handlePrevClick}
              rel="noreferrer"
              className="btn btn-dark"
            >
              &larr; Previous
            </button>
            <button
              disabled={
                this.state.page >
                Math.ceil(this.state.totalResults) / this.state.pageSize
              }
              onClick={this.handleNextClick}
              rel="noreferrer"
              className="btn btn-dark"
            >
              Next &rarr;
            </button>
            <select onClick={this.handlePageSizeClick}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={40}>40</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div> */}
      </>
    );
  }
}
