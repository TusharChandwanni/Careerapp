import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userAction";
import { Link } from "react-router-dom";
import { useNavigate} from 'react-router-dom';
import google from "../common/img/google.png";



const CompanySignin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(
    (state) => state.user
  )
  const [company, setCompany] = useState({
    name: "",
    email: "",
    password: "",
    phoneno :"",
    
  });
  const [avatar, setAvatar] = useState(google);
  const [avatarPreview, setAvatarPreview] = useState(google);

  const handelInput = (e) => {
    const name = e.target.name;
    const val = e.target.value;
    setCompany({ ...company, [name]: val });
  };
  const handelInputAvatar =(e)=>{
    const reader = new FileReader();
    reader.onload=()=>{
      if(reader.readyState===2){
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    }
    reader.readAsDataURL(e.target.files[0]);
  }

  const postData = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("name" , company.name);
    myForm.set("email" , company.email);
    myForm.set("phoneno" , company.phoneno);
    myForm.set("password" , company.password);
    myForm.set("avatar" , avatar);
    myForm.set("isCompany" , true);
    dispatch(register(myForm))
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
            Register Your Company
          </h1>
          <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
            @ CareerCircuit
          </p>
        </div>
        <div class="flex lg:w-2/3 w-full sm:flex-col flex-col mx-auto px-8 sm:px-0 items-end sm:space-x-4 sm:space-y-0 space-y-4">
          <div class="relative sm:mb-0 flex-grow w-full">
            <label for="full-name" class="leading-7 text-sm text-gray-400">
              Full Name
            </label>
            <input
              onChange={handelInput}
              type="text"
              id="full-name"
              name="name"
              class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
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
            <label for="phoneno" class="leading-7 text-sm text-gray-400">
              Phone No.
            </label>
            <input
              onChange={handelInput}
              type="text"
              id="phoneno"
              name="phoneno"
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
          <div class="relative mb-4" id="registerImage">
            <img src={avatarPreview} className="w-2/6" alt="Avatar Preview" />
            <input
              
              type="file"
              name="avatar"
              accept="image/*"
              onChange={handelInputAvatar}
            />
          </div>
          <button
            onClick={postData}
            class="text-white bg-yellow-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded text-lg"
          >
            Register
          </button>
        </div>
        <hr className="my-4"></hr>
        <Link to="/company/login" className="text-yellow-500  font-semibold">
          Company Login ?
        </Link>
      </div>
    </section>
  );
};

export default CompanySignin;
