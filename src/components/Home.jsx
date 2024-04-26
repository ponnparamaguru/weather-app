import React, { useEffect, useState } from 'react'
import { IoSearch } from "react-icons/io5";
import clear from '../assets/clear.png'
import cloud from '../assets/cloud.png'
import drizzle from '../assets/drizzle.png'
import rain from '../assets/rain.png'
import snow from '../assets/snow.png'

import wind from '../assets/wind.png'
import humidity from '../assets/humidity.png'

const API_KEY = process.env.REACT_APP_API_KEY;

const Home = () => {
    const [search, setSearch] = useState("Chennai");
    const [city, setCity] = useState();
    const [icon, setIcon] = useState(clear);
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=7f58aba2dbb1d43e654ac5471563a66d&units=metric`);
                if (!res.ok) {
                    throw new Error('Failed to fetch weather data');
                }
                const data = await res.json();
                setCity(data);
                if (data.weather && data.weather.length > 0) {
                    const iconCode = data.weather[0].icon;
                    if (iconCode === "01d" || iconCode === "01n") {
                        setIcon(clear);
                    }
                    if (iconCode === "02d" || iconCode === "02n" || iconCode === "03d" || iconCode === "03n" || iconCode === "04d" || iconCode === "04n" ) {
                        setIcon(cloud);
                    }
                    if (iconCode === "09d" || iconCode === "09n")
                    {
                        setIcon(drizzle);
                    } 
                    if(iconCode === "10d" || iconCode === "10n" || iconCode === "11d" || iconCode === "11n") {
                        setIcon(rain);
                    }
                    if (iconCode === "13d" || iconCode === "13n") {
                        setIcon(snow);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }

        if (search) {
            fetchData();
        }
    }, [search]);

  return (
    <div>
        <div className='bg-sky-500 h-screen w-full flex justify-center items-center'>
            <div className='md:h-5/6 md:w-4/12 h-4/6 w-10/12 bg-sky-400 rounded-3xl drop-shadow-2xl relative'>
                <div className='relative flex items-center p-10'>
                    <IoSearch className='w-5 h-5 ml-3 absolute text-white' />
                        <input
                            type='text'
                            id="cityInput"
                            name="search"
                            placeholder='Search'
                            autoComplete='off'
                        className='w-full h-10 pl-10 placeholder-white text-white cursor-white outline-none rounded-3xl bg-sky-300' 
                        onChange={(e)=>setSearch(e.target.value)}/>
                </div>
                
                <div className='text-center'>
                    <div className='flex justify-center item-center'>
                        <img className='md:w-36 w-28' src={icon} alt=""></img>
                    </div>
                    <h1 className='md:text-3xl text-2xl font-bold text-white' >{city?.name}</h1>
                    <h1 className='md:text-6xl text-5xl font-bold text-white' >{city?.main?.temp}</h1>
                    <div className='grid grid-cols-2 justify-center text-white px-5 md:py-5 py-20 text-xl font-bold'>
                        <div className='flex flex-col items-center'>
                            <p className='mb-2 text-xl md:text-2xl'>Humidity</p>
                            <div className='flex items-center'>
                                <img className='w-6 h-6' src={humidity} alt=""/>
                                <p className='md:text-3xl text-2xl ml-2'>{city?.main?.humidity}</p>
                            </div>
                        </div>
                        <div className='flex flex-col items-center'>
                            <p className='mb-2 text-xl md:text-2xl'>Wind speed</p>
                            <div className='flex items-center'>
                                <img className='w-6 h-6' src={wind} alt=""/>
                                <p className='md:text-3xl text-2xl ml-2'>{Math.floor(city?.wind?.speed)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home
