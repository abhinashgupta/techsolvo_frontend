import React from "react";
import { useDispatch } from "react-redux";
import { parseCSV, uploadCSVData } from "../redux/actions/csvActions";

const CSVUPLOAD = () => {
  const dispatch = useDispatch();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      dispatch(parseCSV(file));
      dispatch(uploadCSVData(file));
    }
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
    </div>
  );
};

export default CSVUPLOAD;
