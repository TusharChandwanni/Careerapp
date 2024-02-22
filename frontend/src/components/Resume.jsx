import React, {  useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {useNavigate} from "react-router-dom";
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { loadUser } from "../actions/userAction";


const Resume = () => {
  const dispatch=useDispatch();
    let navigate = useNavigate();
    const { user, loading, isAuthenticated } = useSelector((state) => state.user);
    
    const downloadpdf=()=>{
      const capture=document.querySelector('.resume');
      html2canvas(capture).then((canvas)=>{
        const imgdata=canvas.toDataURL('img/png');
        const doc=new jspdf('p','mm','a4');
        const componentWidth=doc.internal.pageSize.getWidth();
        const componentHeight=doc.internal.pageSize.getHeight();
        doc.addImage(imgdata,'PNG', 20, 0,componentWidth, componentHeight);
        doc.save('resume.pdf');
      })
    }
  
    useEffect(() => {
     
      if (!isAuthenticated ) {
        navigate("/login");
      }
    }, [isAuthenticated]);
    return (
      <section class="text-gray-400 bg-gray-900 body-font  w-full">
            <div className="resume">
              <div class="container px-5 py-24 mx-auto flex flex-wrap items-center">
              <div >
                <h1 class="title-font font-medium text-3xl text-white">My Profile</h1>
                <img src={user.avatar.url} alt={user.name} />
                <Link to="/me/update" class="text-white bg-purple-500 border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 rounded text-lg">Edit Profile</Link>
                <Link to="/me/post" class="text-white bg-purple-500 border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 rounded text-lg">NEW POST</Link>
              </div>
              <div>
                <div >
                  <h4>Full Name</h4>
                  <p>{user.name}</p>
                </div>
                <div>
                  <h4>Email</h4>
                  <p>{user.email}</p>
                </div>
                <div>
                  <h4>Phone Number</h4>
                  <p>{user.phoneno}</p>
                </div>
                <div>
                  <h4>Description</h4>
                  <p>{user.description}</p>
                </div>
                <div>
                  <h4>Education</h4>
                  {user.education && user.education.map((edu)=>(
                    <div>
                    <h4>College</h4>
                    <p>{edu.college}</p>
                    <h4>Course</h4>
                    <p>{edu.course}</p>
                    <h4>Grade</h4>
                    <p>{edu.grade}</p>
                  </div>
                ))}                
                </div>
                <div>
                  <h4>Experience</h4>
                  {user.experience && user.experience.map((ex)=>(
                    <div>
                    <h4>Company</h4>
                    <p>{ex.company}</p>
                    <h4>Role</h4>
                    <p>{ex.role}</p>
                    <h4>Years</h4>
                    <p>{ex.years}</p>
                  </div>
                ))}      
                </div>
                <div>
                  <h4>Skills</h4>
                  {user.skills && user.skills.map((skill)=>(
                    <div>
                    
                    <p>{skill}</p>
                    
                  </div>
                ))}      
                </div>
                <div>
                  <h4>Joined On</h4>
                  <p>{String(user.createdAt).substr(0, 10)}</p>
                </div>
  
                <div>
                  <Link to="/password/update" class="text-white bg-purple-500 border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 rounded text-lg">Change Password</Link>
                </div>
              </div>
              <div>
              <button onClick={downloadpdf} class="text-white bg-purple-500 border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 rounded text-lg">Download Resume</button>
            </div>
            </div>
            </div>
            </section>
            
    );
  };
  
  export default Resume;
  