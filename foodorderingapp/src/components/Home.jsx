import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'
import MultiItemCarousel from './MultiItemCarousel';
import FlatwareIcon from '@mui/icons-material/Flatware';

export const Home = () => {
  return (
    <div className=''>
      <section className='banner border-opacity-45 border-4 border-solid border-white'>
        <div className=" text-center align-middle">
          <h1 className=" relative text-2xl lg:text-7xl font-extrabold x-100 py-5 z-10 text-black "> Welcome to Bala's Food Stall</h1>
          <p className="z-10 bg-gray-50 font-bold lg:text-4xl transform translate-x-1 translate-y-1 "><FlatwareIcon fontSize='inherit'/> "Crave,Click,Enjoy - Your Favorite Food, Just a Tap Away"</p>
          <div className="mt-10 space-x-10">
            <Link to="/login" className="bg-black text-white py-2 px-4 rounded focus:outline-none hover:bg-gray-900 hover:animate-pulse transition duration-200 ease-in-out no-underline">
              Login
            </Link>
            <Link to="/signup" className="bg-black text-white py-2 px-4 rounded focus:outline-none hover:bg-gray-900 hover:animate-pulse transition duration-300 ease-in-out no-underline">
              Sign Up
            </Link>
          </div>
        </div>
      </section>
      <div className='fadeout h-20 bg-gradient-to-b from-gray-800 to-black'></div>

      <section className='p-10 lg:py-10 lg:px-20 bg-black'>
        <p className='text-3xl font-extrabold text-white py-3 pb-10'>Top foods</p>
        <MultiItemCarousel />
      </section>
    </div>
  );
};

export default Home