import React, {useState, useEffect} from 'react';

import axios from 'axios';

import {
  IoMdSunny, 
  IoMdRainy,
  IoMdCloudy,
  IoMdSnow,
  IoMdThunderstorm,
  IoMdSearch,
} from 'react-icons/io';

import {
  BsCloudHaze2Fill,
  BsCloudDrizzleFill,
  BsEye,
  BsWater,
  BsThermometer,
  BsWind
} from 'react-icons/bs'

import {TbTemperatureCelsius} from 'react-icons/tb';

import {ImSpinner8} from 'react-icons/im';

const APIkey = 'f00840c4f3c33c3bf6e6904385da1f08';

const App = () => {
  const [data, setData] = useState(null);
  
  const [location, setLocation] = useState('Bucharest');
  
  const [inputValue, setInputValue] = useState('');

  const [animate, setAnimate] = useState(false);

  const [loading, setLoading] = useState(false);

  const [errMsg, setErrMsg] = useState('');

  const handleInput = (e) => {
    setInputValue(e.target.value);
  }

  const handleSubmit = (e) => {
    setInputValue(e.target.value);
    e.preventDefault();
    if(inputValue !== ''){
      setLocation(inputValue);
    }
    const input = document.querySelector('input');
    if(input.value === ''){
      setAnimate(true);

      setTimeout(() => {
        setAnimate(false);
      },500);
    }

    input.value = '';

  }

  //fetch the data
  useEffect(() => {
  setLoading(true);
   const url = 'https://api.openweathermap.org/data/2.5/weather?q='+location+'&appid='+APIkey+'&units=metric'; 

   axios.get(url)
  .then((response) => {
    setTimeout(() => {
      setData(response.data);
      setLoading(false);
    }, 1500);
    })
  .catch((error) => {
    setLoading(false);
    setErrMsg(error.response.data.message);
  });
  },[location]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrMsg('')
    }, 2000)
    // clear timer
    return () => clearTimeout(timer);
  },[errMsg]);

  //if data is false show the loader

  if(!data){
    return(
    <div>
      <div className='w-full h-screen flex items-center justify-center '>
        <ImSpinner8 className='text-5xl animate-spin'/>
      </div>
    </div>
    )
  }
  let icon;
  switch (data.weather[0].main) {
    case 'Clouds':
      icon = <IoMdCloudy/>
      break
    case 'Haze':
      icon = <BsCloudHaze2Fill/>
      break
    case 'Rain':
      icon = <IoMdRainy className='text-[#31afb]'/>
      break
    case 'Clear':
      icon = <IoMdSunny className='text-[#ffde33]'/>
      break
    case 'Drizzle':
      icon = <BsCloudDrizzleFill/>
      break
    case 'Snow':
      icon = <IoMdSnow className='text-[#31cafb]'/>
      break
    case 'Thunderstorm':
      icon = <IoMdThunderstorm/>
      break
  
  
            
  
    
  }
  const date = new Date();
  return (
    <div className='w-full h-screen bg-gradientBg flex flex-col items-center justify-center px-4 lg:px-0'>

      {errMsg !== '' &&
          <div className='h-[30px]'>{errMsg}</div>
      }

      <form className= {'h-16 bg-black/30 w-full max-w-[450px] rounded-full mb-8' + ' ' + (animate ? "animate-shake" : "animate-none")}>
        <div className='h-full realative flex items-center justify-between p-2'>
          <input onChange={(e) => handleInput(e)} className='flex-1 bg-transparent outline-none text-white font-light' type='text' placeholder = 'Search by city or country' />
          <button onClick={(e) => handleSubmit(e)} className='bg-[#1ab8ed] hover:bg-[#15abdd] h-12 w-20 flex items-center justify-center rounded-full transition'>
            <IoMdSearch/>
          </button>
        </div>
      </form>
      
      <div className='w-full max-w-[450px] min-h-[584px] bg-black/20 text-white rounded-[32px] py-12 px-6'>
      {loading ? (
      <div className='w-full h-full flex items-center justify-center'>
        <ImSpinner8 className='text-white animate-spin text-5xl' />
      </div>) : (
        <div>
          <div className='flex items-center gap-x-5'>
            <div className='text-[87px]'>{icon}</div>
            <div>
              <div className='text-2xl font-semibold'>
                {data.name}, {data.sys.country} 
              </div>
              <div>
                {date.getUTCDate()}/{date.getUTCMonth()}/{date.getUTCFullYear()}
              </div>
            </div>
          </div>

          <div className='my-20'>
            <div className='flex items-center justify-center'>
              <div className='text-[144px] font-light leading-none'>
                {parseInt(data.main.temp)}
              </div>
              <div className='text-4xl'>
                <TbTemperatureCelsius/>
              </div>
            </div>

            <div className='text-center capitalize'>{data.weather[0].description}</div>
          </div>

          <div className='flex justify-between max-w-[378px] mx-auto'>
            
            <div className='flex items-center gap-x-2'>
              <div className='text-[20px]'>
                <BsEye/>
              </div>
              <div>
                Visibility <span className='ml-2'>
                  {data.visibility/1000} km
                </span>
              </div>
            </div>

            <div className='flex items-center gap-x-2'>
              <div className='text-[20px]'>
                <BsThermometer/>
              </div>
              <div className='flex'>
                Feels like <span className='ml-2 flex'>
                  {parseInt(data.main.feels_like)}
                  <TbTemperatureCelsius/>
                </span>
              </div>
            </div>

          </div>

          <div className='flex justify-between max-w-[378px] mx-auto my-6'>
            
            <div className='flex items-center gap-x-2'>
              <div className='text-[20px]'>
                <BsWater/>
              </div>
              <div>
                Humidity <span className='ml-2'>
                  {data.main.humidity} %
                </span>
              </div>
            </div>

            <div className='flex items-center gap-x-2'>
              <div className='text-[20px]'>
                <BsWind/>
              </div>
              <div>
                Wind <span className='ml-2 '>
                  {parseInt(data.wind.speed)} m/s
                </span>
              </div>
            </div>

          </div>


        </div> 
        
        )}

      </div>
    </div>
  ); 
};

export default App;
