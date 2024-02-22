import axios from "axios";
import { useEffect, useState } from "react";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ProfileUpdateCompany = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((store) => store.user);
  const [details, setDetails] = useState({
    industry: "",
    address: "",
    website: "",
    description: ""
  });

  const notify = () => {
    toast("Profile Updated Sucessfully");
    
  }

  const handelInput = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    if (!isAuthenticated || (isAuthenticated && !user.isCompany)) {
      navigate("/company/login");
    }else{
        axios.post("http://localhost:4000/company/getprofile",{userID  : user._id})
        .then( (res)=> {
            // console.log(res.data);
            setDetails(res.data);
        })
    }
  }, [isAuthenticated]);

  const updateHandler = ()=>{
    axios.post("http://localhost:4000/company/updateprofile" , {
        userID : user._id,
        industry: details.industry,
        address: details.address,
        website: details.website,
        description: details.description,
    }).then( (res)=>{
        // console.log(res);
        notify();
        setTimeout(()=>{
          navigate('/profile')
        },2000)
        
    }).catch((err)=>{
        console.log(err);
    })
  }
  return (
    <>
      <section class="text-gray-400 bg-gray-900 body-font">
        <div class="container px-5 py-4 mx-auto flex flex-col">
          <div class="lg:w-4/6 mx-auto">
            <div class="flex flex-col sm:flex-row mt-10">
              <div class="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                <div class="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-800 text-gray-600">
                  <circle cx="12" cy="7" r="4">
                    <img src={user.avatar.url} className="" />
                  </circle>
                </div>
                <div class="flex flex-col items-center text-center justify-center">
                  <h2 class="font-medium title-font mt-4 text-white text-lg">
                    {user.name}
                  </h2>
                  <div class="w-12 h-1 bg-pink-500 rounded mt-2 mb-4"></div>
                  <p class="text-base text-gray-400">
                    {user.isCompany ? " Company " : " User "}
                  </p>
                </div>
              </div>
              <div class="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-800 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                <div class="relative sm:mb-0 flex-grow w-full">
                  <label for="name" class="leading-7 text-sm text-gray-400">
                    Name
                  </label>
                  <input
                    value={user.name}
                    type="text"
                    name="name"
                    class="w-full text-gray-500 bg-gray-800 bg-opacity-40 rounded border border-gray-700  text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                  <label for="email" class="leading-7 text-sm text-gray-400">
                    Email
                  </label>
                  <input
                    value={user.email}
                    type="email"
                    name="email"
                    class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700  text-base outline-none text-gray-500 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                  <label for="Phoneno" class="leading-7 text-sm text-gray-400">
                    Phone no:
                  </label>
                  <input
                    value={user.phoneno}
                    type="text"
                    name="Phoneno"
                    class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700  text-base outline-none text-gray-500 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                  <label for="industry" class="leading-7 text-sm text-gray-400">
                    Industry
                  </label>
                  <input
                    onChange={handelInput}
                    defaultValue={details.industry}
                    type="text"
                    name="industry"
                    class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                  <label for="address" class="leading-7 text-sm text-gray-400">
                    Address
                  </label>
                  <input
                    onChange={handelInput}
                    defaultValue={details.address}
                    type="text"
                    name="address"
                    class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                  <label for="website" class="leading-7 text-sm text-gray-400">
                    Website
                  </label>
                  <input
                    onChange={handelInput}
                    type="text"
                    name="website"
                    defaultValue={details.website}
                    class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                  <label
                    for="description"
                    class="leading-7 text-sm text-gray-400"
                  >
                    Description
                  </label>
                  <input
                    onChange={handelInput}
                    type="text"
                    defaultValue={details.description}
                    name="description"
                    class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <div className="flex flex-row gap-2 my-4">
                
                <button onClick={updateHandler}
                 class="inline-flex text-white bg-pink-500 border-0 py-1 px-4 focus:outline-none hover:bg-pink-600 rounded" >Update</button>
                
                <Link to = "/profile">
                    <button class="inline-flex text-black bg-white border-0 py-1 px-4 focus:outline-none hover:bg-gray-400 rounded" >Cancel</button>
                </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer autoClose={2000} theme="dark"/>
    </>
  );
};

export default ProfileUpdateCompany;
