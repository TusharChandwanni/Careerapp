import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";


const ExploreCompany=()=> {
    const naviagte = useNavigate();
    const [list,setList] = useState([]);
    const  {isAuthenticated, user} = useSelector((store)=>store.user);

    const seemoreHandler =(ID)=>{
      naviagte('/company/profile' , {state : {id : ID}});
    }

    useEffect( ()=>{
        if(!isAuthenticated){
          naviagte('/login');
        }else{

          axios.get("http://localhost:4000/allcompanies")
          .then( (res)=>{
            setList(res.data);
          }).catch((err)=>{console.log(err)});
        }
    },[isAuthenticated])

  return (
    <>
    {
        list.length===0 ? 
        <p class="text-gray-400 body-font bg-gray-900">
          Fetching data...please hang on..!
        </p> : 
        
        (
            <>
          <section class="text-gray-400 body-font bg-gray-900">
            <div class="container px-5 pt-8 mx-auto">
              <div class="flex flex-wrap w-full mb-20 flex-col items-center text-center">
                <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-yellow-500">
                  All Companies
                </h1>
                <p class="lg:w-1/2 w-full leading-relaxed text-opacity-80">
                  Follow companies to get updates !
                </p>
              </div>
              <div class="flex flex-wrap -m-4">
                {list.map((item) => {
                  return (
                    <div class="xl:w-1/3 md:w-1/2 p-4" key={item._id}>
                      <div class="border border-gray-700 border-opacity-75 p-6 rounded-lg">
                        <div className=" flex flex-row ">
                        <div class="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-800 text-gray-600">
                          <circle cx="12" cy="7" r="4">
                            <img src={item.avatar.url} className="" />
                          </circle>
                        </div>
                        <h2 class="text-lg text-white font-medium title-font m-5">
                          {item.name}
                        </h2>
                        </div>
                        <p className="font-semibold text-yellow-500" >{item.profileName}</p>
                        <p class="leading-relaxed text-base">
                          Info : {item.companyProfile.description}
                        </p>
                        <p>Industry : {item.companyProfile.industry}</p>
                        <p>Products : {item.products.length} , Jobs : {item.jobs.length}</p>
                        <button 
                        name={item._id}
                        onClick={ ()=> {
                          seemoreHandler(item._id)
                        }}
                        class="flex mx-auto mt-2 text-white bg-yellow-500 border-0 px-4 py-2 focus:outline-none hover:bg-yellow-600 rounded">See More</button>

                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
          <ToastContainer autoClose={2000} theme="dark" />
        </>
        )
    }
    </>
  )
}

export default ExploreCompany;