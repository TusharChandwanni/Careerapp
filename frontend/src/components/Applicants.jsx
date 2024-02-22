import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Applicants =()=> {
    const navigate = useNavigate();
    const {isAuthenticated, user} = useSelector((store)=>store.user);
    const {state} = useLocation();
    const jobID = state.id;
    const [job,setJob] = useState({
        profileName : ""
    });    

    useEffect(()=>{
        if(!isAuthenticated || (isAuthenticated && !user.isCompany) ){
            navigate('/company/login');
        }else{
            axios
            .post("http://localhost:4000/getapplicants",
            { id : jobID} 
            )
            .then( function(res){
                // console.log(res.data.applications)
                setJob(res.data);
            }).catch((err)=>{
                console.log(err);
            })
        }
    },[isAuthenticated])

    return (
        <>
        {job.profileName === "" ? 
            <p class="text-gray-400 body-font bg-gray-900">
            Fetching data...please hang on..!
            </p>
        :
            (   <>
                <p class="text-gray-400 body-font bg-gray-900">
                 Profile : {job.profileName}
                <br/>
                Applicants : 
                <ol className="list-decimal">
                   {job.applications.map( (item)=>{
                    return (
                        <li>{item.name}</li>
                    )
                   })} 
                </ol>
                </p>
                </>
            )
        }
        </>
    )
}

export default Applicants;