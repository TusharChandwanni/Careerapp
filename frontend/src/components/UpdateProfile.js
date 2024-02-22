import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updateProfile } from "../actions/userAction";
import { UPDATE_PROFILE_RESET } from "../constants/userConstants";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneno, setPhone] = useState("");
  const [avatar, setAvatar] = useState(user.avatar);
  const [avatarPreview, setAvatarPreview] = useState(user.avatar);
  const [description, setDescription] = useState("");
  const [skills, setskills] = useState([]);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [college, setCollege] = useState("");
  const [course, setCourse] = useState("");
  const [skill, setSkill] = useState("");
  const [years, setYears] = useState("");
  const [grade, setGrade] = useState("");

  const updateProfileSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("phoneno", phoneno);
    myForm.set("avatar", avatar);
    myForm.set("company", company);
    myForm.set("role", role);
    myForm.set("college", college);
    myForm.set("course", course);
    myForm.set("description", description);
    myForm.set("skills", skills);
    myForm.set("years", years);
    myForm.set("grade", grade);
    dispatch(updateProfile(myForm));
  };

  const addSkill = (e) => {
    e.preventDefault();
    setskills((current) => [...current, skill]);
    setSkill("");
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const notify = () => {
    toast("Profile Updated Sucessfully");
    
  }
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phoneno);
      setAvatar(user.avatar);
      setAvatarPreview(user.avatar.url);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      notify();
      navigate("/account");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, alert, user, isUpdated]);
  return (
    <>
      <section class="text-gray-400 bg-gray-900 body-font">
        <div class="container px-5 py-4 mx-auto flex flex-col">
          <div class="lg:w-4/6 mx-auto">
            <div class="flex flex-col sm:flex-row mt-10">
              <div class="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                <div class="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-800 text-gray-600">
                  <circle cx="12" cy="7" r="4">
                    <img src={user.avatar.url} className="" />
                  </circle>
                </div>
                <div class="flex flex-col items-center text-center justify-center">
                  <h2 class="font-medium title-font mt-4 text-white text-lg">
                    {user.name}
                  </h2>
                  <div class="w-12 h-1 bg-pink-500 rounded mt-2 mb-4"></div>
                  <p class="text-base text-gray-400">
                    {user.isCompany ? " Company " : " User "}
                  </p>
                </div>
              </div>
              <div class="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-800 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                <div class="relative sm:mb-0 flex-grow w-full">
                  <form
                    encType="multipart/form-data"
                    onSubmit={updateProfileSubmit}
                  >
                    <div>
                      <label for="name" class="leading-7 text-sm text-gray-400">
                        Name
                      </label>
                      <input
                        type="text"
                        placeholder="Name"
                        required
                        name="name"
                        value={name}
                        class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label
                        for="email"
                        class="leading-7 text-sm text-gray-400"
                      >
                        Name
                      </label>
                      <input
                        type="email"
                        placeholder="Email"
                        required
                        name="email"
                        class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div>
                      <label
                        for="phoneno"
                        class="leading-7 text-sm text-gray-400"
                      >
                        Name
                      </label>
                      <input
                        type="number"
                        placeholder="Phone Number"
                        required
                        class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        name="phoneno"
                        value={phoneno}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>

                    <div id="updateProfileImage">
                      <img src={avatarPreview} alt="Avatar Preview" />
                      <input
                        type="file"
                        name="avatar"
                        class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        accept="image/*"
                        onChange={updateProfileDataChange}
                      />
                    </div>
                    <div>
                      <h1>Experience</h1>
                      <input
                        type="text"
                        placeholder="Company"
                        class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        name="comapny"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Role"
                        name="role"
                        class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Years"
                        class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        name="years"
                        value={years}
                        onChange={(e) => setYears(e.target.value)}
                      />
                    </div>
                    <div>
                      <h1>Education</h1>
                      <input
                        type="text"
                        placeholder="College"
                        name="college"
                        value={college}
                        class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        onChange={(e) => setCollege(e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Course"
                        name="course"
                        value={course}
                        class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        onChange={(e) => setCourse(e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Grade"
                        name="grade"
                        value={grade}
                        class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        onChange={(e) => setGrade(e.target.value)}
                      />
                    </div>
                    <div>
                      <label
                        for="description"
                        class="leading-7 text-sm text-gray-400"
                      >
                        Description
                      </label>
                      <input
                        type="text"
                        placeholder="description"
                        name="description"
                        class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                    <div>
                      <label
                        for="skill"
                        class="leading-7 text-sm text-gray-400"
                      >
                        Skills
                      </label>
                      <input
                        type="text"
                        placeholder="skill"
                        name="skill"
                        value={skill}
                        class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        onChange={(e) => setSkill(e.target.value)}
                      />
                      <button onClick={addSkill}>Add Skill</button>
                    </div>
                    <button 
                      type="submit"
                      class="inline-flex text-white bg-pink-500 border-0 py-1 px-4 focus:outline-none hover:bg-pink-600 rounded"
                      >Update</button>
                  </form>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer autoClose={2000} theme="dark" />
    </>
  );
};

export default UpdateProfile;
