// components/Map.js
import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";

const Map = ({ points }) => {
  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoidW1lc2hvbTA5IiwiYSI6ImNsdHYxNThkdjFlNHYyanVsZnJ6amI3d2IifQ.Fex_RiQ0h1I5JrZ7SUVMPA";
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [77.4126, 23.2599], 
      zoom: 7,
    });

    // Add points to the map
    points.forEach((point) => {
       
      new mapboxgl.Marker()
        .setLngLat(point.coordinates)
        .setPopup(new mapboxgl.Popup().setHTML("<h3>" + point.name + "</h3>"))
        .addTo(map);
    });

    // Clean up
    return () => map.remove();
  }, [points]);

  return <div id="map" style={{ width: "100%", height: "100vh" }} />;
};

export default Map;
