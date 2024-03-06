import React, { useContext, useEffect, useState } from 'react'
import "./View.css"
import { PostContext } from '../store/PostContext'
import { FirebaseContext } from '../store/Context'

function View() {
    let {postDetails} = useContext(PostContext)
    let {firestore,collection,query,where,getDocs} = useContext(FirebaseContext)
    const [userDetails,setUserDetails] = useState()
    useEffect(()=>{
        const fetchData = async()=>{
            const {userId} = postDetails
            const usersRef = collection(firestore, "users");
            const q = query(usersRef, where("id", "==", userId));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
             setUserDetails(doc.data());
             console.log(doc.data());
    });
        }

        fetchData()
    },[])
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
        {userDetails && <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.username}</p>
          <p>{userDetails.phone}</p>
        </div>}
      </div>
    </div>
  )
}

export default View