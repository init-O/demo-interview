import React from "react";
import { useHistory } from "react-router";
import Footer from "./Footer.js";
import { Grid, Button, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

const MitLiscense = () => {
  const history = useHistory();
  return (
    <div class=" pt-8 ">
      <div class=" px-4 mx-auto max-w-6xl flex flex-col md:flex-row">
        <h2 class="mr-8 w-full md:w-1/3 text-6xl font-extrabold  text-blue-600 pt-32">
          Here are our heroes :
          <br />
          <p className="text-lg leading-relaxed m-4 text-xl  text-green-900">
            All the developers are undergraduate students of Indian Institute of
            Information Technology Ranchi,which is one of the Indian Institutes
            of Information Technology, a chain of higher education institutes
            started by Government of India focused on Information Technology. It
            is an "Institute of National Importance", declared by an act of
            parliament.
          </p>
          <button
            className="px-4 py-2 mr-2 my-4 text-xl font-bold bg-purple-300 text-indigo-800 hover:bg-purple-500 hover:text-white rounded"
            onClick={() => history.push("/")}
          >
            Go to Homepage
          </button>{" "}
        </h2>
        


        <dl class="w-full bg-blue-500   bg-opacity-30 px-4  md:w-2/3 text-black">
          <div class="px-4 relative">
             {/* Anurag Tiwari /////////////////////////////////////////////////////////////////////////////////////////////// */}
 <div class=" ">
              <div class="text-center mb-4  -top-4 right-1/2 transform translate-y-1/2  ">
                <a href="#" class="block relative">
                  <img
                    alt="profil"
                    src={require("./assets/img/anurag.jpg").default}
                    class="border-8 border-white  shadow-lg rounded-full max-w-full mx-auto object-cover   "
                    style={{ maxWidth: "120px" }}
                  />
                </a>
              </div>
              <div class="bg-white dark:bg-gray-800 rounded-lg shadow px-2 py-2 pt-16">
                <div class="text-center">
                  <p class="text-2xl text-gray-800 dark:text-white">
                  Anurag Tiwari
                  </p>
                  <p class="text-xl text-gray-500 dark:text-gray-200 font-light">
                  Fullstack Developer
                  </p>
                  <span className="font-fold text-lg py-2 mt-1 mb-2">Co-Founder</span>
                  <p class="text-md text-purple-800 w-2/3 dark:text-gray-400 mx-auto py-1 font-light">
                     Full stack developer, competitve coder, machine learning and deep learning ethusiast,
                     blockchain developer and android developer
                  </p>
                </div>
                <div class="flex border-t border-gray-200 w-40 mx-auto text-gray-500 items-center justify-between">
                  <button
                    onClick={() =>
                      window.open("https://www.linkedin.com/in/init-0/")
                    }
                    className="bg-blue-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1 text-xl hover:text-red-500 dark:hover:text-white transition-colors duration-200"
                    type="button"
                  >
                    <i className="fab fa-linkedin -f"></i>
                  </button>
                  <button
                    onClick={() => window.open("https://github.com/init-O")}
                    className="bg-gray-800 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1  text-xl hover:text-green-400 dark:hover:text-white transition-colors duration-200"
                    type="button"
                  >
                    <i className="fab fa-github"></i>
                  </button>

                  <button
                    onClick={() =>
                      window.open(
                        'mailto:anuragtiwari0594@gmail.com?subject=Mail About InterviewHub"'
                      )
                    }
                    className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1 text-xl hover:text-yellow-400 dark:hover:text-white transition-colors duration-200"
                    type="button"
                  >
                    <i className="fa fa-envelope"></i>
                  </button>

                </div>
              </div>
            </div>
            {/* /////////////////////////////////////////////////////////////////////////////////////////////// */}

            {/* Saheb Kumar /////////////////////////////////////////////////////////////////////////////////////////////// */}
            <div class=" ">
              <div class="text-center mb-4  -top-4 right-1/2 transform translate-y-1/2  ">
                <a href="#" class="block relative">
                  <img
                    alt="profil"
                    src={require("./assets/img/saheb.png").default}
                    class="border-8 border-white  shadow-lg rounded-full max-w-full mx-auto object-cover   "
                    style={{ maxWidth: "120px" }}
                  />
                </a>
              </div>
              <div class="bg-white dark:bg-gray-800 rounded-lg shadow px-2 py-2 pt-16">
                <div class="text-center">
                  <p class="text-2xl text-gray-800 dark:text-white">
                    Saheb Kumar
                  </p>
                  <p class="text-xl text-gray-500 dark:text-gray-200 font-light">
                  Fullstack Developer
                  </p>
                  <span className="font-fold text-lg py-2 mt-1 mb-2">Co-Founder</span>
                  <p class="text-md text-purple-800 w-2/3 dark:text-gray-400 mx-auto py-1 font-light">
                    Saheb is working in web development, Competitive Coding ,
                    problem-solving, public speaking, and is an enthusiast
                    learner. He enjoy turning complex problems into simple,
                    beautiful, and intuitive designs.
                  </p>
                </div>
                <div class="flex border-t border-gray-200 w-40 mx-auto text-gray-500 items-center justify-between">
                  <button
                    onClick={() =>
                      window.open("https://www.linkedin.com/in/sahebcse/")
                    }
                    className="bg-blue-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1 text-xl hover:text-red-500 dark:hover:text-white transition-colors duration-200"
                    type="button"
                  >
                    <i className="fab fa-linkedin -f"></i>
                  </button>
                  <button
                    onClick={() => window.open("https://github.com/sahebcse")}
                    className="bg-gray-800 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1  text-xl hover:text-green-400 dark:hover:text-white transition-colors duration-200"
                    type="button"
                  >
                    <i className="fab fa-github"></i>
                  </button>

                  <button
                    onClick={() =>
                      window.open(
                        'mailto:sahebkumar026@gmail.com?subject=Mail About InterviewHub"'
                      )
                    }
                    className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1 text-xl hover:text-yellow-400 dark:hover:text-white transition-colors duration-200"
                    type="button"
                  >
                    <i className="fa fa-envelope"></i>
                  </button>

                  <button
                    onClick={() =>
                      window.open("https://twitter.com/tatkaalEngineer")
                    }
                    className="bg-blue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1 text-xl hover:text-red-700 dark:hover:text-white transition-colors duration-200"
                    type="button"
                  >
                    <i className="fab fa-twitter"></i>
                  </button>
                </div>
              </div>
            </div>
            {/* /////////////////////////////////////////////////////////////////////////////////////////////// */}


{/* Ishan Madhav/////////////////////////////////////////////////////////////////////////////////////////////// */}
<div class=" ">
              <div class="text-center mb-4  -top-4 right-1/2 transform translate-y-1/2  ">
                <a href="#" class="block relative">
                  <img
                    alt="profil"
                    src={require("./assets/img/ishan.png").default}
                    class="border-8 border-white  shadow-lg rounded-full max-w-full mx-auto object-cover   "
                    style={{ maxWidth: "120px" }}
                  />
                </a>
              </div>
              <div class="bg-white dark:bg-gray-800 rounded-lg shadow px-2 py-2 pt-16">
                <div class="text-center">
                  <p class="text-2xl text-gray-800 dark:text-white">
                    Ishan Madhav
                  </p>
                  <p class="text-xl text-gray-500 dark:text-gray-200 font-light">
                    Fullstack Developer
                  </p>
                  <span className="font-fold text-lg py-2 mt-1 mb-2">Co-Founder</span>
                  <p class="text-md text-purple-800 w-2/3 dark:text-gray-400 mx-auto py-1 font-light">
                    {/*   paste your about section from linkedin here */}
                  </p>
                </div>
                <div class="flex border-t border-gray-200 w-40 mx-auto text-gray-500 items-center justify-between">
                  <button
                    onClick={() =>
                      window.open("https://www.linkedin.com/in/sahebcse/")
                    }
                    className="bg-blue-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1 text-xl hover:text-red-500 dark:hover:text-white transition-colors duration-200"
                    type="button"
                  >
                    <i className="fab fa-linkedin -f"></i>
                  </button>
                  <button
                    onClick={() => window.open("https://github.com/sahebcse")}
                    className="bg-gray-800 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1  text-xl hover:text-green-400 dark:hover:text-white transition-colors duration-200"
                    type="button"
                  >
                    <i className="fab fa-github"></i>
                  </button>

                  <button
                    onClick={() =>
                      window.open(
                        'mailto:sahebkumar026@gmail.com?subject=Mail About InterviewHub"'
                      )
                    }
                    className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1 text-xl hover:text-yellow-400 dark:hover:text-white transition-colors duration-200"
                    type="button"
                  >
                    <i className="fa fa-envelope"></i>
                  </button>

                  <button
                    onClick={() =>
                      window.open("https://twitter.com/tatkaalEngineer")
                    }
                    className="bg-blue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1 text-xl hover:text-red-700 dark:hover:text-white transition-colors duration-200"
                    type="button"
                  >
                    <i className="fab fa-twitter"></i>
                  </button>
                </div>
              </div>
            </div>
            {/* /////////////////////////////////////////////////////////////////////////////////////////////// */}

            {/* Shekhar Suman /////////////////////////////////////////////////////////////////////////////////////////////// */}
            <div class=" ">
              <div class="text-center mb-4  -top-4 right-1/2 transform translate-y-1/2  ">
                <a href="#" class="block relative">
                  <img
                    alt="profil"
                    src={require("./assets/img/shekhar.png").default}
                    class="border-8 border-white  shadow-lg rounded-full max-w-full mx-auto object-cover   "
                    style={{ maxWidth: "120px" }}
                  />
                </a>
              </div>
              <div class="bg-white dark:bg-gray-800 rounded-lg shadow px-2 py-2 pt-16">
                <div class="text-center">
                  <p class="text-2xl text-gray-800 dark:text-white">
                    Shekhar Suman
                  </p>
                  <p class="text-xl text-gray-500 dark:text-gray-200 font-light">
                    Web Developer
                  </p>
                  <p class="text-md text-purple-800 w-2/3 dark:text-gray-400 mx-auto py-1 font-light">
                    {/*   paste your about section from linkedin here */}
                  </p>
                </div>
                <div class="flex border-t border-gray-200 w-40 mx-auto text-gray-500 items-center justify-between">
                  <button
                    onClick={() =>
                      window.open("https://www.linkedin.com/in/sahebcse/")
                    }
                    className="bg-blue-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1 text-xl hover:text-red-500 dark:hover:text-white transition-colors duration-200"
                    type="button"
                  >
                    <i className="fab fa-linkedin -f"></i>
                  </button>
                  <button
                    onClick={() => window.open("https://github.com/sahebcse")}
                    className="bg-gray-800 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1  text-xl hover:text-green-400 dark:hover:text-white transition-colors duration-200"
                    type="button"
                  >
                    <i className="fab fa-github"></i>
                  </button>

                  <button
                    onClick={() =>
                      window.open(
                        'mailto:sahebkumar026@gmail.com?subject=Mail About InterviewHub"'
                      )
                    }
                    className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1 text-xl hover:text-yellow-400 dark:hover:text-white transition-colors duration-200"
                    type="button"
                  >
                    <i className="fa fa-envelope"></i>
                  </button>

                  <button
                    onClick={() =>
                      window.open("https://twitter.com/tatkaalEngineer")
                    }
                    className="bg-blue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1 text-xl hover:text-red-700 dark:hover:text-white transition-colors duration-200"
                    type="button"
                  >
                    <i className="fab fa-twitter"></i>
                  </button>
                </div>
              </div>
            </div>
            {/* /////////////////////////////////////////////////////////////////////////////////////////////// */}

            {/* Sushant Kumar/////////////////////////////////////////////////////////////////////////////////////////////// */}
            <div class="mb-16 ">
              <div class="text-center mb-4  -top-4 right-1/2 transform translate-y-1/2  ">
                <a href="#" class="block relative">
                  <img
                    alt="profil"
                    src={require("./assets/img/sushant.png").default}
                    class="border-8 border-white  shadow-lg rounded-full max-w-full mx-auto object-cover   "
                    style={{ maxWidth: "120px" }}
                  />
                </a>
              </div>
              <div class="bg-white dark:bg-gray-800 rounded-lg shadow px-2 py-2 pt-16">
                <div class="text-center">
                  <p class="text-2xl text-gray-800 dark:text-white">
                    Sushant Kumar
                  </p>
                  <p class="text-xl text-gray-500 dark:text-gray-200 font-light">
                    Web Developer
                  </p>
                  <p class="text-md text-purple-800 w-2/3 dark:text-gray-400 mx-auto py-1 font-light">
                    {/*   paste your about section from linkedin here */}
                  </p>
                </div>
                <div class="flex border-t border-gray-200 w-40 mx-auto text-gray-500 items-center justify-between">
                  <button
                    onClick={() =>
                      window.open("https://www.linkedin.com/in/sahebcse/")
                    }
                    className="bg-blue-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1 text-xl hover:text-red-500 dark:hover:text-white transition-colors duration-200"
                    type="button"
                  >
                    <i className="fab fa-linkedin -f"></i>
                  </button>
                  <button
                    onClick={() => window.open("https://github.com/sahebcse")}
                    className="bg-gray-800 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1  text-xl hover:text-green-400 dark:hover:text-white transition-colors duration-200"
                    type="button"
                  >
                    <i className="fab fa-github"></i>
                  </button>

                  <button
                    onClick={() =>
                      window.open(
                        'mailto:sahebkumar026@gmail.com?subject=Mail About InterviewHub"'
                      )
                    }
                    className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1 text-xl hover:text-yellow-400 dark:hover:text-white transition-colors duration-200"
                    type="button"
                  >
                    <i className="fa fa-envelope"></i>
                  </button>

                  <button
                    onClick={() =>
                      window.open("https://twitter.com/tatkaalEngineer")
                    }
                    className="bg-blue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1 text-xl hover:text-red-700 dark:hover:text-white transition-colors duration-200"
                    type="button"
                  >
                    <i className="fab fa-twitter"></i>
                  </button>
                </div>
              </div>
            </div>
            {/* /////////////////////////////////////////////////////////////////////////////////////////////// */}
          </div>
        </dl>
      </div>

      <Footer />
    </div>
  );
};

export default MitLiscense;
