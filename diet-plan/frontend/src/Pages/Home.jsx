import React from 'react';
import Navbar from '../components/Navbar'
import Banner from '../components/Banner'
function Home() {
  return (
    <div className="w-full">
      <Navbar/>

      {/* Banner Section */}
      <Banner/>
    </div>
  );
}

export default Home;
