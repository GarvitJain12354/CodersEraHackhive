import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import axios from "axios";

// Replace with your Mapbox access token
mapboxgl.accessToken = "pk.eyJ1IjoidW1lc2hvbTA5IiwiYSI6ImNsdHYxNThkdjFlNHYyanVsZnJ6amI3d2IifQ.Fex_RiQ0h1I5JrZ7SUVMPA";

function MapWithRoute() {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const originCoordinates = [77.4126, 23.2599];
        const destinationCoordinates = [75.8573, 22.7196]; 

        const directionsResponse = await axios.get(
          "https://api.mapbox.com/directions/v5/mapbox/driving/" +
          `${originCoordinates[0]},${originCoordinates[1]};${destinationCoordinates[0]},${destinationCoordinates[1]}`,
          {
            params: {
              geometries: "geojson",
              access_token: "pk.eyJ1IjoidW1lc2hvbTA5IiwiYSI6ImNsdHYxNThkdjFlNHYyanVsZnJ6amI3d2IifQ.Fex_RiQ0h1I5JrZ7SUVMPA",
            },
          }
        );

        const routeGeoJSON = directionsResponse.data.routes[0].geometry;

        // Initialize Mapbox map
        const map = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: "mapbox://styles/mapbox/streets-v11",
          center: originCoordinates,
          zoom: 8,
        });

        // Add route layer to the map
        map.on("load", () => {
          map.addLayer({
            id: "route",
            type: "line",
            source: {
              type: "geojson",
              data: {
                type: "Feature",
                properties: {},
                geometry: routeGeoJSON,
              },
            },
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            paint: {
              "line-color": "black",
              "line-width": 8,
            },
          });
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div ref={mapContainerRef} style={{ width: "100%", height: "100%" }} />
  );
}

export default MapWithRoute;
