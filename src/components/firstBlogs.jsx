import React from 'react';
import { Link } from 'react-router-dom';

const FirstBlogs = (props) => {
  return (
    <React.Fragment>
      <a className="featured-img">
        <div className="text-1 p-4 d-flex align-items-center">
          <h3>{props.blog.title}<br />{props.blog.tags.map(t => <span className="tag">#{t} </span>)}</h3>
        </div>
        <img src={props.blog.pic} className="img-fluid" alt />
        <div className="text p-4 d-flex align-items-center">
          <div className="user d-flex align-items-center">
            {localStorage.getItem('token') && <div className="user-img mr-3" style={{ backgroundImage: 'url("https://easd.org.za/wp-content/themes/blaskan/assets/images/custom-header.jpg")' }} />}
            {localStorage.getItem('token') && <h3><Link to={`/profile/${props.blog.userId}`} onClick={() => props.onMyProfile(false)} >{props.blog.author}</Link><br /></h3>}
          </div>
        </div>
      </a>
    </React.Fragment>
  );
}

export default FirstBlogs;