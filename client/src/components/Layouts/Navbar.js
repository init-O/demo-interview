import React, { useEffect, useState } from "react";

import { Grid, Button, Typography } from "@material-ui/core";
import CreateRoomIcon from "@material-ui/icons/RoomOutlined";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import {NotificationManager} from 'react-notifications'

import logo from "../Home/assets/img/interviewhubplainlogo.jpg"

const Navbar = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('profile'))
  
  const handleLogin = () => {
    history.push("/signIn");
  };

  const handleLogout = () => {
    dispatch({type:"LOGOUT"});
    NotificationManager.error("logging Out")
    history.push('/');
    history.go(0);
  };

  const hanldeOpenAllStreams = ()=>{
    history.push("/stream");
  }

  const [navbarOpen, setNavbarOpen] = React.useState(false);

  return (
    <nav
      className={
        (props.transparent
          ? "top-0 absolute z-50 w-full"
          : "relative shadow-lg bg-white shadow-lg") +
        " flex flex-wrap items-center justify-between px-2 py-1 "
      }
    >
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
      

        <div className="w-full relative flex justify-between lg:w-auto lg:static   lg:justify-start">
          
           
          <img src={logo} className="w-10 h-10 mr-2"/>

           

          <Link
            className={
              (props.transparent ? "text-white" : "text-gray-800") +
              " text-lg font-bold leading-relaxed inline-block mr-4  py-1 whitespace-nowrap uppercase"
            }
            to="/"
          >
            Interview hub
          </Link>
          <button
            className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
            type="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <i
              className={
                (props.transparent ? "text-white" : "text-gray-800") +
                " fas fa-bars"
              }
            ></i>
          </button>
        </div>
        <div
          className={
            "lg:flex flex-grow items-center bg-white lg:bg-transparent lg:shadow-none" +
            (navbarOpen ? " block rounded shadow-lg" : " hidden")
          }
          id="example-navbar-warning"
        >
          <ul className="flex flex-col lg:flex-row list-none lg:ml-auto mr-8 text-lg">
            <li className="flex items-center">
            <button className="px-2 py-1 mr-2 bg-blue-300 text-indigo-800 hover:bg-blue-500 hover:text-white rounded" onClick={()=>window.open('https://www.buymeacoffee.com/interviewhub')}>Donate</button>
            <button className="px-2 py-1 mr-2 bg-blue-300 text-indigo-800 hover:bg-blue-500 hover:text-white rounded" onClick={()=>history.push('/uploadedVideos')}>Content</button>
              {
                user?(<button className="px-2 py-1 mr-2 bg-green-300 text-indigo-800 hover:bg-green-500 hover:text-white rounded" onClick={()=>history.push('/user/dashboard')}>Dashboard</button>):<span></span>
              }
              {user && <button className="px-2 py-1 mr-2 bg-yellow-300 text-indigo-800 hover:bg-yellow-500 hover:text-white rounded" onClick={hanldeOpenAllStreams}>Streams</button>}
              <Grid item xs={12} md={4}>
                {user ? (<span>
                  
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                  </span>
                  
                ) : (
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleLogin}
                  >
                    Login
                  </Button>
                )}
              </Grid>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    //  <Grid container align="center">
    //      <Grid>
    //           <Typography variant="h6">Demo-Interview</Typography>
    //      </Grid>

    //  </Grid>
  );
};

export default Navbar;
