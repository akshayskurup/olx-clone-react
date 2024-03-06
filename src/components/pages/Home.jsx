import React from 'react'
import Navbar from '../navbar/Navbar'
import Posts from '../posts/Posts'
import Footer from '../footer/Footer'
import NavSub from '../nav-sub/NavSub'



function Home() {
  return (
    <div>
        <Navbar />
        <NavSub />
        <Posts />
        <Footer />
    </div>
  )
}   

export default Home