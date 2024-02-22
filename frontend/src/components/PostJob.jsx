import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  

const PostJob = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [job,setJob] = useState({
    company : user.name,
    companyID : user._id,

    description : "",
    profileName:"",
    location: "",
    salary: "",
    skills : "",
    expire : null,

  })
  const handelInput=(e)=>{
    setJob(
      {
        ...job,
        [e.target.name]: e.target.value
      }
    )
  }
  const notify = () => {
      toast("Job Created Sucessfully");
      
    }
  const postData = ()=> {
    axios.post('http://localhost:4000/postjob', {
        job
      })
      .then(function (response) {
        // console.log(response);
        notify();
        setTimeout(()=>{
          navigate('/profile')
        },2000)
      })
      .catch(function (error) {
        console.log(error);
      });
  }



  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/company/login");
    }
  }, [dispatch, isAuthenticated]);

  return (
    <>
      <section class="text-gray-400  justify-center bg-gray-900 body-font">
        <div class="container px-5 py-6 mx-auto">
          <div class="text-center w-full mb-12">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-pink-500">
              Post A Job
            </h1>
          </div>
          <div class="flex gap-2 lg:w-2/3 w-full sm:flex-col flex-col mx-auto px-8 sm:px-0 items-end sm:space-x-4 sm:space-y-0 space-y-4">
            <div class="relative sm:mb-0 flex-grow w-full">
              <label for="description" class="leading-7 text-sm text-gray-400">
                Job Description
              </label>
              <input onChange={handelInput}
                type="text"
                id="description" required
                name="description"
                class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div class="relative sm:mb-0 flex-grow w-full">
              <label for="profileName" class="leading-7 text-sm text-gray-400">
                Profile Name
              </label>
              <input onChange={handelInput}
                type="text"
                required
                id="profileName"
                name="profileName"
                class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div class="relative sm:mb-0 flex-grow w-full">
              <label for="salary" class="leading-7 text-sm text-gray-400">
                Expected CTC (INR.)
              </label>
              <input onChange={handelInput}
                type="text"
                id="salary" required
                name="salary"
                class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div class="relative sm:mb-0 flex-grow w-full">
              <label for="skills" class="leading-7 text-sm text-gray-400">
                Required Skills
              </label>
              <input onChange={handelInput}
                type="text"
                id="skills" required
                name="skills"
                class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div class="relative sm:mb-0 flex-grow w-full">
              <label for="location" class="leading-7 text-sm text-gray-400">
                Location
              </label>
              <input onChange={handelInput}
                type="text"
                id="location" required
                name="location"
                class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div class="relative sm:mb-0 flex-grow w-full">
              <label for="expire" class="leading-7 text-sm text-gray-400">
                Open Till
              </label>
              <input onChange={handelInput}
                type="date"
                id="expire" required
                name="expire"
                class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>

            <button 
            onClick={postData}
            class="text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg">
              Post
            </button>
          </div>
        </div>
      </section>
      <ToastContainer autoClose={2000} theme="dark"/>
    </>
  );
};

export default PostJob;
