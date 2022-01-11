import React, { useEffect, useState } from "react";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { authentication } from "../../firebase_config";
import { useHistory, useNavigate } from "react-router-dom";

import {CloseRounded} from "@material-ui/icons";

import {config} from '../../data/Config'
const URL = config.url;

const SignupForm = ({ isLogin, setIsLogin, isModal, setOpen }) => {
  const history=useHistory()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  //APi and routing login
  const loginInternAPI = (sendData) =>
    axios.post(`${URL}/intern/signIn`, sendData);

  const loginIntern = async (sendData) => {
    try {
      const response = await loginInternAPI(sendData);
      if (response.status !== 200) throw Error(response.data.message);
      const data = response.data;
      window.localStorage.setItem("profile", JSON.stringify(data));
      if (isModal) setOpen(false);
      history.push("/dashboard");
    } catch (error) {
      setOpen(true);
      NotificationManager.error("Register With Us", "Sign In Failed", 3000);
      history.push("/");
      console.log(error);
    }
  };

  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    setOpen(false);
    signInWithPopup(authentication, provider)
      .then((re) => {
        console.log(re);

        loginIntern(re);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCustomLogin = async (e) => {
    e.preventDefault();

    try {
      if (!email || !password) throw Error("Missing required fields");
      const userCred = await signInWithEmailAndPassword(
        authentication,
        email,
        password
      );
      if (userCred.user.emailVerified) {
        loginIntern({ user: authentication.currentUser })
        if (isModal) setOpen(false);
      } else {
        throw Error("Verify Your Email");
      }
    } catch (error) {
      console.log(`${error.message}`.replace("Firebase: ", ""));
      setError(`${error.message}`.replace("Firebase: ", ""));
    }
  };

  const handleCloseError = (e) => {
    e.preventDefault();
    setError("");
  };

  const handleCloseModal = (e) => {
    e.preventDefault();
    setOpen(false);
  };

  return (
    <div class="w-full sm:w-2/3 md:w-2/3 lg:w-1/3 mx-auto">
      <div class="bg-white shadow-md border border-gray-200 rounded-lg  w-full p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form class="space-y-6" action="#">
          {isModal ? (
            <div className="flex justify-between">
              <h3 class="text-xl font-medium text-gray-900 dark:text-white">
                Login
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-black hover:bg-red-800 rounded-full"
              >
                <CloseRounded />
              </button>
            </div>
          ) : (
            <h3 class="text-xl font-medium text-gray-900 dark:text-white">
              Login
            </h3>
          )}

          {error && (
            <div>
              <div class="w-fill bg-red-300 flex p-3 pl-3 bg-gray-100  rounded-lg">
                <button
                  onClick={handleCloseError}
                  className="text-black hover:bg-red-400 rounded"
                >
                  <CloseRounded />
                </button>
                <span
                  class="ml-2 truncate"
                  title="Test with a very really long name (resize the browser to see it truncate)"
                >
                  {error}
                </span>
              </div>
            </div>
          )}

          <div class="flex flex-wrap  w-full  relative h-15 bg-gray-50 border border-gray-300 items-center rounded mb-4">
            <div class="flex -mr-px justify-center w-15 p-4">
              <span class="flex items-center leading-normal bg-gray-50 px-3 border-0 rounded rounded-r-none text-2xl text-gray-600">
                <i class="fas fa-envelope"></i>
              </span>
            </div>
            <input
              type="email"
              class="flex-shrink text-black flex-grow flex-auto leading-normal w-px flex-1 bg-gray-50 border-0 h-10 border-grey-light rounded rounded-l-none px-3 self-center relative  font-roboto text-xl outline-none"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div class="flex flex-wrap  w-full  relative h-15 bg-gray-50 border border-gray-300 items-center rounded mb-4">
            <div class="flex -mr-px justify-center w-15 p-4">
              <span class="flex items-center leading-normal bg-gray-50 px-3 border-0 rounded rounded-r-none text-2xl text-gray-600">
                <i class="fas fa-lock"></i>
              </span>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              class="flex-shrink text-black flex-grow flex-auto leading-normal w-px flex-1 bg-gray-50 border-0 h-10 border-grey-light rounded rounded-l-none px-3 self-center relative  font-roboto text-xl outline-none"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div class="flex -mr-px1">
              <span
                onClick={() => setShowPassword(!showPassword)}
                class="flex items-center leading-normal bg-gray-50 rounded rounded-l-none border-0 px-3 whitespace-no-wrap text-gray-600"
              >
                <i
                  class={`fas  ${showPassword ? "fa-eye" : "fa-eye-slash"}`}
                ></i>
              </span>
            </div>
          </div>

          <div class="flex items-start">
            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input
                  id="remember"
                  aria-describedby="remember"
                  type="checkbox"
                  class="bg-gray-50 border border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                  required=""
                />
              </div>
              <div class="text-sm ml-3">
                <label
                  for="remember"
                  class="font-medium text-gray-900 dark:text-gray-300"
                >
                  Remember me
                </label>
              </div>
            </div>
            <span
              className="text-sm text-blue-700 hover:underline cursor-pointer ml-auto dark:text-blue-500"
              onClick={() => setIsLogin(3)}
            >
              Lost Password?
            </span>
          </div>
          <button
            type="submit"
            onClick={handleCustomLogin}
            class="w-full text-white text-lg bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login to your account
          </button>
          <div>
            <button
              onClick={handleGoogleSignIn}
              class="w-full text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              
              <span className="p-5 text-white text-lg">
                Sign in with Google{" "}
              </span>
            </button>
          </div>
          <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered?{" "}
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsLogin(2);
              }}
              class="text-blue-700 hover:underline dark:text-blue-500"
            >
              Create account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
