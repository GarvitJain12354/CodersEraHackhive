
"use client"
import CSVUploader from '@/components/CsvUploader.js/Csv';
import Dashboard from '@/components/Dashboard/Dashboard';
import MyComponent from '@/components/Google'
import Map from '@/components/Leaflet';
import Mapple from '@/components/Leaflet';
import Leaflet from '@/components/Leaflet';
import MapWithRoute from '@/components/MapBox';
import Nav from '@/components/Nav'
import Page1 from '@/components/Page1';
import Page11 from '@/components/Page11';
import Page2 from '@/components/Page2';
import { data } from '@/db/Routes';
import React, { useEffect } from 'react'
import { WazeAPI } from "waze-api";

const page =() => {
  // const points = [
  //   { coordinates: [77.4126,23.2599 ], name: 'Point 1' }, // [longitude, latitude]
  //   { coordinates: [10, 10], name: 'Point 2' },
  //   // Add more points as needed
  // ];
  const mappedData = data?.map(item => ({
    coordinates: [item.Longitude, item.Latitude],
    name: `Device ID: ${item['Device ID']}`
  }));
useEffect(() => {
}, [])

  return (
<>
<Nav/>
<div className="w-full">
{/* <Leaflet/> */}
<Page11/>
{/* <Mapple/> */}
<Dashboard/>
<Page2/>
{/* <CSVUploader/> */}

{/* <MyComponent/> */}
  </div>
</>
  )
}

export default page