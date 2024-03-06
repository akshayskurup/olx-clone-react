import { Children, createContext, useState } from "react";

export let PostContext = createContext(null)


function Post({children}) {
    let [postDetails,setPostDetails] = useState()
  return (
    <PostContext.Provider value={{postDetails,setPostDetails}}>
        {children}
    </PostContext.Provider>
  )
}

export default Post