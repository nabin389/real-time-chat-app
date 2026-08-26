import React from 'react'
import Slidebar from './Slidebar'
import MessageContainer from './MessageContainer'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className='flexIsm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop:filter backdrop:blur-lg bg-opacity-0'>
      Home Page
      <Slidebar/>
      <MessageContainer/>

<br />
<br />
      <Link to='/login'>login</Link>
      <br /><br />
      <Link to='/register'>Signup</Link>
    </div>
  )
}

export default HomePage