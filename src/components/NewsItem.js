import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
      let {title,description,imageUrl,url,author,date,source} = this.props
    return (
      <div className='my-3'>
         <div className="card" style={{height:'18rem', width:'18rem', overflow:'hidden'}}>
         <span className="position-absolute   translate-middle badge rounded-pill bg-danger" style={{left: '90%',zIndex: 1, top:'2%'}}>
    {source} 
  </span>
        <img src={imageUrl} className="card-img-top" alt="..."/>
         <div className="card-body">
        <h5 className="card-title">{title}</h5> 
        <p className="card-text">{description}</p>
        <p> <small className="text-muted">By {!author?'Unknown':author} on {new Date(date).toGMTString()}</small></p>
    <a href={url} target='_blank'rel="noreferrer" className="btn btn-primary">Read More...</a>
  </div>
</div>
      </div>
    )
  }
}

export default NewsItem
