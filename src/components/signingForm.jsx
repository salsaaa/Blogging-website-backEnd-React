import React, { Component } from 'react';
import '../css/open-iconic-bootstrap.min.css'
import '../css/animate.css'
import '../css/owl.carousel.min.css'
import '../css/owl.theme.default.min.css'
import '../css/magnific-popup.css'
import '../css/aos.css'
import '../css/ionicons.min.css'
import '../css/bootstrap-datepicker.css'
import '../css/jquery.timepicker.css'
import '../css/flaticon.css'
import '../css/icomoon.css'
import '../css/style.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import joi from 'joi-browser';
const SigningForm = props => {
  const [state, setState] = useState({
    user: {

      name: "",
      email: "",
      password: "",
      Blogs: [],
      friends: []


    }, errors: {}, account: false
  })

  useEffect(() => {
    console.log("render")
    setState({ ...state, errors: {} })
  }, [props.match.params.id]);

  const schema = {
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required().min(6),
    Blogs: joi,
    friends: joi,
    _id: joi

  }
  const handleSubmit = async e => {
    e.preventDefault();
    const errors = validate();
    if (errors && (props.match.params.id == "login")) {
      delete errors.name;

      if (Object.keys(errors).length > 0) {
        setState({ ...state, errors })
        return;
      }
    }
    else if (errors) {
      setState({ ...state, errors })
      return;
    }

    //callBackend
    setState({ ...state, errors: {} });
    const user = { ...state.user }

    const id = props.match.params.id
    if (id === "register") {
      try {

        const { data } = await axios.post(
          "https://blogging-website-2020.herokuapp.com/users/register", user
        );
        console.log("added")
        //Update State
        // props.onAdd(data);
        props.history.replace("/signingForm/login");
      }

      catch (err) {
        const errors = { ...state.errors }
        errors["email"] = "Email is already token"
        setState({ ...state, errors })

      }
    }
    else if (id === "login") {
      try {
        const { data } = await axios.post(
          "https://blogging-website-2020.herokuapp.com/users/login", user
        )
        props.onLogout("login", data.token);
        props.history.replace("/home");
      }
      catch (err) {

        setState({ ...state, account: true })
      };


    }
  }
  const validate = () => {
    const res = joi.validate(state.user, schema, { abortEarly: false });
    if (res.error == null) return null;
    const errors = {};
    for (const error of res.error.details) {
      errors[error.path] = error.message;
    }
    return errors;
  }
  const handleChange = ({ target }) => {

    const user = { ...state.user };
    user[target.id] = target.value;
    setState({ ...state, user })
  }
  return (<React.Fragment>
    <div>

      <div className="hero-wrap js-fullheight">
        <div className="overlay" />
        <div id="particles-js" />
        <div className="container">
          <div className="row no-gutters slider-text align-items-center justify-content-center" data-scrollax-parent="true">
            <div className="col-md-6 ftco-animate text-center" data-scrollax=" properties: { translateY: '70%' }">
              <p className="breadcrumbs" data-scrollax="properties: { translateY: '30%', opacity: 1.6 }"><span className="mr-2"><a href="index.html">Home</a></span> <span>{props.match.params.id == "login" ? "login" : "register"}</span></p>
              <h1 className="mb-3 bread" data-scrollax="properties: { translateY: '30%', opacity: 1.6 }">{props.match.params.id == "register" ? "Create a new account" : "Login"}</h1>
            </div>
          </div>
        </div>
      </div>
      <section className="ftco-section contact-section ftco-degree-bg">
        <div className="container bg-light small">

          <div className=" block-9">
            <div className="">
              <form className="center" onSubmit={handleSubmit}>
                <div className="form-group">
                  {props.match.params.id == "register" && <input type="text" className="form-control" placeholder="Name" id="name" onChange={handleChange} />}
                  {state.errors.name && <div className="alert alert-danger">{state.errors.name}</div>}

                </div>
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Email" id="email" onChange={handleChange} />
                  {state.errors.email && <div className="alert alert-danger">{state.errors.email}</div>}

                </div>
                <div className="form-group">
                  <input type="password" className="form-control " placeholder="Password" id="password" onChange={handleChange} />
                  {state.errors.password && <div className="alert alert-danger">{state.errors.password}</div>}

                </div>
                <div className="form-group btnCenter">

                  {state.account && props.match.params.id == "login" && <div class="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>Login failed </strong>Invalid Username Or Email Or Password.
</div>}

                  <button type="submit" value="Submit" className=" btn btn-primary py-3 px-5">{props.match.params.id == "login" ? "login" : "register"}</button>


                  <div>
                    <br />
                    {props.match.params.id == "register" && (<div><span>Already have an account? </span ><Link to="/signingForm/login" >Login</Link></div>)}

                    {props.match.params.id == "login" && (<div><span>don't have an acount? </span ><Link to="/signingForm/register" >Sign Up</Link></div>)}

                  </div>

                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      {/* loader */}
    </div>

  </React.Fragment>);
}


export default SigningForm;