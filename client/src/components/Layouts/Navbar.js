import React from "react";

import { Grid, Button, Typography } from "@material-ui/core";
import CreateRoomIcon from "@material-ui/icons/RoomOutlined";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";

const Navbar = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("profile"));

  const handleLogin = () => {
    history.push("/signIn");
  };

  const handleLogout = () => {
    dispatch({type:"LOGOUT"});
    history.push("/");
  };

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
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <a
            className={
              (props.transparent ? "text-white" : "text-gray-800") +
              " text-lg font-bold leading-relaxed inline-block mr-4  py-1 whitespace-nowrap uppercase"
            }
            href="/"
          >
            Demo-Interview
          </a>
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
              <Grid item xs={12} md={4}>
                {user ? (
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
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
