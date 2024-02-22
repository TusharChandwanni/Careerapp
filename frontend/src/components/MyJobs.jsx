import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const { useState, useEffect } = require("react");

const MyJobs = () => {
  const navigate = useNavigate();
  const [jobsList, setJobsList] = useState([]);
  const { isAuthenticated, user } = useSelector((state) => state.user);

  function loadApplicants(itemID){
    // console.log(itemID);
    navigate('/company/applicants', { state : {id : itemID} });
  }

  useEffect(() => {
    if (!isAuthenticated || (isAuthenticated && !user.isCompany)) {
      navigate("/company/login");
    }
    axios
      .get("http://localhost:4000/getmyjobs")
      .then((res) => {
        // console.log(res.data);
        const filterData = res.data.filter((item) => {
          return item.companyID === user._id;
        });
        setJobsList(filterData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isAuthenticated]);

  return (
    <>
      {jobsList.length === 0 ? (
        "Fetching Data"
      ) : (
        <section class="text-gray-400 bg-gray-900 body-font overflow-hidden">
          <h1 class="px-16 py-8 sm:text-3xl  text-2xl font-medium title-font mb-2 text-yellow-500">
            All Posted Jobs <p className="text-base pt-2 text-white">Company : {user.name} </p>
          </h1>
          <div class="container px-5 py-8 mx-auto">
            <div class="-my-8 divide-y-2 divide-gray-800">
              {jobsList.map((item) => {
                return (
                  <div class="py-8 flex flex-wrap md:flex-nowrap" key={item._id}>
                    <div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                      <span class="font-semibold title-font text-yellow-500">
                        {item.profileName}
                      </span>
                      <span class="mt-1 text-pink-500 text-sm">
                        Posted On : {item.createdAt.split("T")[0]}
                      </span>
                    </div>
                    <div class="md:flex-grow">
                      <h2 class="text-2xl font-medium text-white title-font mb-2">
                        {item.description}
                        <br />
                        <a title="See Applicants" 
                        onClick={()=>{
                          loadApplicants(item._id);
                        }}
                        className="mx-2 flex flex-row font-thin text-base text-green-500 hover:underline hover:text-teal-500">
                          <p>Applications : {item.applications.length}</p>
                          <svg
                            class="my-1 w-4 h-4 ml-2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path d="M5 12h14"></path>
                            <path d="M12 5l7 7-7 7"></path>
                          </svg>
                        </a>
                      </h2>
                    </div>
                    <span class="mt-1 text-white-500 text-sm mr-6">
                      Open Till : {item.expire.split("T")[0]}
                      
                    </span>
                    <button title="delete" className="text-red-500">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="my-1 w-6 h-6 ml-2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M 10 2 L 9 3 L 3 3 L 3 5 L 4.109375 5 L 5.8925781 20.255859 L 5.8925781 20.263672 C 6.023602 21.250335 6.8803207 22 7.875 22 L 16.123047 22 C 17.117726 22 17.974445 21.250322 18.105469 20.263672 L 18.107422 20.255859 L 19.890625 5 L 21 5 L 21 3 L 15 3 L 14 2 L 10 2 z M 6.125 5 L 17.875 5 L 16.123047 20 L 7.875 20 L 6.125 5 z"></path>
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default MyJobs;
