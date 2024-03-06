import React, { useContext, useState } from 'react'
import './Create.css'
import { AuthContext, FirebaseContext } from '../store/Context'
import { useNavigate } from 'react-router'

function Create() {
  let [name,setName] = useState('')
  let [category,setCategory] = useState('')
  let [price,setPrice] = useState(0)
  let [image,setImage] = useState('')
  let [errorMessage,setErrorMessage] = useState('')
  let [loading,setLoading] = useState(false)
  let {storage,firestore,firebaseApp} = useContext(FirebaseContext)
  let {user} = useContext(AuthContext)
  const date = new Date()
  const navigate = useNavigate()


  const handleSubmit = ()=>{
    setErrorMessage('')
    if(name.trim()==="" || category.trim()==="" || price.trim()==="" || !image){
      return setErrorMessage("Please fill all the fields")
    }
    if(price<=0){
      return setErrorMessage("Price cannot be 0 or less")
    }
    setLoading(true)
    const storageRef=storage.ref(`/image/${image.name}`)
    storageRef.put(image).then((snapshot)=>{
      storageRef.getDownloadURL().then((url)=>{
         firestore.collection('products').add({
          name,
          category,
          price,
          url,
          userId:user.uid,
          createdAt:date.toDateString()
        }).then(() => {
          setLoading(false)
          navigate('/')
      }).catch((error) => {
        setLoading(false)
          console.error("Error adding product:", error);
      });

      });
    })
  }


  return (
    <div className='create'>
      <div className="child">

      <h2>Add Post</h2>            
            {errorMessage && <span>{errorMessage}</span>}
                
                <input placeholder='Name' className='name-input' type="text" onChange={(e)=>setName(e.target.value)}/>
                
                <input placeholder='Category' className='category-input' type="text" onChange={(e)=>setCategory(e.target.value)} />
                
                <input placeholder='Price' className='price-input' type="number" onChange={(e)=>setPrice(e.target.value)} />
                
                <img className='image-preview' width={image?"200px":""} height={image?"150px":""}  src={image?URL.createObjectURL(image):""} alt="Post" />
                
                <input placeholder='image' className='image-input' type="file" onChange={(e)=>setImage(e.target.files[0])} />
                <button className='upload-btn' onClick={handleSubmit}>
                  {loading ? 'Uploading...':"Upload"}
                </button>
            
      </div>
            
        </div>
  
  )
}

export default Create