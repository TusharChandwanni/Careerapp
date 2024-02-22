import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const CompanyProducts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [list, setList] = useState([]);

  const { isAuthenticated, user } = useSelector((store)=>store.user);

  useEffect(() => {
    if (!isAuthenticated || (isAuthenticated && !user.isCompany)) {
      navigate("/company/login");
    } else {
      axios
        .get("http://localhost:4000/getmyproducts")
        .then((res) => {
          console.log(res.data);
          const newData = res.data.filter((item) => {
            return user._id === item.companyID;
          });
          setList(newData);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isAuthenticated, dispatch]);

  return (
    <>
      {list.length === 0 ? (
        <p class="text-gray-400 body-font bg-gray-900">
          Fetching data...please hang on..!
        </p>
      ) : (
        <section class="text-gray-400 bg-gray-900 body-font overflow-hidden">
          <h1 class="px-16 py-4 sm:text-3xl  text-2xl font-medium title-font mb-2 text-yellow-500">
            All Posted Products 
            <p className="text-base pt-2 text-white">Company : {user.name}</p>
          </h1>
          <div class="container px-5 py-8 mx-auto">
            <div class="-my-8 divide-y-2 divide-gray-800">
              {list.map((item) => {
                return (
                  <div class="py-8 flex flex-wrap md:flex-nowrap"> 
                  <span>
                        <img src={item.image.url} className="w-1/3 mx-2" title="image"></img>
                      </span>
                    <div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                      <span class="font-semibold title-font text-yellow-500">
                        {item.name}
                      </span>
                      <span class="mt-1 text-pink-500 text-sm">
                        Posted On : {item.createdAt.split('T')[0]}
                      </span>
                    </div>
                    <div class="md:flex-grow">
                      <h2 class="text-2xl font-medium text-white title-font mb-2">
                        {item.description}
                        <br></br>
                        <span className="mx-2 flex flex-row font-thin text-base text-green-500 ">
                          <p>{item.category}</p>
                        </span>
                      </h2>
                    </div>
                    
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
export default CompanyProducts;
