import { useState , useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import sample from "../common/img/sample.png";
import axios from "axios";
const PostProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector((store) => store.user);

  const [info, setInfo] = useState({
    name: "",
    company: user.name,
    companyID: user._id,
    description: "",
    category: "",
    price: "",
  });
    const [image, setImage] = useState(sample);
    const [imagePreview,setImagePreview] = useState(sample);

  const postData = ()=> {
    axios.post('http://localhost:4000/postproduct', {
        info,
        image
      })
      .then(function (response) {
        console.log(response);
        notify();
        setTimeout(()=>{
          navigate('/profile')
        },2000)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const notify = () => {
    toast("Product Posted Sucessfully");
    
  }
  const handelInput = (e) => {
    if (e.target.name === "image") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePreview(reader.result);
          setImage(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setInfo({ ...info, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    if (!isAuthenticated || (isAuthenticated && !user.isCompany)) {
      navigate("/company/login");
    }
  }, [dispatch, isAuthenticated]);

  return (
    <>
      <section class="text-gray-400  justify-center bg-gray-900 body-font">
        <div class="container px-5 py-4 mx-auto">
          <div class="text-center w-full mb-12">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-green-500">
              Post a Product
            </h1>
            <p className="font-semibold text-white">{user.name}</p>
          </div>
          <div class="flex gap-2 lg:w-2/3 w-full sm:flex-col flex-col mx-auto px-8 sm:px-0 items-end sm:space-x-4 sm:space-y-0 space-y-4">
            <div class="relative sm:mb-0 flex-grow w-full">
              <label for="name" class="leading-7 text-sm text-gray-400">
                Product Name
              </label>
              <input
                onChange={handelInput}
                type="text"
                id="name"
                required
                name="name"
                class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div class="relative sm:mb-0 flex-grow w-full">
              <label for="description" class="leading-7 text-sm text-gray-400">
                Description
              </label>
              <input
                onChange={handelInput}
                type="text"
                required
                id="description"
                name="description"
                class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div class="relative sm:mb-0 flex-grow w-full">
              <label for="category" class="leading-7 text-sm text-gray-400">
                Category
              </label>
              <input
                onChange={handelInput}
                type="text"
                id="category" required
                name="category"
                class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div class="relative sm:mb-0 flex-grow w-full">
              <label for="price" class="leading-7 text-sm text-gray-400">
                Price
              </label>
              <input
                onChange={handelInput}
                type="text"
                id="price"
                required
                name="price"
                class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div>
                <img className="w-2/6" src={imagePreview} alt="Image Preview" />
                <label for="image" class="leading-7 text-sm text-gray-400">Image</label>
                <input 
                onChange={handelInput}
                type="file"
                required
                name = "image"
                class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                >
                </input>
            </div>
            <button
              onClick={postData}
              class="text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg"
            >
              Post
            </button>
          </div>
        </div>
      </section>
      <ToastContainer autoClose={2000} theme="dark" />
    </>
  );
};

export default PostProduct;
