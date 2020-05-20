import React from 'react';
import '../scss/create-post.component.scss'
import '../../node_modules/font-awesome/css/font-awesome.min.css'
import '@fortawesome/fontawesome-svg-core'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { faVideo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import { useState, useEffect } from 'react';
import joi from 'joi-browser';
import { Link } from 'react-router-dom';




const CreateOrEditPost = props => {
  const [state, setState] = useState({
    blog: {
      author: "",
      title: "",
      body: "",
      pic: "https://data.whicdn.com/images/214547070/original.jpg",
      tags: [],

    }, errors: {}
  })
  async function fetchMyAPI() {
    const id = props.form

    if (id !== "add") {

      const { data } = await axios.get("https://blogging-website-2020.herokuapp.com/blogs/" + id);
      setState({ ...state, blog: data[0] });
    }
  }

  useEffect(() => {
    fetchMyAPI();
  }, []);
  const schema = {

    title: joi.string().required(),
    body: joi.string().required(),
    tags: joi.required(),
    pic: joi,
    _id: joi,
    userId: joi,
    author: joi

  }
  const handleSubmit = async e => {

    e.preventDefault();
    const errors = validate();
    if (errors) {
      setState({ ...state, errors })

      return;
    }
    setState({ ...state, errors: {} });

    const blog = { ...state.blog }

    const id = props.form
    if (id == "add") {

      const { data } = await axios.post(
        "https://blogging-website-2020.herokuapp.com/blogs", blog
      );
      props.onAdd(data.data);
      console.log("added")
      props.history.replace("/home");
    }
    else {


      try {

        const { data } = await axios.patch(`https://blogging-website-2020.herokuapp.com/blogs/${id}`, blog);
        props.onEdit(data.userUdated);
        props.history.replace("/profile");
      }
      catch (error) {
        if (error.response && error.response.status === 404) {
          alert("Blog already updated.");
        } else {
          alert("Something went wrong");
        }
      }
    }
  }
  const handleKeyEnter = (event) => {

    if (event.key === "Enter") {

      state.blog.tags.push(event.target.value)
      setState({ ...state, tags: state.blog.tags })

      event.target.value = "";
      event.preventDefault();

    }

  }
  const handleDeleteTag = (tag) => {
    const index = state.blog.tags.indexOf(tag)
    state.blog.tags.splice(index, 1)
    setState({ ...state, tags: state.blog.tags })
  }


  const validate = () => {
    const res = joi.validate(state.blog, schema, { abortEarly: false });
    if (res.error == null) return null;
    const errors = {};
    for (const error of res.error.details) {
      errors[error.path] = error.message;
    }
    return errors;
  }
  const handleChange = ({ target }) => {

    const blog = { ...state.blog };
    blog[target.id] = target.value;
    setState({ ...state, blog })
  }


  return (

    <React.Fragment>
      <div id="myModal" className="modal">
        {/* Modal content */}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="font-weight-normal create-post">{props.form === "add" ? "Create post" : "Edit Post"}</h4>
            <Link to={props.form == "add" ? "/home" : "/profile"}>

              <FontAwesomeIcon className="exit" icon={faTimes} />
            </Link>
          </div>
          <div className="modal-body">
            <div>
              <div className="dropdown dropdown--right">

              </div>
            </div>
          </div>
          <div className="form-group ">

            <input type="text" placeholder="Title" className="post post-line " value={state.blog.title} id="title" onChange={handleChange} />
            {state.errors.title && <div className="alert alert-danger">{state.errors.title}</div>}

          </div>
          <div className="form-group">

            <textarea value={state.blog.body} onChange={handleChange} id="body" cols={50} rows={4} className="post " placeholder="What's on your mind?" />
            {state.errors.body && <div className="alert alert-danger">{state.errors.body}</div>}
          </div>
          <div className="post">
            {state.blog.tags.map(tag => (

              <div className="chip"><span className="closebtn">{tag}<i onClick={() => handleDeleteTag(tag)} className="fa fa-times" /></span></div>
            ))}

          </div>

          <input onKeyPress={handleKeyEnter} type="text" placeholder="Tag" className="post post-line tag" name id />


          <div className="hashtag">
            <a href="#" className="card-link">Add hashtag</a>
            <p className="help">Help the right people see your post </p>
          </div>
          <div className="hashtag">
            <label className="label" htmlFor="cameraInput"><i className="icon camera fa fa-camera" /></label>
            <input id="cameraInput" accept="image/*" type="file" multiple style={{ display: 'none' }} />

            <label className="label" htmlFor="videoInput"><FontAwesomeIcon className="icon" icon={faVideo} /></label>
            <input id="videoInput" accept="video/*" type="file" multiple style={{ display: 'none' }} />

            <label className="label" htmlFor="fileInput"><i className="icon file fa fa-file" /></label>
            <input id="fileInput" type="file" multiple style={{ display: 'none' }} />

            <button type="submit" className="btn btn-primary postbtn ">
              {props.form === "add" ? "Add" : "Edit"}
            </button>



          </div>
        </div>
        <div />
      </form>

    </React.Fragment>
  );
}


export default CreateOrEditPost;