import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
const ProfileCompany = () => {
  const navigater = useNavigate();
  const [company, setCompany] = useState(null);
  const [count,setCount] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const { state } = useLocation();
  const userID = state.id;
  const { isAuthenticated, user } = useSelector((store) => store.user);

  const notify = (msg) => {
    toast(msg);
  };

  const followHandler = () => {
    if (isAuthenticated) {
      if (isFollowing) {
        //unfollow
        axios
        .post("http://localhost:4000/company/unfollow", {
            follower: user._id,
            following: company._id,
          })
          .then((res) => {
            notify("Unfollowed");
            setCount(count-1);
            setIsFollowing(!isFollowing);
          });
      } else {
        //follow
        
        axios
          .post("http://localhost:4000/company/follow", {
            follower: user._id,
            following: company._id,
          })
          .then((res) => {
            notify("Following");
            setCount(count+1);
            setIsFollowing(!isFollowing);
          });
      }
    } else {
      navigater("/login");
    }
  };

  useEffect(() => {
    axios
      .post("http://localhost:4000/company/details", { id: userID })
      .then((res) => {
        setCompany(res.data);
          // console.log(res.data.followers);
          setCount(res.data.followers.length);
          const result = res.data.followers.find(  (id) => {
            return id === user._id;
          });
          if (result) {
            // console.log('found')
            setIsFollowing(true);
          }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      {company ? (
        <section class="text-gray-400 bg-gray-900 body-font">
          <div class="container px-5 py-6 mx-auto flex flex-col">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-yellow-500">
              Company Profile
            </h1>
            <div class="lg:w-4/6 mx-auto">
              <div class="flex flex-col sm:flex-row mt-10">
                <div class="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                  <div class="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-800 text-gray-600">
                    <circle cx="12" cy="7" r="4">
                      <img src={company.avatar.url} className="" />
                    </circle>
                  </div>
                  <div class="flex flex-col items-center text-center justify-center">
                    <h2 class="font-medium title-font mt-4 text-white text-lg">
                      {company.name}
                    </h2>
                    <div class="w-12 h-1 bg-pink-500 rounded mt-2 mb-4"></div>
                    <button
                      onClick={followHandler}
                      class="inline-flex text-white bg-purple-500 border-0 py-1 px-4 focus:outline-none hover:bg-purple-600 rounded"
                    >
                      {isFollowing ? "Following" : "Follow"}
                    </button>
                  </div>
                  <p className="mt-1">Followers : {count}</p>
                </div>
                <div class="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-800 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                  <p class="leading-relaxed text-lg mb-4">
                    <span className="font-semibold text-white">Email :</span>{" "}
                    {company.email}
                  </p>
                  <p class="leading-relaxed text-lg mb-4">
                    <span className="font-semibold text-white">Indutry :</span>{" "}
                    {company.companyProfile.industry}
                  </p>
                  <p class="leading-relaxed text-lg mb-4">
                    <span className="font-semibold text-white">Address :</span>{" "}
                    {company.companyProfile.address}
                  </p>
                  <p class="leading-relaxed text-lg mb-4">
                    <span className="font-semibold text-white"> Website </span>:{" "}
                    {company.companyProfile.website}
                  </p>
                  <p class="leading-relaxed text-lg mb-4">
                    <span className="font-semibold text-white">About : </span>
                    {company.companyProfile.description}
                  </p>
                </div>
              </div>
            </div>
            <p class="sm:text-3xl text-2xl font-medium title-font mb-4 text-yellow-500">
              Products :
            </p>
            {company.products.map((item) => {
              return (
                <>
                  <div className="flex flex-row gap-5 border-solid border-2 border-purple-500 p-2 m-2 rounded-lg" key={item._id}>
                    <img src={item.image.url} className="w-8"/>
                    <p>{item.name}</p>
                    <p>{item.description}</p>
                    <p>{item.price}</p>
                  </div>
                </>
                  )
            })}
            <p class="sm:text-3xl text-2xl font-medium title-font mb-4 text-yellow-500">
              Jobs :
            </p>
            {company.jobs.map((item) => {
              return (
                <>
                  <div className="flex flex-row gap-5 border-solid border-2 border-purple-500 p-2 m-2 rounded-lg" key={item._id}>
                    <p>{item.profileName}</p>
                    <p>{item.description}</p>
                    <p>{item.salary}</p>
                    <p>{item.location}</p>
                  </div>
                </>
                  )
            })}
          </div>
        </section>
      ) : (
        <p class="text-gray-400 body-font bg-gray-900">
          Fetching data...please hang on..!
        </p>
      )}

      <ToastContainer autoClose={2000} theme="dark" />
    </>
  );
};

export default ProfileCompany;
