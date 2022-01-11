import React, { useEffect, useState } from "react";
import SignupForm from "../Forms/SignupForm";
import LoginForm from "../Forms/LoginForm";
import ForgotPassword from "../Forms/ForgotPassword";

export default function AuthForm({ isModal, setOpen }) {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [isLogin, setIsLogin] = useState(1);


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
