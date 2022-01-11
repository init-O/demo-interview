import React, { useEffect, useState } from "react";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
  sendEmailVerification,
} from "firebase/auth";
import { authentication } from "../../firebase_config";
import { useHistory } from "react-router-dom";

import {CloseRounded} from '@material-ui/icons'
import {config} from '../../data/Config'
const URL = config.url;

const SignupForm = ({ isLogin, setIsLogin, isModal, setOpen }) => {
  const history= useHistory()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setfullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  //APi and routing login
  const loginInternAPI = (sendData) =>
    axios.post(`${URL}/intern/login`, sendData);

  const CustomloginInternAPI = (sendData) =>
    axios.post(`${URL}/intern/customlogin`, sendData);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const loginIntern = async (sendData) => {
    try {
      const response = await loginInternAPI(sendData);

      if (response.status !== 200) throw new Error(response.data.message);
      const data = response.data;
      window.localStorage.setItem("profile", JSON.stringify(data));
      if (isModal) setOpen(false);
      history.push("/dashboard");
    } catch (error) {
      NotificationManager.error("user already exists", "Sign Up Failed", 2000);
      console.log(error);
    }
  };
  const CustomloginIntern = async (sendData) => {
    try {
      const response = await CustomloginInternAPI(sendData);

      if (response.status !== 200) throw new Error(response.data.message);
      const data = response.data;
      setIsLogin(true);
    } catch (error) {
      NotificationManager.error("user already exists", "Sign Up Failed", 2000);
      console.log(error);
    }
  };

  const handleGoogleLoginIn = () => {
    const provider = new GoogleAuthProvider();
    setOpen(false);
    signInWithPopup(authentication, provider)
      .then((re) => {
        const sendData = { user: re.user };
        loginIntern(re);
      })
      .catch((err) => {
        setOpen(true);
        console.log(err);
      });
  };

  const customLoginHandler = async (e) => {
    e.preventDefault();

    try {
      if (!email || !password || !fullName || !confirmPassword)
        throw Error("Missing required fields");

      if (password != confirmPassword) throw Error("Password Mismatch");

      if (!validateEmail(email)) throw Error("Invalid Email Format");

      const userCred = await createUserWithEmailAndPassword(
        authentication,
        email,
        password
      );
      sendEmailVerification(authentication.currentUser)
        .then(() => {
          updateProfile(authentication.currentUser, {
            displayName: fullName,
            photoURL:
              "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          })
            .then(() => {
              CustomloginIntern({ user: authentication.currentUser })
                .then(() => {
                  signOut(authentication);
                  setIsLogin(true);
                })
                .catch((err) => {
                  setError(err.message);
                });
            })
            .catch((err) => {
              setError(err.message);
            });
        })
        .catch((error) => {
          console.log("Email verification error", error);
        });
    } catch (error) {
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
    <div
      class="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mx-auto overflow-y-auto"
    >
      <div class="bg-white shadow-md border border-gray-200 rounded-lg  w-full p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form class="space-y-6" action="#">
          {isModal ? (
            <div className="flex justify-between">
              <h3 class="text-xl font-medium text-gray-900 dark:text-white">
                Sign up to our platform
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
              Sign up to our platform
            </h3>
          )}

          {error && (
            <div>
              <a
                href="#"
                class="w-fill bg-red-300 flex p-3 pl-3 bg-gray-100  rounded-lg"
              >
                <button
                  onClick={handleCloseError}
                  className="text-black hover:bg-red-800 rounded-full"
                >
                  <CloseRounded />
                </button>
                <span
                  class="ml-2 truncate"
                  title="Test with a very really long name (resize the browser to see it truncate)"
                >
                  {error}
                </span>
              </a>
            </div>
          )}

          <div class="flex flex-wrap  w-full  relative h-15 bg-gray-50 border border-gray-300 items-center rounded mb-4">
            <div class="flex -mr-px justify-center w-15 p-4">
              <span class="flex items-center leading-normal bg-gray-50 px-3 border-0 rounded rounded-r-none text-2xl text-gray-600">
                <i class="fas fa-user-circle"></i>
              </span>
            </div>
            <input
              type="text"
              class="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 bg-gray-50 border-0 h-10 border-grey-light rounded rounded-l-none px-3 self-center relative  font-roboto text-xl outline-none"
              placeholder="Username"
              onChange={(e) => setfullName(e.target.value)}
            />
          </div>

          <div class="flex flex-wrap  w-full  relative h-15 bg-gray-50 border border-gray-300 items-center rounded mb-4">
            <div class="flex -mr-px justify-center w-15 p-4">
              <span class="flex items-center leading-normal bg-gray-50 px-3 border-0 rounded rounded-r-none text-2xl text-gray-600">
                <i class="fas fa-envelope"></i>
              </span>
            </div>
            <input
              type="text"
              class="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 bg-gray-50 border-0 h-10 border-grey-light rounded rounded-l-none px-3 self-center relative  font-roboto text-xl outline-none"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div class="flex flex-wrap  w-full  relative h-15 bg-gray-50 border border-gray-300 items-center rounded mb-4">
            <div class="flex -mr-px justify-center w-15 p-4">
              <span class="flex items-center leading-normal bg-gray-50 px-3 border-0 rounded rounded-r-none text-2xl text-gray-600">
                <i class="fas fa-key"></i>
              </span>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              class="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 bg-gray-50 border-0 h-10 border-grey-light rounded rounded-l-none px-3 self-center relative  font-roboto text-xl outline-none"
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

          <div class="flex flex-wrap  w-full  relative h-15 bg-gray-50 border border-gray-300 items-center rounded mb-4">
            <div class="flex -mr-px justify-center w-15 p-4">
              <span class="flex items-center leading-normal bg-gray-50 px-3 border-0 rounded rounded-r-none text-2xl text-gray-600">
                <i class="fas fa-lock"></i>
              </span>
            </div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              class="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 bg-gray-50 border-0 h-10 border-grey-light rounded rounded-l-none px-3 self-center relative  font-roboto text-xl outline-none"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div class="flex -mr-px1">
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                class="flex items-center leading-normal bg-gray-50 rounded rounded-l-none border-0 px-3 whitespace-no-wrap text-gray-600"
              >
                <i
                  class={`fas  ${
                    showConfirmPassword ? "fa-eye" : "fa-eye-slash"
                  }`}
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
          </div>
          <button
            type="submit"
            onClick={customLoginHandler}
            class="w-full text-white text-lg bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Sign up
          </button>
          <div>
            <button
              onClick={handleGoogleLoginIn}
              class="w-full text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              
              <span className="p-5 text-white text-lg">
                Sign up with Google{" "}
              </span>
            </button>
          </div>
          <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
            Already registered?{" "}
            <button
              onClick={() => setIsLogin(1)}
              class="text-blue-700 hover:underline dark:text-blue-500"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
