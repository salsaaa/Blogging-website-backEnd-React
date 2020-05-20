import React from 'react';
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
import Blog from './Blog'
import CreateOrEditPost from './createOrEditPost'
import { useState, useEffect } from 'react';
import _ from "lodash";
import Pagination from "./pagination";
import FirstBlogs from './firstBlogs'

const HomePage = props => {
  const [state, setState] = useState({
    showedBlogs: [],
    pageSize: 3,

  })

  useEffect(() => {

  }, []);
  //////Pagination
  const startIndex = (props.activePage - 1) * state.pageSize;
  state.showedBlogs = _(props.Blogs)
    .slice(startIndex)
    .take(state.pageSize)
    .value();
  return (
    <React.Fragment>

      {(props.match.params.id == "add") && (
        <CreateOrEditPost
          form={props.match.params.id}
          onAdd={props.onAdd}
          history={props.history}


        />)}

      <div>

        {/* <div class="js-fullheight"> */}
        <div className="hero-wrap js-fullheight">
          <div className="overlay" />
          <div id="particles-js" />
          <div className="container">
            <div className="row no-gutters slider-text align-items-center justify-content-center" data-scrollax-parent="true">
              <div className="col-md-6 ftco-animate text-center" data-scrollax=" properties: { translateY: '70%' }">
                {props.newFeeds != true ? <h1 className="mb-4" data-scrollax="properties: { translateY: '30%', opacity: 1.6 }">Welcome to our <strong>blogging</strong> website</h1> : <h1 className="mb-4" data-scrollax="properties: { translateY: '30%', opacity: 1.6 }">See what your friends want to <strong>share</strong> with you ..</h1>}
                {props.newFeeds != true && localStorage.token && <p data-scrollax="properties: { translateY: '30%', opacity: 1.6 }"><Link to="/home/add" className="btn btn-primary btn-outline-white px-5 py-3">Start a post ...</Link></p>}


              </div>
            </div>
          </div>
        </div>
        <div className="bg-light ">
          <section className="ftco-section-featured container">
            <div className="container-fluid" data-scrollax-parent="true">
              <hr />
              <hr />
              {props.newFeeds != true && props.firstBlogs != 0 && props.firstBlogs.length > 5 &&


                <div className="row no-gutters d-flex align-items-center" data-scrollax=" properties: { translateY: '-30%'}">
                  <div className="col-md-3 mb-3">

                    <FirstBlogs blog={props.firstBlogs[0]} onMyProfile={props.onMyProfile} />
                  </div>
                  <div className="col-md-6">
                    <div className="row no-gutters">
                      <div className="col-md-12">
                        <div className="row no-gutters d-flex align-items-end">
                          <div className="col-md-8">

                            <FirstBlogs blog={props.firstBlogs[5]} onMyProfile={props.onMyProfile} />

                          </div>
                          <div className="col-md-4">

                            <FirstBlogs blog={props.firstBlogs[3]} onMyProfile={props.onMyProfile} />

                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="row no-gutters d-flex align-items-start">
                          <div className="col-md-8">

                            <FirstBlogs blog={props.firstBlogs[1]} onMyProfile={props.onMyProfile} />

                          </div>
                          <div className="col-md-4">

                            <FirstBlogs blog={props.firstBlogs[2]} onMyProfile={props.onMyProfile} />

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">

                    <FirstBlogs blog={props.firstBlogs[6]} onMyProfile={props.onMyProfile} />

                  </div>
                </div>

              }


            </div>

          </section>
        </div>
        <section className="ftco-section bg-light">
          <div className="container">
            <div className="row justify-content-center mb-5 pb-5">
              <div className="col-md-7 text-center heading-section ftco-animate">
                <span className="subheading">Blog</span>
                <h2>Recent Blogs</h2>
                <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in</p>
              </div>
            </div>
            <div className="row">
              {state.showedBlogs.map(p =>
                (
                  <Blog
                    key={p.id}
                    blog={p}
                    profile={props.profile}
                    onMyProfile={props.onMyProfile}


                  />

                ))}
            </div>
            <Pagination
              onPageClicked={props.onPageClick}
              activePage={props.activePage}
              pageCount={props.Blogs.length / state.pageSize}
            ></Pagination>

          </div>
        </section>


        <section className="ftco-section testimony-section bg-light">
          <div className="container">
            <div className="row justify-content-center mb-5 pb-5">
              <div className="col-md-7 text-center heading-section ftco-animate">
                <span className="subheading">Customer Says</span>
                <h2 className="mb-4">Our satisfied customer says</h2>
                <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in</p>
              </div>
            </div>
            <div className="row ftco-animate">
              <div className="col-md-12">
                <div className="carousel-testimony owl-carousel ftco-owl">
                  <div className="item text-center">
                    <div className="testimony-wrap p-4 pb-5">
                      <div className="user-img mb-4" style={{ backgroundImage: 'url("person_1.jpg")' }}>
                        <span className="quote d-flex align-items-center justify-content-center">
                          <i className="icon-quote-left" />
                        </span>
                      </div>
                      <div className="text">
                        <p className="mb-5">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                        <p className="name">Dennis Green</p>
                        <span className="position">Marketing Manager</span>
                      </div>
                    </div>
                  </div>
                  <div className="item text-center">
                    <div className="testimony-wrap p-4 pb-5">
                      <div className="user-img mb-4" style={{ backgroundImage: 'url("person_2.jpg")' }}>
                        <span className="quote d-flex align-items-center justify-content-center">
                          <i className="icon-quote-left" />
                        </span>
                      </div>
                      <div className="text">
                        <p className="mb-5">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                        <p className="name">Dennis Green</p>
                        <span className="position">Interface Designer</span>
                      </div>
                    </div>
                  </div>
                  <div className="item text-center">
                    <div className="testimony-wrap p-4 pb-5">
                      <div className="user-img mb-4" style={{ backgroundImage: 'url("person_3.jpg")' }}>
                        <span className="quote d-flex align-items-center justify-content-center">
                          <i className="icon-quote-left" />
                        </span>
                      </div>
                      <div className="text">
                        <p className="mb-5">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                        <p className="name">Dennis Green</p>
                        <span className="position">UI Designer</span>
                      </div>
                    </div>
                  </div>
                  <div className="item text-center">
                    <div className="testimony-wrap p-4 pb-5">
                      <div className="user-img mb-4" style={{ backgroundImage: 'url("person_1.jpg")' }}>
                        <span className="quote d-flex align-items-center justify-content-center">
                          <i className="icon-quote-left" />
                        </span>
                      </div>
                      <div className="text">
                        <p className="mb-5">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                        <p className="name">Dennis Green</p>
                        <span className="position">Web Developer</span>
                      </div>
                    </div>
                  </div>
                  <div className="item text-center">
                    <div className="testimony-wrap p-4 pb-5">
                      <div className="user-img mb-4" style={{ backgroundImage: 'url("person_1.jpg")' }}>
                        <span className="quote d-flex align-items-center justify-content-center">
                          <i className="icon-quote-left" />
                        </span>
                      </div>
                      <div className="text">
                        <p className="mb-5">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                        <p className="name">Dennis Green</p>
                        <span className="position">System Analytics</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


      </div>
    </React.Fragment>
  );
}

export default HomePage;