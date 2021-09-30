import React from "react";
import { useHistory } from "react-router";
import Footer from "./Footer.js";
import { Grid, Button, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

const Disclaimer = () => {
  const history = useHistory();
  return (
    <div class=" pt-20 ">
      <div class=" px-4 mx-auto max-w-6xl flex flex-col md:flex-row">
        <h2 class="mr-8 w-full md:w-1/3 text-3xl font-extrabold leading-9">
          Disclaimer
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
            <h3 class="text-xl font-semibold">WEBSITE DISCLAIMER</h3>
          </dt>
          <dd class="mb-16">
            <p>
              The information provided by InterviewHub  (“Company”, “we”,
              “our”, “us”) on  Interviewhub.org (the “Site”) is for general
              informational purposes only. All information on the Site is
              provided in good faith, however we make no representation or
              warranty of any kind, express or implied, regarding the accuracy,
              adequacy, validity, reliability, availability, or completeness of
              any information on the Site.
            </p>
          </dd>
          <dd class="mb-16">
            <p>
              UNDER NO CIRCUMSTANCE SHALL WE HAVE ANY LIABILITY TO YOU FOR ANY
              LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF THE
              SITE OR RELIANCE ON ANY INFORMATION PROVIDED ON THE SITE. YOUR USE
              OF THE SITE AND YOUR RELIANCE ON ANY INFORMATION ON THE SITE IS
              SOLELY AT YOUR OWN RISK.{" "}
            </p>
          </dd>
          <dt class="mb-4">
            <h3 class="text-xl font-semibold">EXTERNAL LINKS DISCLAIMER</h3>
          </dt>
          <dd class="mb-16">
            <p>
              The Site may contain (or you may be sent through the Site) links
              to other websites or content belonging to or originating from
              third parties or links to websites and features. Such external
              links are not investigated, monitored, or checked for accuracy,
              adequacy, validity, reliability, availability or completeness by
              us.
            </p>
          </dd>
          <dd class="mb-16">
            <p>
              WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY
              FOR THE ACCURACY OR RELIABILITY OF ANY INFORMATION OFFERED BY
              THIRD-PARTY WEBSITES LINKED THROUGH THE SITE OR ANY WEBSITE OR
              FEATURE LINKED IN ANY BANNER OR OTHER ADVERTISING. WE WILL NOT BE
              A PARTY TO OR IN ANY WAY BE RESPONSIBLE FOR MONITORING ANY
              TRANSACTION BETWEEN YOU AND THIRD-PARTY PROVIDERS OF PRODUCTS OR
              SERVICES.
            </p>
          </dd>
          <dt class="mb-4">
            <h3 class="text-xl font-semibold">TESTIMONIALS DISCLAIMER</h3>
          </dt>
          <dd class="mb-16">
            <p>
              The Site may contain testimonials by users of our products and/or
              services. These testimonials reflect the real-life experiences and
              opinions of such users. However, the experiences are personal to
              those particular users, and may not necessarily be representative
              of all users of our products and/or services. We do not claim, and
              you should not assume that all users will have the same
              experiences.
            </p>
          </dd>

          <dt class="mb-4">
            <h3 class="text-xl font-semibold">
              YOUR INDIVIDUAL RESULTS MAY VARY.
            </h3>
          </dt>
          <dd class="mb-16">
            <p>
              The testimonials on the Site are submitted in various forms such
              as text, audio and/or video, and are reviewed by us before being
              posted. They appear on the Site verbatim as given by the users,
              except for the correction of grammar or typing errors. Some
              testimonials may have been shortened for the sake of brevity,
              where the full testimonial contained extraneous information not
              relevant to the general public.
            </p>
          </dd>
          <dd class="mb-16">
            <p>
              The views and opinions contained in the testimonials belong solely
              to the individual user and do not reflect our views and opinions.
            </p>
          </dd>
          <dt class="mb-4">
            <h3 class="text-xl font-semibold">
              ERRORS AND OMISSIONS DISCLAIMER
            </h3>
          </dt>
          <dd class="mb-16">
            <p>
              While we have made every attempt to ensure that the information
              contained in this site has been obtained from reliable sources,
              InterviewHub  is not responsible for any errors or omissions or
              for the results obtained from the use of this information. All
              information in this site is provided “as is”, with no guarantee of
              completeness, accuracy, timeliness or of the results obtained from
              the use of this information, and without warranty of any kind,
              express or implied, including, but not limited to warranties of
              performance, merchantability, and fitness for a particular
              purpose.
            </p>
          </dd>
          <dd class="mb-16">
            <p>
              While we have made every attempt to ensure that the information
              contained in this site has been obtained from reliable sources,
              InterviewHub  is not responsible for any errors or omissions or
              for the results obtained from the use of this information. All
              information in this site is provided “as is”, with no guarantee of
              completeness, accuracy, timeliness or of the results obtained from
              the use of this information, and without warranty of any kind,
              express or implied, including, but not limited to warranties of
              performance, merchantability, and fitness for a particular
              purpose.
            </p>
          </dd>
          <dt class="mb-4">
            <h3 class="text-xl font-semibold">
              LOGOS AND TRADEMARKS DISCLAIMER
            </h3>
          </dt>
          <dd class="mb-16">
            <p>
              All logos and trademarks of third parties referenced on
               Interviewhub.org are the trademarks and logos of their
              respective owners. Any inclusion of such trademarks or logos does
              not imply or constitute any approval, endorsement or sponsorship
              of InterviewHub  by such owners.
            </p>
          </dd>

          <dt class="mb-4">
            <h3 class="text-xl font-semibold">CONTACT US</h3>
          </dt>
          <dd class="mb-16">
            <p>
              Should you have any feedback, comments, requests for technical
              support or other inquiries, please contact us by email:
              sahebkumar026@gmail.com.
            </p>
          </dd>
        </dl>
      </div>

      <Footer />
    </div>
  );
};

export default Disclaimer;
