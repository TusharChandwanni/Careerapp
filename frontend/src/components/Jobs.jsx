import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { logout } from "../actions/userAction";

const Jobs = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {isAuthenticated , user} = useSelector  (
      (store)=> store.user
  )
  
  const [appliedList ,setAppliedList] = useState();
  
  
  const notify = () => {
    toast("Applied Aleady");
    
  }
  const notify2 = () => {
    toast("Login as a user");
    
  }

  useEffect(() => {
    if(!isAuthenticated){
      navigate('/login');
    }else{
    setAppliedList(user.appliedJobs)
    axios
      .get("http://localhost:4000/getjobs")
      .then(function (res) {
        console.log(res.data);
        setData(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    } 
  }, []);



  const applyHandler=(e)=> {
    const jobID = e.target.name;
    //if user is authen and is not a company
    if(isAuthenticated){
        if(user.isCompany===true){
            notify2();
            setTimeout(()=>{
                dispatch(logout());
                navigate('/login');
            },2200);
        }
        //check if user has alredy applied for this job
        const userjobsList = appliedList.find((id)=>{
            return id===jobID;
        });
        if(userjobsList!=undefined){
            notify();
        }else{
            //apply to job and send to backend
            axios.put("http://localhost:4000/applyjob",{
                jobID : jobID, userID : user._id
            }).then(function(res){
                setAppliedList(res.data);
                navigate('/jobs');
            }).catch(function(err){
                console.log(err);
            })
        }
    }else{
        navigate('/login');
    }
  }

  return (
    <>
      {data.length === 0 ? (
        <p class="text-gray-400 body-font bg-gray-900">
          Fetching data...please hang on..!
        </p> 
      ) : (
        <>
          <section class="text-gray-400 body-font bg-gray-900">
            <div class="container px-5 pt-8 mx-auto">
              <div class="flex flex-wrap w-full mb-20 flex-col items-center text-center">
                <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-yellow-500">
                  All Jobs
                </h1>
                <p class="lg:w-1/2 w-full leading-relaxed text-opacity-80">
                  Now apply for jobs all round the world !
                </p>
              </div>
              <div class="flex flex-wrap -m-4">
                {data.map((item) => {
                  return (
                    <div class="xl:w-1/3 md:w-1/2 p-4" key={item._id}>
                      <div class="border border-gray-700 border-opacity-75 p-6 rounded-lg">
                        <div class="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-800 text-gray-600">
                          <circle cx="12" cy="7" r="4">
                            <img src={item.companyID.avatar.url} className="" />
                          </circle>
                        </div>
                        <h2 class="text-lg text-white font-medium title-font mb-2">
                          {item.company}
                        </h2>
                        <p className="font-semibold text-yellow-500" >{item.profileName}</p>
                        <p class="leading-relaxed text-base">
                          Info : {item.description}
                        </p>
                        <p>CTC : {item.salary}</p>
                        <p>Skills : {item.skills}</p>
                        <p>Location : {item.location}</p>
                        <p>Ends At : {item.expire.split('T')[0]}</p>
                        <button 
                        onClick={applyHandler}
                        name={item._id}
                        class="flex mx-auto mt-2 text-white bg-yellow-500 border-0 px-4 py-2 focus:outline-none hover:bg-yellow-600 rounded">Apply</button>

                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
          <ToastContainer autoClose={2000} theme="dark" />
        </>
      )}
    </>
  );
};

export default Jobs;
