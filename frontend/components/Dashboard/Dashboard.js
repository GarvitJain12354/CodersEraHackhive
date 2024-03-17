import React, { useEffect, useState } from 'react'
import Map from '../Leaflet'
import { data } from '@/db/Routes';
import CSVUploader from '../CsvUploader.js/Csv';
import { Button, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { searchDevice } from '@/store/Action/Auth';
import MapSearch from '../SearchMap';


const Dashboard = () => {
    const [name, setname] = useState("");
    const [mappedData, setmappedData] = useState([])
    const {searchData} = useSelector((state)=>state.Auth);
     
      const dispatch = useDispatch();
      const search = ()=>{
        dispatch(searchDevice(name));
      }
      useEffect(() => {
        const d = data?.map(item => ({
            coordinates: [item.Longitude, item.Latitude],
            name: `Device ID: ${item['Device ID']}`
          }));
    
        setmappedData(d);
      }, [])
      
      useEffect(() => {
     
       if(searchData && searchData?.length > 0){
        const a = data?.map(item => ({
            coordinates: [item.Longitude, item.Latitude],
            name: `Device ID: ${item['Device ID']}`
          }));
       setmappedData(a);
       }
      }, [])
      
  return (
    <div className="w-full h-screen flex">
<div className="w-1/3 h-full flex flex-col items-center justify-start">
    <form  className="flex flex-col">
<TextField id="outlined-basic" label="Search with device Id" variant="outlined" value={name} onChange={(e)=>setname(e.target.value)} />
<Button variant='contained' className='bg-blue-400 hover:bg-blue-500' onClick={search}>Search</Button>
    </form>
    <CSVUploader/>
</div>
<Map points={mappedData}/>

    </div>
  )
}

export default Dashboard