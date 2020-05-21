import React from 'react';
import axios from 'axios';
import Blog from './Blog'
import CreateOrEditPost from './createOrEditPost'
import { useState, useEffect } from 'react';
import { bool } from 'joi';

const Profile = props => {
  const [state, setState] = useState({
    blogs: [],
    searchedBlogs: [],
    authorName: "",
    friends: [],
    following: false
  })
  const handleEdit = blog => {
    //Clone
    const blogs = [...state.blogs];
    //Edit
    const index = blogs.findIndex(p => p._id === blog._id);
    blogs[index] = blog;
    //Set State
    setState({ blogs });
  };
  const handleFollow = async (e,friendId) => {
    e.preventDefault();

    if(state.following)
    {
      await axios.patch("https://blogging-website-2020.herokuapp.com/users/deleteFriend", { friendId });

      setState({ ...state, following:false })

    }
    else{

      await axios.patch("https://blogging-website-2020.herokuapp.com/users/addFriend", { friendId });
      setState({ ...state, following:true })
    }
  };
  const handleBlogDelete = async blog => {
    // //backend
    const { data } = await axios.delete(
      `https://blogging-website-2020.herokuapp.com/blogs/${blog._id}`
    )
    //Edit
    const blogs = [...state.blogs.filter(p => p._id != blog._id)]
    //Set state
    setState({ ...state, blogs });
  }
  async function fetchMyAPI() {
    const id = props.match.params.id

    let blogsUrl = "https://blogging-website-2020.herokuapp.com/blogs/getByUserId/" + id;
    let userFriends = "https://blogging-website-2020.herokuapp.com/users/getFriends"

    const promise1 = axios.get(blogsUrl);
    const promise2 = axios.get(userFriends);

    Promise.all([promise1, promise2]).then(function (values) {
      if (values[0].data.myProfile) {
        props.history.replace("/profile");
        props.onMyProfile(true)
      }

      else {
        setState({
          ...state, blogs: values[0].data.blogs,authorName:values[0].data.authorName, friends: values[1].data.friends
        })
      }

    });


  }
  useEffect(() => {
    fetchMyAPI();
    window.scrollTo(0, 0)
  }, [props.myProfile]);
  ////searching
  if (state.blogs) {
    state.searchedBlogs = state.blogs.filter((P) =>
      P.title.toLowerCase().includes(props.searchProfile.toLowerCase()) ||
      P.tags.find((t) =>
        t.toLowerCase().includes(props.searchProfile.toLowerCase())
      ) ||
      P.author.toLowerCase().includes(props.searchProfile.toLowerCase())
    )
    props.onResetSearch();
  }
  return (
    <React.Fragment>

      <div>
        {(props.match.params.id) && (props.myProfile) && (
          <CreateOrEditPost
            form={props.match.params.id}
            onEdit={handleEdit}
            userId={props.userId}
            history={props.history}


          />)}
        <img className="profileImg" src='https://easd.org.za/wp-content/themes/blaskan/assets/images/custom-header.jpg' alt="" />
        <div className="container">
          <div className="row no-gutters slider-text  justify-content-center" data-scrollax-parent="true">
            <div className="col-md-6 ftco-animate text-center" data-scrollax=" properties: { translateY: '70%' }">
              <h1 data-scrollax="properties: { translateY: '30%', opacity: 1.6 }">Welcome {(!props.myProfile) && "to"} <strong>{state.blogs[0] && ((props.myProfile)?state.authorName:state.blogs[0].author)}{!props.myProfile && "'s"}</strong> {!props.myProfile && "Profile"}</h1>
              {!props.myProfile && <p data-scrollax="properties: { translateY: '30%', opacity: 1.6 }"><a href="#" onClick={(e) => handleFollow(e,state.blogs[0] && state.blogs[0].userId)} className="btn btn-primary btn-outline-white px-5 py-3">{state.following || state.friends.includes(state.blogs[0] && state.blogs[0].userId) ? "Following" : "follow"}</a></p>}
            </div>
          </div>
        </div>

      </div>
      <section className="ftco-section bg-light">
        <div className="container">
          <div className="row justify-content-center mb-5 pb-5">
            <div className="col-md-7 text-center heading-section ftco-animate">
              <span className="subheading">Blog</span>
              <h2>{props.myProfile ? "My Blogs" : `${state.blogs[0] && state.blogs[0].author}'s Blogs`} </h2>
              <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in</p>
            </div>
          </div>
          <div className="row">
            <div className="col">

              {

                state.searchedBlogs.map(p => p &&
                  (
                    <Blog
                      key={p.id}
                      blog={p}
                      onDeleteClicked={handleBlogDelete}
                      myProfile={props.myProfile}
                      onMyProfile={props.onMyProfile}



                    />

                  ))}
            </div>
            <div className="testimony-wrap p-4 pb-5">
              <div className="user-img mb-4" style={{ backgroundImage: 'url("https://easd.org.za/wp-content/themes/blaskan/assets/images/custom-header.jpg")' }}>
                <span className="quote d-flex align-items-center justify-content-center">
                  <i className="icon-quote-left" />
                </span>
              </div>
              <div className="text">
                <p className="mb-5">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                <p className="name">{props.myProfile ? "Me" : `${state.blogs[0] && state.blogs[0].author}`}</p>
                <span className="position">Marketing Manager</span>
              </div>
            </div>
          </div>


        </div>

      </section>
    </React.Fragment>
  );
}


export default Profile;