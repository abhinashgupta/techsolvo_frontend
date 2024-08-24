import Papa from "papaparse";
import axiosInstance from "../../axiosInstance";

export const uploadCSVData = (csvData) => async (dispatch) => {
  try {
    const response = await axiosInstance.post("/csv/upload", { data: csvData });
    dispatch({ type: "UPLOAD_SUCCESS", payload: response.data });
  } catch (error) {
    console.error("Error uploading CSV data:", error);
    dispatch({ type: "UPLOAD_FAIL", payload: error.message });
  }
};


export const parseCSV = (file) => (dispatch) => {
  Papa.parse(file, {
    header: true,
    complete: (result) => {
      const parsedData = result.data
        .filter((row) => Object.values(row).some((value) => value.trim())) 
        .map((row, index) => ({
          ...row,
          id: Date.now() + index, 
        }));
      dispatch({ type: "PARSE_CSV_SUCCESS", payload: parsedData });
    },
    error: (error) => {
      console.error("CSV Parsing Error:", error);
    },
  });
};

export const updateRow = (rowIndex, updatedRow) => {
  return {
    type: "UPDATE_ROW",
    payload: { rowIndex, updatedRow },
  };
};

export const addRow = (newRow) => {
  return {
    type: "ADD_ROW",
    payload: newRow,
  };
};

export const fetchCSVData = () => async (dispatch) => {
  try {
    const response = await axiosInstance.get("/csv/data");
    dispatch({ type: "FETCH_CSV_SUCCESS", payload: response.data });
  } catch (error) {
    console.error("Error fetching CSV data:", error);
    dispatch({ type: "FETCH_CSV_FAIL", payload: error.message });
  }
};

