import React from 'react'
import Header from "../components/Header.jsx";
import SpecialtyMenu from "../components/SpecialtyMenu.jsx";
import TopDoc from "../components/TopDoc.jsx";

function Home() {
  return (
    <div>
    <Header/>
    <SpecialtyMenu/>
    <TopDoc/>
    </div>
  )
}

export default Home;