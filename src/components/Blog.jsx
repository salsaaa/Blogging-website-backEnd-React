import React from 'react';
import { Link } from 'react-router-dom';
import {useState, useEffect } from 'react';


const Blog=(props)=>{
  const[state,setState]=useState ( { 
  })
  async function fetchMyAPI() {
   
  }
  
  useEffect(() => {
    fetchMyAPI();

  },[]);
  return ( <React.Fragment>
              <div className="col-md-4 ftco-animate">
        <div className="blog-entry">
          <a className="block-20" style={{backgroundImage: `url("${props.blog.pic}")`}}>
          </a>
          <div className="text p-4 d-block">
            <div className="meta mb-3">
              <div><a href="#">July 12, 2018</a></div>
                    
        
              {localStorage.getItem('token')&&<div><Link to={`/profile/${props.blog.userId}`}  onClick={()=>props.onMyProfile(false)} >{props.blog.author}</Link></div>}
              <div><a href="#" className="meta-chat"><span className="icon-chat" /> 3</a></div>
             
              <div className="margin"></div>
              {props.myProfile&&<div><Link to={`/profile/${props.blog._id}`} className="meta-chat"><i className="large-icon icon-edit"></i></Link></div>}

              {props.myProfile&&<div><a onClick={()=>props.onDeleteClicked(props.blog)} className="meta-chat"><i className="large-icon icon-trash"></i></a></div>}
              
            </div>
        <h3 className="heading"><a href="#"><p className="title">{props.blog.title}</p>{props.blog.body}</a></h3>
        <div className="row ">
            {props.blog.tags.map(
                tag=>(

                    <a className="hash" href="/">#{tag}</a>
                )
            )}
          </div>
        </div>
      </div>
      </div>
    
        </React.Fragment> );
    }

 
export default Blog;