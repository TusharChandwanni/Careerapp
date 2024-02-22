import React, {  useEffect,useState } from "react";
import { Link } from "react-router-dom";
import {useNavigate,useParams} from "react-router-dom";
import { clearErrors, getPostDetails } from "../actions/userAction";
import { useSelector, useDispatch } from "react-redux";

const DisplayPost=()=>{

    let navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const { post, loading, error } = useSelector((state) => state.post);

    useEffect(() => {
     dispatch(getPostDetails(id));
    }, [dispatch,id]);

    return(
        <>
       {post.images && post.images.map((image)=>(
                    <img src={image.url} />
                ))}
            {post.comment}
        </>

    )
    
}

export default DisplayPost;