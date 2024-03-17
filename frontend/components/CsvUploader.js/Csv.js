"use cliem";
import React, { useState } from "react";
import csvtojson from "csvtojson";
import { useDispatch } from "react-redux";
import { uploadData } from "@/store/Action/Auth";

function CSVUploader() {
  const [jsonData, setJsonData] = useState(null);
  const dispatch = useDispatch();

  const handleFileUpload = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    
    if (!file) {
      console.error("No file selected.");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      const jsonArray = await csvtojson().fromString(text);
      setJsonData(jsonArray);
      dispatch(uploadData(jsonArray));
    };

    reader.readAsText(file);
  };

  return (
    <div>
      <form onSubmit={handleFileUpload} className="flex flex-col gap-2">
        <input
          type="file"
          accept=".csv"
          name="files"
          className="file-input file-input-bordered w-full max-w-xs"
          onChange={handleFileUpload} // Ensure that onChange is set
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CSVUploader;
