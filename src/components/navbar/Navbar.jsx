import React, { useContext } from 'react';
import './Navbar.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { AuthContext, FirebaseContext } from '../store/Context';
import { useNavigate } from 'react-router';


function Navbar() {
  let {user} = useContext(AuthContext)
  let {auth} = useContext(FirebaseContext)
  const navigate = useNavigate()
  const handleLogout = async()=>{
    try {
      auth.signOut()
      navigate('/login')
    } catch (error) {
      alert(error)
    }
  }
  return (
    <div className='navbar'>
      <div className="elements">
        <div className="icon">
          <img onClick={()=>navigate('/')} className='olx-icon' src="https://logos-world.net/wp-content/uploads/2022/04/OLX-Symbol-700x394.png" alt="" />
        </div>
        <div className="placeSearch">
          <div className="icon">
            <i className="search-icon fas fa-search"></i>
          </div>
          <input className='search1' placeholder='India' type="text" />
          <i className="fas fa-chevron-down"></i>

        </div>
        <div className="productSearch">
          <div className="input">
          <input type="text" placeholder='Find Cars, Mobile Phones and more...' />
          </div>
        
        <button className='search-btn'><i style={{color:"white"}} className="search-icon fas fa-search"></i></button>
        </div>
        <div className="language">
          <span>English <i className="fas fa-chevron-down"></i></span>
        </div>
        <div className="loginPage">
          {user&&user?<span>{user.displayName}</span>:<span onClick={()=>navigate('/login')}>Login</span>}
          
          <hr />
        </div>
        <div className="logout">
          {user&&<span onClick={handleLogout}>Logout</span>}
          
        </div>
        <div className="sellMenu">
          <div className="sellMenuContent">
          <button className='sell' onClick={()=>{
            if(user){
              navigate('/create')
            }else{
              navigate('/login')
            }
            }}><i className="plus-icon fas fa-plus"></i>Sell</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
