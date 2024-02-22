import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userAction";

import { useNavigate} from 'react-router-dom';
import sample from "../common/img/sample.png";
import profile from "../common/img/profile.png";



const Signin = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const {  isAuthenticated } = useSelector(
        (state) => state.user
      );
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        phoneno:"",
        isCompany : false,
      });
      const [avatar, setAvatar] = useState();
      const [avatarPreview, setAvatarPreview] = useState(profile);
      const { name, email, password,phoneno } = user;


      const registerSubmit = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("phoneno", phoneno);
        myForm.set("avatar", avatar);
        myForm.set("isCompany", user.isCompany);
        dispatch(register(myForm));
      };
      
      const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
          const reader = new FileReader();
    
          reader.onload = () => {
            if (reader.readyState === 2) {
              setAvatarPreview(reader.result);
              setAvatar(reader.result);
            }
          };
    
          reader.readAsDataURL(e.target.files[0]);
        } else {
          setUser({ ...user, [e.target.name]: e.target.value });
        }
      };    
    
      useEffect(() => {
        if (isAuthenticated) {
          navigate("/feed");
        }
      
      }, [dispatch,isAuthenticated]);

      

      return (
        <section class ="text-gray-400 bg-gray-900 body-font  w-full">
          
          <div class="container px-5 py-8 mx-auto flex flex-wrap items-center">
            <div class="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
              <h1 class="title-font font-medium text-3xl text-white">
                Career Circuit
              </h1>
              <p class="leading-relaxed mt-4 text-lg">
                Make the circuit of your career connected.!
              </p>
            </div>
            <div class="lg:w-2/6 md:w-1/2 bg-gray-800 bg-opacity-50 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
              <h2 class="text-white text-lg font-medium title-font mb-5">
                Sign Up - Users
              </h2>
              <form  encType="multipart/form-data" onSubmit={registerSubmit} >
              <div class="relative mb-4">
                <input
                  type="text"
                  id="name"
                  placeholder="Full Name"
                  name="name"
                  class="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-purple-900 rounded border border-gray-600 focus:border-purple-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  value={name}
                  onChange={registerDataChange}
                />
              </div>
              <div class="relative mb-4">
                <input
                  type="email"
                  placeholder="Email"
                  id="email"
                  name="email"
                  class="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-purple-900 rounded border border-gray-600 focus:border-purple-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  value={email}
                  onChange={registerDataChange}
                />
              </div>
              <div class="relative mb-4">
               
                <input
                  type="number"
                  id="phoneno"
                  placeholder="Phone Number"
                  name="phoneno"
                  value={phoneno}
                  onChange={registerDataChange}
                  class="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-purple-900 rounded border border-gray-600 focus:border-purple-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div class="relative mb-4">
               
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  name="password"
                  class="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-purple-900 rounded border border-gray-600 focus:border-purple-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  value={password}
                  onChange={registerDataChange}
                />
              </div>
              <div class="relative mb-4" id="registerImage">
                      <img className="w-2/6" src={avatarPreview} alt="Avatar Preview" />
                      <input
                      
                        type="file"
                        name="avatar"
                        accept="image/*"
                        onChange={registerDataChange}
                      />
                </div>
                <button class="text-white bg-purple-500 border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 rounded text-lg">Register</button>
              </form>
            </div>
          </div>
        </section>
      );

      

};

export default Signin;