import React from 'react'
import About from '../components/aboutus';
import { homeObjOne, homeObjThree, homeObjTwo } from '../components/aboutus/Data';

const aboutpage = () => {
  return (
    <>
      <About {...homeObjOne}/>
      <About {...homeObjTwo}/>
      <About {...homeObjThree}/>
    </>
  )
}

export default aboutpage