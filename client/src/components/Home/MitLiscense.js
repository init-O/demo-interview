import React from "react";
import { useHistory } from "react-router";
import Footer from "./Footer.js";
import { Grid, Button, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

const MitLiscense = () => {
  const history = useHistory();
  return (

    <div class=" pt-20 ">
      <div class=" px-4 mx-auto max-w-6xl flex flex-col md:flex-row">
        <h2 class="mr-8 w-full md:w-1/3 text-3xl font-extrabold leading-9">
          MIT License
          <br />
          <button
            className="px-4 py-2 mr-2 my-4 text-xl font-bold bg-purple-300 text-indigo-800 hover:bg-purple-500 hover:text-white rounded"
            onClick={() => history.push("/")}
          >
            Go to Homepage
          </button>{" "}
        </h2>

        <dl class="w-full bg-blue-500   bg-opacity-30 p-4  md:w-2/3 text-black">
          <dt class="mb-4">
            <h3 class="text-xl font-semibold">
              Copyright (c) 2021 InterviewHub
            </h3>
          </dt>
          <dd class="mb-4">
            <p>
              Permission is hereby granted, free of charge, to any person obtaining a copy
              of this software and associated documentation files (the "Software"), to deal
              in the Software without restriction, including without limitation the rights
              to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
              copies of the Software, and to permit persons to whom the Software is
              furnished to do so, subject to the following conditions:
            </p>
          </dd>
          <dt class="mb-4">
            <h3 class="text-xl font-semibold">
              The above copyright notice and this permission notice shall be included in all
              copies or substantial portions of the Software.
            </h3>
          </dt>
          <dd class="mb-16">
            <p>
              THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
              IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
              FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
              AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
              LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
              OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
              SOFTWARE.
            </p>
          </dd>

        </dl>
      </div>

      <Footer />
    </div>

  );
};

export default MitLiscense;
