import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userAction";
import { Link,useNavigate } from "react-router-dom";



const Login = () => {
  const dispatch = useDispatch();
let navigate=useNavigate();
  const {  isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const loginSubmit = (e) => {
    e.preventDefault();
    
    dispatch(login(loginEmail, loginPassword));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/feed");
    }
  
  }, [dispatch,isAuthenticated]);


  return (
    <section class="text-gray-400 bg-gray-900 body-font  w-full">
      <div class="container px-5 py-24 mx-auto flex flex-wrap items-center">
        <div class="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
          <h1 class="title-font font-medium text-3xl text-white">
            Career Circuit
          </h1>
          <p class="leading-relaxed mt-4 text-lg">
            Make the circuit of your career connected !
          </p>
        </div>
        <div class="lg:w-2/6 md:w-1/2 bg-gray-800 bg-opacity-50 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
          <h2 class="text-white text-lg font-medium title-font mb-5">
            Login
          </h2>
          <form  onSubmit={loginSubmit}>
          <div class="relative mb-4">
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              class="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-purple-900 rounded border border-gray-600 focus:border-purple-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div class="relative mb-4">
            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              name="email"
              class="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-purple-900 rounded border border-gray-600 focus:border-purple-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <Link to="/password/forgot">Forget Password ?</Link>
          <button class="text-white bg-purple-500 border-0 py-2 mx-2 px-5 focus:outline-none hover:bg-purple-600 rounded text-lg">
           Login
          </button>

          </form>
         
        </div>
      </div>
    </section>
  );
};

export default Login;
