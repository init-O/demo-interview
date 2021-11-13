import React from "react";
import { Link } from "react-router-dom";

import logo from "./assets/img/interviewhubplainlogo.jpg";

export default function Footer() {
  return (
    <footer className="relative bg-gray-300 pt-8 pb-6">
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
            className="text-gray-300 fill-current"
            points="2560 0 2560 100 0 100"
          ></polygon>
        </svg>
      </div>
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap">
          <div className="w-full lg:w-6/12 px-4">
            <Link
              className="flex text-gray-800  text-lg font-bold leading-relaxed inline-block mr-4  py-1 whitespace-nowrap uppercase"
              to="/"
            >
              <img src={logo} className="w-10 h-10 mr-2" /> Interview hub
            </Link>
            <h5 className="text-lg mt-0 mb-2 text-gray-700">
              Interviewhub is a first of its kind interview platform offering
              totally free services.
            </h5>
            <div className=" ">
              <button
                // onClick={() => window.open("")  }
                className="bg-white text-red-500 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none  m-1"
                type="button"
              >
                <div
                  className=" flex   
                shadow-lg font-normal items-center justify-center align-center
                 rounded-full outline-none focus:outline-none    "
                >
                  <i className="fab fa-youtube text-2xl"></i>
                </div>
              </button>
              <button
                // onClick={() => window.open("")  }
                className="bg-white text-blue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none  m-1"
                type="button"
              >
                <div
                  className=" flex   
                shadow-lg font-normal items-center justify-center align-center
                 rounded-full outline-none focus:outline-none    "
                >
                  <i className="fab fa-linkedin text-2xl"></i>
                </div>
              </button>
              <button
                // onClick={() => window.open("")  }
                className="bg-white text-blue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none  m-1"
                type="button"
              >
                <div
                  className=" flex   
                shadow-lg font-normal items-center justify-center align-center
                 rounded-full outline-none focus:outline-none    "
                >
                  <i className="fab fa-twitter text-2xl"></i>
                </div>
              </button>
              <button
                // onClick={() => window.open("")  }
                className="bg-white text-pink-900 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none  m-1"
                type="button"
              >
                <div
                  className=" flex   
                shadow-lg font-normal items-center justify-center align-center
                 rounded-full outline-none focus:outline-none    "
                >
                  <i className="fab fa-instagram text-3xl"></i>
                </div>
              </button>
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4  ">
            <div className="flex flex-wrap items-top mb-6">
              <div className="w-full lg:w-4/12 px-4 ml-auto">
                <span className="block uppercase text-black text-bold font-bold underline mb-2">
                  Useful Links
                </span>
                <ul className="list-unstyled flex flex-wrap ">
                  <li>
                    <Link
                      className="text-gray-700 hover:text-gray-900 font-semibold block px-2 py-1 text-sm"
                      to="/our-team"
                    >
                      Our Team
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-gray-700 hover:text-gray-900 font-semibold block px-2 py-1 text-sm"
                      to="/contact"
                    >
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <span className="block uppercase text-black text-bold font-bold underline mb-2">
                  Other Resources
                </span>
                <ul className="list-unstyled flex flex-wrap">
                  <li>
                    <Link
                      className="text-gray-700 hover:text-gray-900 font-semibold block px-2 py-1 text-sm"
                      to="/disclaimer"
                    >
                      Disclaimer
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-gray-700 hover:text-gray-900 font-semibold block px-2 py-1 text-sm"
                      to="/mit-license"
                    >
                      MIT License
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-gray-700 hover:text-gray-900 font-semibold block px-2 py-1 text-sm"
                      to="/tnc"
                    >
                      Terms & Conditions
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-gray-700 hover:text-gray-900 font-semibold block px-2 py-1  text-sm"
                      to="/privacy-policy"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="  border-gray-400" />
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-8/12 px-4 mx-auto text-center">
            <div className="text-sm text-gray-600 font-semibold pt-1">
              Copyright © {new Date().getFullYear()} Made with{" "}
              <i class="fa fa-heart text-red-600" aria-hidden="true"></i> by{" "}
              <Link
                to="/our-team"
                className="text-gray-600 hover:text-purple-600 hover:text-4xl hover:font-bold"
              >
                Team-InterviewHub
              </Link>
              .
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
