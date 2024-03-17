"use client";
import React, { useEffect } from 'react'
import Leaflet from './Leaflet'
import MyComponent from './Google'
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import { LocationCity, LocationCityTwoTone } from '@mui/icons-material'
import MapWithRoute from './MapBox'
import { useDispatch } from 'react-redux'
import { getLocation } from '@/store/Action/Auth'

const Page2 = () => {
    const dispatch = useDispatch();
    useEffect(() => {
    dispatch(getLocation());
    }, [])
    const calculateDistance = (point1, point2) => {
        const R = 6371e3; // meters
        const φ1 = (point1.lat * Math.PI) / 180;
        const φ2 = (point2.lat * Math.PI) / 180;
        const Δφ = ((point2.lat - point1.lat) * Math.PI) / 180;
        const Δλ = ((point2.lng - point1.lng) * Math.PI) / 180;
    
        const a =
          Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
          Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
        const d = R * c; // in meters
        return d / 1000; // convert to kilometers
      };
  return (
    <div className="w-full h-screen flex pt-[10vh]">
        <div className="w-[40%] h-full bg-gray-100 items-center p-5 flex flex-col gap-4">
            <div className="flex gap-7 items-center">
                <img className='h-7 w-7 object-contain' src="/car.png" alt="" />
                <img className='h-7 w-7 object-contain' src="/cycling.png" alt="" />
                <img className='h-7 w-7 object-contain' src="/walking.png" alt="" />
            </div>
            <FormControl sx={{ m: 1, width: '80%',marginTop:"4vh" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Starting Point</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={ 'text'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  edge="end"
                >
                  <LocationCityTwoTone/>
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: '80%' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Ending Point</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={ 'text'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  edge="end"
                >
                  <LocationCityTwoTone/>
                </IconButton>
              </InputAdornment>
            }
            label="Ending Point"
          />
        </FormControl>
        <Button type='button' variant='contained' className='bg-blue-400 hover:bg-blue-500'>
          Search
        </Button>
        </div>
        <div className="w-[60%] h-full bg-red-200">
            {/* <Leaflet/> */}
            <MapWithRoute/>
        </div>

    </div>
  )
}

export default Page2