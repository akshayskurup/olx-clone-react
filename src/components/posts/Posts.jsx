
import React, { useContext, useEffect, useState } from 'react';
import './Posts.css';
import { FirebaseContext } from '../store/Context';
import { PostContext } from '../store/PostContext';
import { useNavigate } from 'react-router';






function Posts() {
  const {collection,getDocs,firestore}=useContext(FirebaseContext)
  const [products,setProducts] = useState([])
  const {setPostDetails} = useContext(PostContext)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "products"));
        const fetchedProducts = [];
        querySnapshot.forEach((doc) => {
          fetchedProducts.push( {id: doc.id, ...doc.data()} );
          if(products.length === 0){

            setProducts(fetchedProducts);
          }
          console.log(fetchedProducts)
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    fetchData()
    
  }, []);
  
   
    
  

  return (
    <div className="container"> 
      <p className='fresh-reco'>Fresh recommendations</p>
      
      <div className="row gx-5">  

        {/* Post 1 */}
        {products.map((product)=>(
        <div className="col-md-3">  
          <div className="card" onClick={()=>{
            setPostDetails(product)
            navigate('/view')
            }}>
            <div className="inner">
              <img className='img' src={product.url} alt="" /> 
              <div className="des">
 
              <p className='price'>₹{product.price}</p>
              <p className='km'>{product.category}</p> 
              <p className='name'>{product.name}</p>
              <p className='date'>{product.createdAt}</p>
              </div>
            </div>
          </div>
        </div>
        ))
        }

              </div> 
    </div> 
  );
}

export default Posts;
