"use client";
import React, { use, useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import axios from "axios";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 22.7162,
  lng: 75.8719,
};

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDy1cMZAHpvtq85Cf8jyBf2cXFM2JaLaWM",
  });

  const [distance, setDistance] = useState(null);

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

  const onLoad = (map) => {
    const bhopal = { lat: 23.2599, lng: 77.4126 };
    const indore = { lat: 22.7196, lng: 75.8577 };

    const calculatedDistance = calculateDistance(bhopal, indore);
    setDistance(calculatedDistance.toFixed(2));
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://api.opencagedata.com/geocode/v1/json",
        {
          params: {
            q: "Ashoka Garden Bhopal",
            key: "0d7e184e4e574cdf91143c8be28e5fd7",
          },
        }
      );
      if (response.data) {
        const { lat, lng } = response.data.results[0].bounds.northeast;
        console.log(response.data);
        console.log(lat, lng, 88);
      } else {
        console.log("No results found");
      }
    } catch (error) {
      console.log("Error fetching data");
    }
  };
  const fetchLocation = async () => {
    try {
      const response = await axios.get(
        "https://api.opencagedata.com/geocode/v1/json",
        {
          params: {
            q: "22.7162,75.8719", // Replace latitude and longitude with actual values
            key: "0d7e184e4e574cdf91143c8be28e5fd7",
          },
        }
      );
      if (response.data) {
        const { formatted } = response.data.results[0];
        console.log(response.data);
      } else {
        console.log("No results found");
      }
    } catch (error) {
      console.log(error);
      console.log("Error fetching data");
    }
  };
  function haversineDistance(lat1, lon1, lat2, lon2) {
    // Radius of the Earth in kilometers
    const R = 6371;
    
    // Convert latitude and longitude from degrees to radians
    const radLat1 = (lat1 * Math.PI) / 180;
    const radLon1 = (lon1 * Math.PI) / 180;
    const radLat2 = (lat2 * Math.PI) / 180;
    const radLon2 = (lon2 * Math.PI) / 180;
    
    // Calculate the differences between latitudes and longitudes
    const dLat = radLat2 - radLat1;
    const dLon = radLon2 - radLon1;
    
    // Haversine formula
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(radLat1) * Math.cos(radLat2) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    
    return distance;
}
  useEffect(() => {
    // fetchData();
    fetchLocation();
    const distance = haversineDistance(40.7128, -74.0060, 34.0522, -118.2437);
console.log(distance,456); 
  }, []);
  
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={7}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Markers for Bhopal and Indore */}
      <Marker position={{ lat: 23.2599, lng: 77.4126 }} />
      <Marker position={{ lat: 22.7196, lng: 75.8577 }} />

      {/* Display the distance */}
      {distance && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "5px",
            boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.5)",
          }}
        >
          Distance between Bhopal and Indore: {distance} km
        </div>
      )}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default MyComponent;

// // p2KqmGCE7n0BbMIuMzXV
// // wqWP4MKHPtQ9gs_qU0-aKSQO-atndf5hbrE4T8E83O8
// // AIzaSyDy1cMZAHpvtq85Cf8jyBf2cXFM2JaLaWM
// import React, { useEffect, useState } from "react";
// import { GoogleMap, useJsApiLoader, Marker, Polyline } from "@react-google-maps/api";
// import axios from "axios";

// const containerStyle = {
//   width: "100%",
//   height: "100%",
// };

// const center = {
//   lat: 22.7162,
//   lng: 75.8719,
// };

// function MyComponent() {
//   const { isLoaded } = useJsApiLoader({
//     id: "google-map-script",
//     googleMapsApiKey: "AIzaSyDy1cMZAHpvtq85Cf8jyBf2cXFM2JaLaWM",
//   });

//   const [rootCoordinates, setRootCoordinates] = useState([]);
//   const [distance, setDistance] = useState(null);

//   const calculateDistance = (point1, point2) => {
//     // Haversine formula calculation for distance
//     // ...
//   };

//   const fetchRootCoordinates = async () => {
//     try {
//       const response = await axios.get(
//         "https://maps.googleapis.com/maps/api/directions/json",
//         {
//           params: {
//             origin: "Bhopal",
//             destination: "Indore",
//             key: "AIzaSyDy1cMZAHpvtq85Cf8jyBf2cXFM2JaLaWM",
//           },
//         }
//       );
//       if (response.data && response.data.routes && response.data.routes.length > 0) {
//         const points = response.data.routes[0].overview_polyline.points;
//         const decodedPoints = window.google.maps.geometry.encoding.decodePath(points);
//         setRootCoordinates(decodedPoints);
        
//         // Calculate distance between Bhopal and Indore
//         const bhopal = { lat: 23.2599, lng: 77.4126 };
//         const indore = { lat: 22.7196, lng: 75.8577 };
//         const calculatedDistance = calculateDistance(bhopal, indore);
//         setDistance(calculatedDistance.toFixed(2));
//       } else {
//         console.log("No route found");
//       }
//     } catch (error) {
//       console.log("Error fetching root coordinates", error);
//     }
//   };

//   useEffect(() => {
//     fetchRootCoordinates();
//   }, []);

//   const onUnmount = React.useCallback(function callback(map) {
//     setMap(null);
//   }, []);

//   return isLoaded ? (
//     <GoogleMap
//       mapContainerStyle={containerStyle}
//       center={center}
//       zoom={7}
//     //   onLoad={onLoad}
//       onUnmount={onUnmount}
//     >
//       {/* Markers for Bhopal and Indore */}
//       <Marker position={{ lat: 23.2599, lng: 77.4126 }} />
//       <Marker position={{ lat: 22.7196, lng: 75.8577 }} />

//       {/* Polyline for root */}
//       <Polyline
//         path={rootCoordinates}
//         options={{
//           strokeColor: "#0000FF",
//           strokeOpacity: 1,
//           strokeWeight: 2,
//         }}
//       />

//       {/* Display the distance */}
//       {distance && (
//         <div
//           style={{
//             position: "absolute",
//             top: "10px",
//             left: "10px",
//             backgroundColor: "white",
//             padding: "10px",
//             borderRadius: "5px",
//             boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.5)",
//           }}
//         >
//           Distance between Bhopal and Indore: {distance} km
//         </div>
//       )}
//     </GoogleMap>
//   ) : (
//     <></>
//   );
// }

// export default MyComponent;
