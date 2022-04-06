import React, {useState} from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import InfoSection from '../components/InfoSection';
import { homeObjOne, homeObjThree, homeObjTwo } from '../components/InfoSection/Data';
import Github from '../components/Github';
import Footer from '../components/Footer';

const Home = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  return(
      <>
      <Sidebar isOpen={isOpen} toggle={toggle}/>
      <Navbar toggle={toggle}/>
      <InfoSection {...homeObjOne}/>
      <InfoSection {...homeObjTwo}/>
      <InfoSection {...homeObjThree}/>
      <Github/>
      <Footer/>
     </>
  )
};

export default Home;
