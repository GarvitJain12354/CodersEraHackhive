import React from 'react'
import Map from '../Leaflet'
import { data } from '@/db/Routes';
import CSVUploader from '../CsvUploader.js/Csv';
import { TextField } from '@mui/material';


const Dashboard = () => {
    const mappedData = data?.map(item => ({
        coordinates: [item.Longitude, item.Latitude],
        name: `Device ID: ${item['Device ID']}`
      }));
  return (
    <div className="w-full h-screen flex">
<div className="w-1/3 h-full flex flex-col items-center justify-start">
    <form className=''></form>
<TextField id="outlined-basic" label="Search with device Id" variant="outlined" />
    <CSVUploader/>
</div>
<Map points={mappedData}/>
    </div>
  )
}

export default Dashboard