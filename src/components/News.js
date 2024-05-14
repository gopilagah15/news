import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


export class News extends Component { 
    static defaultProps={
        country : 'in',
        pageSize:4 ,
        category:'science'
       }

       static propTypes={
        country: PropTypes.string,
        pageSize:PropTypes.number
       }
       capitalizeFirstLetter=(string)=>{
        return string.charAt(0).toUpperCase()+string.slice(1);
       }
    constructor(props){
        super(props);
        console.log('This is constructor');
        this.state={
            articles:[],
            loading:true,
            page:1,
            totalResults:0
        } 
        document.title = `NewsMonkey - ${this.capitalizeFirstLetter(this.props.category)}`;
    }
    async updateNews(){
        this.props.setProgress(10);
        let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&category=${this.props.category}&apiKey=9f13f8cd816b4d3a83ac7385e5618eb2&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles:parsedData.articles,
            totalArticles:parsedData.totalArticles ,
            loading:false
        })
        this.props.setProgress(100);
    }
    async componentDidMount(){
       this.updateNews();
    }
    handlePrevClick= async()=>{
       
        this.updateNews();
        this.setState({
            page:this.state.page-1,
        })
    }
    handleNextClick= async()=>{
        this.updateNews();
        this.setState({
            page:this.state.page+1,
        })  
    }
    fetchMoreData =async () => {
      this.setState({page:this.state.page+1});
      let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&category=${this.props.category}&apiKey=9f13f8cd816b4d3a83ac7385e5618eb2&page=${this.state.page}&pageSize=${this.props.pageSize}`; 
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({
          articles:this.state.articles.concat(parsedData.articles),
          totalArticles:parsedData.totalArticles , 
          loading:false
      })
      };
  render() {
    return (
    <>
        <h1 className='text-center'>NewsMonkey - News on {this.capitalizeFirstLetter(this.props.category)}</h1>
        <div className="container"  >
        {/* {this.state.loading && <Spinner/>} */}
        </div>
        
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner/>}
        >
<div className="container">
        <div className="row ">
        
            {!this.state.loading && this.state.articles.map((e)=>{
            // {this.state.articles.map((e)=>{
            return <div className="col-md-4 my-3" key={e.url} >
                <NewsItem title={e.title?e.title.slice(0,44):''} description ={e.description?e.description.slice(0,88):''} imageUrl={e.urlToImage?e.urlToImage:'https://scitechdaily.com/images/Gateway-Habitation-and-Logistics-Outpost.jpg'} url={e.url} author={e.author} date={e.publishedAt} source={e.source.name}/>
            </div> })} 
        </div>
        </div>
            </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
        <button disabled={(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize))} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
        
    </>
    )
  }
}

export default News
