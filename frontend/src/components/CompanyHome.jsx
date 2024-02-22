
import { Link } from "react-router-dom"

const CompanyHome =() =>{


    return (
        
        <div className="flex flex-col">
            <h1 className="font-bold"> {auth===false ? "PLease login" : company} </h1>
            <Link to="/companyprofileupdate">Update Profile</Link>
            <Link to="/companypostjob">Post a Job</Link>
            <Link to="/companyapplicants">See applicants</Link>
        </div>
    )
}

export default CompanyHome;