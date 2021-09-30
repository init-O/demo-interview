import React from "react";
import { useHistory } from "react-router";

import { Grid, Button, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

const PageNotFound = () => {
    const history = useHistory();
    return (
        <div className="Error text-center text-lg text-bottom font-bold pt-56 pb-4 bg-cover bg-auto bg-no-repeat bg-center"
            style={{
                backgroundImage:
                    "url('https://www.argildx.com/wp-content/uploads/2017/06/Is-a-Misconfigured-“Page-Not-Found”-Jeopardizing-Your-Website.jpg')",
            }} 
        >
               
                
                    <h1 className="text-pink-600 text-4xl text-between mt-20">
                        <span className="text-red-800 text-6xl text-left">404    </span>             Page Not Found
                    </h1>
                    <h6 className="text-gray-800  text-3xl p-3">
                        Sorry but the page you are looking for is not available.
                    </h6>
                    <button
                        className="px-4 py-2 mr-2 text-xl font-bold bg-purple-300 text-indigo-800 hover:bg-purple-500 hover:text-white rounded"
                        onClick={() => history.push("/")}
                    >
                        Go to Homepage
                    </button>{" "}
                 
             
        </div>
    );
};

export default PageNotFound;
