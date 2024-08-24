import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCSVData } from "../redux/actions/csvActions";
import axiosInstance from "../axiosInstance";


const FileSelector = () => {
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {

    const fetchFiles = async () => {
      try {
        const response = await axiosInstance.get("/csv/files"); 
        setFiles(response.data);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchFiles();
  }, []);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    dispatch(fetchCSVData(file._id)); 
  };

  return (
    <div>
      <h3>Select a file to view:</h3>
      {files.map((file) => (
        <button key={file._id} onClick={() => handleFileSelect(file)}>
          {file.name} 
        </button>
      ))}
    </div>
  );
};

export default FileSelector;
