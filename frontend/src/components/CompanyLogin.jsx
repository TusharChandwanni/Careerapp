import { useState, useEffect } from "react";
import axios from "axios"
import { Link,useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { login } from "../actions/userAction";
import { useDispatch } from "react-redux";

const CompanyLogin = () => {
  const navigate = useNavigate();
  
  const { isAuthenticated } = useSelector(
    (state) => state.user
  )
  const dispatch = useDispatch();
  const [details,setDetails] = useState({
    email : "",
    password : "",
  })

  const handelInput=(e)=>{
    setDetails(
      {
        ...details,
        [e.target.name]: e.target.value
      }
    )
  }
  const postData = (e) => {
    e.preventDefault();
    
    dispatch(login(details.email, details.password));
  };


  useEffect( ()=>{
    if(isAuthenticated){
      navigate('/')
    }
  },[dispatch,isAuthenticated]);

  return (
    <section class="text-gray-400 bg-gray-900 body-font w-full">
      <div class="container px-5 py-24 mx-auto ">
        <div class="flex flex-col text-center w-full mb-12">
          <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-yellow-500">
            Company Login
          </h1>
          <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
            @ CareerCircuit
          </p>
        </div>
        <div class="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:px-0 items-end sm:space-x-4 sm:space-y-0 space-y-4">
          <div class="relative sm:mb-0 flex-grow w-full">
            <label for="email" class="leading-7 text-sm text-gray-400">
              Email
            </label>
            <input
              onChange={handelInput}
              type="email"
              id="email"
              name="email"
              class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div class="relative sm:mb-0 flex-grow w-full">
            <label for="password" class="leading-7 text-sm text-gray-400">
              Password
            </label>
            <input
              onChange={handelInput}
              type="password"
              id="password"
              name="password"
              class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <button
            onClick={postData}
            class="text-white bg-yellow-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded text-lg"
          >
            Login
          </button>
        </div>
        <hr className="my-4"></hr>
        <Link to="/companyregister" className="text-yellow-500  font-semibold">
          Register ?
        </Link>
      </div>
    </section>
  );
};

export default CompanyLogin;
