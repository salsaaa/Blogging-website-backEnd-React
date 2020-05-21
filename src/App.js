import React, { Component } from "react";
import HomePage from "./components/homePage";
import SigningForm from "./components/signingForm";
import Profile from "./components/profile";
import { Route, Redirect,useLocation} from "react-router-dom";
import axios from "axios";
import NavBar from "./components/navBar";
import Footer from "./components/footer";
import { bool } from "joi";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Blogs: [],
      register: "login",
      searchedBlogs: [],
      search: "",
      searchProfile: "",
      logout: bool,
      myProfile: bool,
      newFeeds: bool,
      activePage:1
    };
  }
  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.newFeeds !== this.state.newFeeds ||
      prevState.logout !== this.state.logout
    ) {
      if (this.state.newFeeds == true) {
        const { data } = await axios.get(
          "https://blogging-website-2020.herokuapp.com/users/getFriendsBlogs"
        );
        this.setState({ Blogs: data.blogs.reverse() });
        
      } else {
        const { data } = await axios.get("https://blogging-website-2020.herokuapp.com/blogs");
        this.setState({ Blogs: data.reverse() });
      }
    }
  }

  async componentDidMount() {
    this.handleHeaderAndLogoutStatet();
  }
 handlePageClick = (e,page) => {
  e.preventDefault(); 

    this.setState({ activePage: page });

  };
  handleRegister = (register) => {
    this.setState({ register });
  };
  handleMyProfile = (myProfile) => {
    this.setState({ myProfile });
  };
  handleAddBlogs = (blog) => {
    const Blogs = [...this.state.Blogs];
    Blogs.unshift(blog);
    this.setState({ Blogs });
  };

  handleHeaderAndLogoutStatet = () => {
    if (localStorage.getItem("token") !== null) {
      axios.defaults.headers.common["Authorization"] = localStorage.token;
      this.setState({ logout: true });
    } else {
      delete axios.defaults.headers.common["Authorization"];
      this.setState({ logout: false });
    }
  };
  handleLocalStorage = (sign, token) => {
    if (sign == "login") {
      if (localStorage.getItem("token") === null) {
        localStorage.setItem("token", token);
        this.handleHeaderAndLogoutStatet();
      }
    } else if (sign == "logout") {
      if (localStorage.getItem("token") !== null) {
        localStorage.removeItem("token");
        this.handleHeaderAndLogoutStatet();
      }
    }
  };
  resetSearch=()=>{
    this.setState({ search: "" ,searchProfile:""});

  }
  handleSearch = (e) => {
    if (e.key === "Enter") {
    e.preventDefault(); 

    if(window.location.pathname=='/home')
    {
      this.setState({ search: e.target.value ,activePage:1});
     
      e.target.value="";
    }
    else{
      this.setState({ searchProfile: e.target.value,activePage:1 });
      e.target.value="";
    }}
  };

  handleNewFeeds = (newFeeds) => {
    this.setState({ newFeeds});

  };
  handleResetSearch=()=>{
    this.state.searchProfile="";

  }
  render() {
    ////searching
    if (this.state.Blogs) {
      
      this.state.searchedBlogs = this.state.Blogs.filter((P) =>
      P.title.toLowerCase().includes(this.state.search.toLowerCase()) || 
      P.tags.find((t) =>
          t.toLowerCase().includes(this.state.search.toLowerCase())
        ) ||
        P.author.toLowerCase().includes(this.state.search.toLowerCase())
      )
    this.state.search="";
      
    }

    return (
      <React.Fragment>
        <NavBar
          onRegister={this.handleRegister}
          onSearch={this.handleSearch}
          logout={this.state.logout}
          onMyProfile={this.handleMyProfile}
          onLogout={this.handleLocalStorage}
          onNewFeeds={this.handleNewFeeds}
          onResetSearch={this.resetSearch}
        />

        <Redirect from="/" to="/home" />
        {/* id=add for adding posts and view modal */}
        <Route
          path="/home/:id?"
          render={(props) => (
            <HomePage
              {...props}
              onMyProfile={this.handleMyProfile}
              Blogs={this.state.searchedBlogs}
              onAdd={this.handleAddBlogs}
              newFeeds={this.state.newFeeds}
              firstBlogs={this.state.Blogs}
              activePage={this.state.activePage}
              onPageClick={this.handlePageClick}

            />
          )}
        />

        {/* id for register or login */}
        <Route
          path="/signingForm/:id"
          render={(props) => (
            <SigningForm {...props} onLogout={this.handleLocalStorage} />
          )}
        />
        {/* id if not exist then my profile
        if exist then any profile user*/}
        <Route
          path="/profile/:id?"
          render={(props) => (
            <Profile
              {...props}
              myProfile={this.state.myProfile}
              onMyProfile={this.handleMyProfile}
              searchProfile={this.state.searchProfile}
              onResetSearch={this.handleResetSearch}

            />
          )}
        />

        <Footer />
      </React.Fragment>
    );
  }
}
// function mapStateToProps(state) {
//   return {
//     Blogs: state.blogs.Blogs, //Get items from productsReducer
//   };
// }

export default App;
