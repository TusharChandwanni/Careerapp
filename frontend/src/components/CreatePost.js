import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, createpost } from "../actions/userAction";
import { useNavigate } from "react-router-dom";
import { NEW_POST_RESET } from "../constants/userConstants";

const CreatePost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { success } = useSelector((state) => state.newpost);
  const [comment, setComment] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const reviewSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("comment", comment);
    images.forEach((image) => {
      myForm.append("images", image);
    });
    myForm.set("user", user._id);
    dispatch(createpost(myForm));
  };

  const updatePostDataChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };
  useEffect(() => {
    if (success) {
      navigate("/account");
      dispatch({ type: NEW_POST_RESET });
    }
  }, [dispatch, success]);

  return (
    
      <section class="text-gray-400 bg-gray-900 body-font relative">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-col text-center w-full mb-12">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">
              Create Post
            </h1>
            <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
              "Empower Your Voice: Craft Your Post, Spark Conversations."
            </p>
          </div>
          <div class="lg:w-1/2 md:w-2/3 mx-auto">
          <form onSubmit={reviewSubmitHandler}>
            <div class="flex flex-wrap -m-2">
              <div class="p-2 w-full">
                <div class="relative">
                  <label for="message" class="leading-7 text-sm text-gray-400">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    name="message"
                    class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 h-32 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
              </div>
              <input
                type="file"
                name="images"
                accept="image/*"
                onChange={updatePostDataChange}
                multiple
              />
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
              <div class="p-2 w-full">
                <button class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                  Button
                </button>
              </div>
            </div>
        </form>

          </div>
        </div>
      </section>
  );
};

export default CreatePost;
