import React from 'react'
import {Route,  Routes} from 'react-router-dom'
import Main from '../Main/Main'
import LikePokes from '../LikePokemons/LikePokes'

export default function App() {

    return (
      <div>
        <Routes>
          {/* <Route path="/" element={<Registration/>}/> */}
          <Route path="/" element={<Main/>}/>
          <Route path="/Likes-Poke" element={<LikePokes/>}/>
        </Routes>
      </div> 
    )
}
