import React, { useEffect, useState } from "react";
import SignupForm from "../Forms/SignupForm";
import LoginForm from "../Forms/LoginForm";
import ForgotPassword from "../Forms/ForgotPassword";
// import * as api from '../../api'

// import {addPersonalInfo, addSkills, loginIntern} from '../../action/intern'
//import { faAddressCard, faAddressBook, faVoicemail, faEnvelope, faCalendar, faCalendarAlt, faCalen } from '@fortawesome/free-solid-svg-icons'

export default function AuthForm({ isModal, setOpen }) {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [isLogin, setIsLogin] = useState(1);

  ///clutter from previous design might delete if not required
  // const [formStep, setFormStep] = useState(1);
  // const [skills, setSkills] = useState(skillsList);
  // const [roles, setRoles] = useState(rolesList);
  // const [fullName, setFullName] = useState("");
  // const [email, setEmail] = useState("");
  // const [dateOfBirth, setDateOfBirth] = useState("");
  // const [mobileNumber, setMobileNumber] = useState("");
  // const [yearOfPassing, setYearOfPassing] = useState("");
  // const [about, setAbout] = useState("");
  // const [resume, setResume] = useState("");
  // const [linkedIn, setLinkedIn] = useState("");
  // const [college, setCollege] = useState("");

  //  const addPersonalInfoAPI = (sendData) => axios.post(`http://localhost:5000/intern/personalInfo`, sendData)

  //  const addskillsAPI = (sendData) => axios.post(`http://localhost:5000/intern/addskills`, sendData)

  // const handleFacebookSignIn=()=>
  // {
  //   const provider=new FacebookAuthProvider()
  //   signInWithPopup(authentication, provider)
  //   .then((re)=>
  //   {
  //     console.log(re)
  //   })
  //   .catch((err)=>{
  //     console.log(err)
  //   })
  // }
  // const handleGithubSignIn=()=>
  // {
  //   const provider=new GithubAuthProvider()
  //   signInWithPopup(authentication, provider)
  //   .then((re)=>
  //   {
  //     console.log(re)
  //   })
  //   .catch((err)=>{
  //     console.log(err)
  //   })
  // }

  return (
    <div className="px-4 mt-10 flex w-full justify-center">
      {!user && (
        <>
          {isLogin == 1 ? (
            <LoginForm
              isLogin={isLogin}
              setIsLogin={setIsLogin}
              isModal={isModal}
              setOpen={setOpen}
            />
          ) : isLogin == 2 ? (
            <SignupForm
              isLogin={isLogin}
              setIsLogin={setIsLogin}
              isModal={isModal}
              setOpen={setOpen}
            />
          ) : (
            <ForgotPassword
              isLogin={isLogin}
              setIsLogin={setIsLogin}
              isModal={isModal}
              setOpen={setOpen}
            />
          )}
        </>
      )}
    </div>
  );
}
