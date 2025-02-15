import React from 'react';
import Navbar from '../components/Navbar'
import Banner from '../components/Banner'
import Page2 from '../components/Page2'
function Home() {
  return (
    <div className="w-full">
      <Navbar/>

      {/* Banner Section */}
      <Banner/>
      <Page2 />
    </div>
  );
}

export default Home;
