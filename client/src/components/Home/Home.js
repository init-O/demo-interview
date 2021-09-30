import React from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import Footer from "./Footer.js";
import gif from "./assets/gif.gif";

export default function Home() {
  const user = JSON.parse(localStorage.getItem("profile"));
  console.log(user);

  return (
    <>
      <main>
        <div
          className="relative pt-16 pb-32 flex content-center items-center justify-center"
          style={{
            minHeight: "75vh",
          }}
        >
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>

          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div className="pr-12">
                  <h1
                    className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4"
                    data-aos="zoom-y-out"
                  >
                    {" "}
                    Nail Your Next
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
                      {" "}
                      Technical Interview
                    </span>
                  </h1>

                  <p className="mt-4 text-xl font-bold text-yellow-39999999900">
                    Interviewhub lets you conduct hassle-free technical
                    interviews in a real-time shared coding environment.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
            style={{ height: "70px" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-gray-800 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </div>

        <section className="relative bg-gray-800">
          {/* Section background (needs .relative class on parent and next sibling elements) */}
          <div
            className="absolute inset-0 top-1/2 md:mt-24 lg:mt-0 bg-gray-900 pointer-events-none"
            aria-hidden="true"
          ></div>

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
            <div className="py-12 md:py-20">
              {/* Items */}
              <div
                className="max-w-sm mx-auto grid gap-8
               md:grid-cols-2 lg:grid-cols-3 items-start 
               md:max-w-2xl lg:max-w-none px-4
               "
              >
                {/* 1st item */}

                <div
                  className="relative flex flex-col items-center p-3 rounded shadow-xl
                relative shadow-lg rounded-lg group  justify-center 
                rounded-lg h-full w-full absolute z-10 bg-cover bg-center
                bg-indigo-300 hover:bg-purple-500  transition-all duration-500 ease-in-out
                "
                  style={{
                    backgroundImage:
                      "url('https://image.flaticon.com/icons/png/512/1005/1005141.png')",
                  }}
                >
                  <div
                    className="bg-yellow-100 bg-opacity-50 rounded shadow-xl
                    relative shadow-lg rounded-lg group  justify-center 
                    rounded-lg h-full w-full text-center p-1"
                  >
                    <div
                      className="text-purple-800   text-center inline-flex items-center 
                  justify-center w-16 h-16 mt-1   shadow-lg rounded-full bg-red-500"
                    >
                      <i className="fas fa-laptop-code text-4xl"></i>
                    </div>

                    <h4
                      className="text-2xl font-bold leading-snug tracking-tight 
                  text-blue-700 "
                    >
                      Support for 5+ Languages & Themes
                    </h4>
                    <p className="text-purple-800 font-bold text-center">
                      {" "}Run code in any of the popular languages and see output in
                    real time.It all happens in your browser, no installations
                    needed.
                       
                    </p>
                  </div>
                </div>
             

                {/* 2nd item */}

                <div
                  className="relative flex flex-col items-center p-3 rounded shadow-xl
                relative shadow-lg rounded-lg group  justify-center 
                rounded-lg h-full w-full absolute z-10 bg-cover bg-center
                bg-indigo-300 hover:bg-purple-500  transition-all duration-500 ease-in-out
                "
                  style={{
                    backgroundImage:
                      "url('https://freesvg.org/img/Interview.png')",
                  }}
                >
                  <div
                    className="bg-yellow-100 bg-opacity-50 rounded shadow-xl
                    relative shadow-lg rounded-lg group  justify-center 
                    rounded-lg h-full w-full text-center p-1"
                  >
                    <div
                      className="text-purple-800   text-center inline-flex items-center 
                  justify-center w-16 h-16 mt-1   shadow-lg rounded-full bg-red-500"
                    >
                      <i className="fas fa-handshake text-4xl"></i>
                    </div>

                    <h4
                      className="text-2xl font-bold leading-snug tracking-tight 
                  text-blue-700 "
                    >
                      Effective Communication 
                    </h4>
                    <p className="text-purple-800 font-bold text-center">
                      {" "}Communicate effectively with your Peer-Mates with audio and
                    video along with code, whiteboard, resume analyser and much
                    more!
                       
                    </p>
                  </div>
                </div>
                
                {/* 3rd item */}

                
                <div
                  className="relative flex flex-col items-center p-3 rounded shadow-xl
                relative shadow-lg rounded-lg group  justify-center 
                rounded-lg h-full w-full absolute z-10 bg-cover bg-center
                bg-indigo-300 hover:bg-purple-500  transition-all duration-500 ease-in-out
                "
                  style={{
                    backgroundImage:
                      "url('https://creativedesignsguru.com/demo/nextjs-landing-page/assets/images/feature3.svg')",
                  }}
                >
                  <div
                    className="bg-yellow-100 bg-opacity-50 rounded shadow-xl
                    relative shadow-lg rounded-lg group  justify-center 
                    rounded-lg h-full w-full text-center p-1"
                  >
                    <div
                      className="text-purple-800   text-center inline-flex items-center 
                  justify-center w-16 h-16 mt-1   shadow-lg rounded-full bg-red-500"
                    >
                      <i className="far fa-comment-dots  text-4xl"></i>
                    </div>

                    <h4
                      className="text-2xl font-bold leading-snug tracking-tight 
                  text-blue-700 "
                    >
                      Question Bank Preloaded
                    </h4>
                    <p className="text-purple-800 font-bold text-center">
                      {" "}
                      Check our curated list of 3000+ full-stack, DSA, Core CS interview questions for
                      developers to be asked during interview
                    </p>
                  </div>
                </div>

                {/* 4th item */}



                <div
                  className="relative flex flex-col items-center p-3 rounded shadow-xl
                relative shadow-lg rounded-lg group  justify-center 
                rounded-lg h-full w-full absolute z-10 bg-cover bg-center
                bg-indigo-300 hover:bg-purple-500  transition-all duration-500 ease-in-out
                "
                  style={{
                    backgroundImage:
                      "url('https://interviewbuddy.in/images/video.png')",
                  }}
                >
                  <div
                    className="bg-yellow-100 bg-opacity-50 rounded shadow-xl
                    relative shadow-lg rounded-lg group  justify-center 
                    rounded-lg h-full w-full text-center p-1"
                  >
                    <div
                      className="text-purple-800   text-center inline-flex items-center 
                  justify-center w-16 h-16 mt-1   shadow-lg rounded-full bg-red-500"
                    >
                      <i className="fas fa-chalkboard-teacher text-4xl"></i>
                    </div>

                    <h4
                      className="text-2xl font-bold leading-snug tracking-tight 
                  text-blue-700 "
                    >Watch , Support and Learn
                    </h4>
                    <p className="text-purple-800 font-bold text-center">
                      {" "}Watch Live Streams of Mock Interview of other Candidates to analyse and learn from it.
                       
                    </p>
                  </div>
                </div>

 
                {/* 5th item */}




                <div
                  className="relative flex flex-col items-center p-3 rounded shadow-xl
                relative shadow-lg rounded-lg group  justify-center 
                rounded-lg h-full w-full absolute z-10 bg-cover bg-center
                bg-indigo-300 hover:bg-purple-500  transition-all duration-500 ease-in-out
                "
                  style={{
                    backgroundImage:
                      "url('https://interviewbuddy.in/images/n2.png')",
                  }}
                >
                  <div
                    className="bg-yellow-100 bg-opacity-50 rounded shadow-xl
                    relative shadow-lg rounded-lg group  justify-center 
                    rounded-lg h-full w-full text-center p-1"
                  >
                    <div
                      className="text-purple-800   text-center inline-flex items-center 
                  justify-center w-16 h-16 mt-1   shadow-lg rounded-full bg-red-500"
                    >
                      <i className="fas fa-rocket text-4xl"></i>
                    </div>

                    <h4
                      className="text-2xl font-bold leading-snug tracking-tight 
                  text-blue-700 "
                    >
                      See, analyse each Others Resume
                    </h4>
                    <p className="text-purple-800 font-bold text-center">
                      {" "}Starting a live interview takes seconds . Upload resume and review it during interview.
                 
                       
                    </p>
                  </div>
                </div>






 

                {/* 6th item */}




                <div
                  className="relative flex flex-col items-center p-3 rounded shadow-xl
                relative shadow-lg rounded-lg group  justify-center 
                rounded-lg h-full w-full absolute z-10 bg-cover bg-center
                bg-indigo-300 hover:bg-purple-500  transition-all duration-500 ease-in-out
                "
                  style={{
                    backgroundImage:
                      "url('https://interviewbuddy.in/images/n1.png')",
                  }}
                >
                  <div
                    className="bg-yellow-100 bg-opacity-50 rounded shadow-xl
                    relative shadow-lg rounded-lg group  justify-center 
                    rounded-lg h-full w-full text-center p-1"
                  >
                    <div
                      className="text-purple-800   text-center inline-flex items-center 
                  justify-center w-16 h-16 mt-1   shadow-lg rounded-full bg-red-500"
                    >
                      <i className="fas fa-clipboard-list text-4xl"></i>
                    </div>

                    <h4
                      className="text-2xl font-bold leading-snug tracking-tight 
                  text-blue-700 "
                    >Get Feedback on Resume and Perfomance
                    </h4>
                    <p className="text-purple-800 font-bold text-center">
                      {" "}Get Personalized Feedback & fair technical evaluations post interview.
                       
                    </p>
                  </div>
                </div>










 
              </div>
            </div>
          </div>
        </section>

        <section className="pb-20 relative block bg-gray-900">
          <div
            className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden "
            style={{ height: "80px" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-purple-500 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>

        <section className=" bg-purple-500  ">
          <div className="container mx-auto px-1">
            <div className="flex flex-wrap  items-centerb">
              <div className="w-full md:w-5/12 pt-1 px-2 mr-auto ml-auto">
                <h3 className="text-3xl  font-semibold leading-normal">
                  Interviewhub is a first of its kind mock interview platform.
                </h3>

                <p className="text-lg font-strong leading-relaxed mt-4 px-4 mb-4 text-black">
                  It is an interview and screening tool designed to let
                  candidates write programs that run. It’s simple, fast, and
                  remarkably powerful. And it looks, feels and behaves way more
                  like your real-world, working environment than, say, a
                  whiteboard..
                </p>
              </div>

              <div className="w-full md:w-4/12  mb-6 px-2 mr-auto ml-auto">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-pink-600">
                  {/* <img
                    alt="..."
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80"
                    className="w-full align-middle rounded-t-lg"
                  /> */}
                  <img src={gif} alt="loading..." />
                  <blockquote className="relative p-4 ">
                    <svg
                      preserveAspectRatio="none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 583 95"
                      className="absolute left-0 w-full block"
                      style={{
                        height: "95px",
                        top: "-94px",
                      }}
                    >
                      <polygon
                        points="-30,95 583,95 583,65"
                        className="text-pink-600 fill-current"
                      ></polygon>
                    </svg>
                    <h4 className="text-xl font-bold text-white">
                      Top Notch Services all for free
                    </h4>
                    <p className="text-md font-light mt-2 text-white">
                      Most of the services that Interviewhub offers for free are
                      given as paid services by other sites in market.
                    </p>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-20 relative block bg-gray-900">
          <div
            className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
            style={{ height: "80px" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-gray-900 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>

        <section class="text-gray-400 bg-gray-900 body-font">
          <div class="container px-5 pb-12 mx-auto">
            <div class="flex flex-col text-center w-full mb-2">
              <h1 class="sm:text-3xl text-2xl font-medium title-font mb-1 text-white">
                Join 200+ Happy Interviewhub Users
              </h1>
              <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
                Challenge yourself to code and interview better.Interviewhub is
                the #1 platform for 2,000+ developers that want to take their
                careers to the next level.
              </p>
            </div>
            <div class="flex flex-wrap -m-4 text-center">
              <div class="p-4 w-1/2 md:w-1/4 sm:w-1/2 w-full">
                <div class="border-2 border-gray-800 px-4 py-6 rounded-lg">
                  <i
                    className="flex fas fa-crown  text-purple-500 text-6xl
                shadow-lg font-normal items-center justify-center align-center
                 rounded-full outline-none focus:outline-none  mb-2"
                  ></i>
                  <h2 class="title-font font-medium text-3xl text-white">
                    2.7K
                  </h2>
                  <p class="leading-relaxed">Total Page Visits</p>
                </div>
              </div>
              <div class="p-4 w-1/2 md:w-1/4 sm:w-1/2 w-full">
                <div class="border-2 border-gray-800 px-4 py-6 rounded-lg">
                  <i
                    className="flex fas fa-users  text-purple-500 text-6xl
                shadow-lg font-normal items-center justify-center align-center
                 rounded-full outline-none focus:outline-none  mb-2"
                  ></i>
                  <h2 class="title-font font-medium text-3xl text-white">
                    1.3K
                  </h2>
                  <p class="leading-relaxed">Total Users</p>
                </div>
              </div>
              <div class="p-4 w-1/2 md:w-1/4 sm:w-1/2 w-full">
                <div class="border-2 border-gray-800 px-4 py-6 rounded-lg">
                  <i
                    className="flex fas fa-user-plus  text-purple-500 text-6xl
                shadow-lg font-normal items-center justify-center align-center
                 rounded-full outline-none focus:outline-none  mb-2"
                  ></i>

                  <h2 class="title-font font-medium text-3xl text-white">74</h2>
                  <p class="leading-relaxed">New Users(Last 30 Days)</p>
                </div>
              </div>
              <div class="p-4  md:w-1/4 sm:w-1/2 w-full">
                <div class="border-2 border-gray-800 px-4 py-6 rounded-lg">
                  <i
                    className="flex fas fa-chart-line  text-purple-500 text-6xl
                shadow-lg font-normal items-center justify-center align-center
                 rounded-full outline-none focus:outline-none  mb-2"
                  ></i>
                  <h2 class="title-font font-medium text-3xl text-white">
                    467
                  </h2>
                  <p class="leading-relaxed">Page Visits(Last 30 Days)</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-20 relative block bg-gray-900">
          <div
            className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
            style={{ height: "80px" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-gray-900 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
