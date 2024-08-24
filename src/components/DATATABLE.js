import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateRow, addRow } from "../redux/actions/csvActions";
import { logout } from "../redux/actions/authActions";
import "./DataTable.css";

const DataTable = () => {
  const data = useSelector((state) => state.csv?.data || []);
  const dispatch = useDispatch();
  const [newRow, setNewRow] = useState({});
  const [editedRows, setEditedRows] = useState({});
  const [errors, setErrors] = useState({});
  const [showAddRow, setShowAddRow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Function to exclude the ID column
  const normalizeRowData = (data) => {
    if (data.length === 0) return data;
    const headers = Object.keys(data[0]).filter((header) => header !== "id"); // Exclude 'id' column
    return data.map((row) => {
      const normalizedRow = {};
      headers.forEach((header) => {
        normalizedRow[header] = row[header] || "";
      });
      return normalizedRow;
    });
  };

  const normalizedData = normalizeRowData(data);
  const totalPages = Math.ceil(normalizedData.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = normalizedData.slice(indexOfFirstRow, indexOfLastRow);

  const validateRow = (row) => {
    const newErrors = {};
    Object.entries(row).forEach(([key, value]) => {
      if (typeof value === "string" && !value.trim()) {
        newErrors[key] = `${key} cannot be empty`;
      }
    });
    return newErrors;
  };

  const handleInputChange = (e, rowIndex, key) => {
    const updatedRow = {
      ...editedRows[rowIndex],
      [key]: e.target.value,
    };

    setEditedRows((prev) => ({
      ...prev,
      [rowIndex]: updatedRow,
    }));
  };

  const handleSaveRow = (rowIndex) => {
    if (editedRows[rowIndex]) {
      const updatedRow = { ...data[rowIndex], ...editedRows[rowIndex] };
      const validationErrors = validateRow(updatedRow);
      if (Object.keys(validationErrors).length === 0) {
        dispatch(updateRow(rowIndex, updatedRow));
        setEditedRows((prev) => {
          const newEditedRows = { ...prev };
          delete newEditedRows[rowIndex];
          return newEditedRows;
        });
        setErrors({});
      } else {
        setErrors(validationErrors);
      }
    }
  };

  const handleNewRowChange = (e, key) => {
    setNewRow({
      ...newRow,
      [key]: e.target.value,
    });

    const updatedErrors = validateRow({
      ...newRow,
      [key]: e.target.value,
    });
    setErrors(updatedErrors);
  };

  const handleAddRow = () => {
    const validationErrors = validateRow(newRow);
    if (Object.keys(validationErrors).length === 0) {
      dispatch(addRow(newRow));
      setNewRow({});
      setErrors({});
      setShowAddRow(false);
    }
  };

  const isAddRowButtonVisible =
    Object.keys(errors).length === 0 &&
    Object.keys(newRow).length > 0 &&
    Object.keys(normalizedData[0] || {}).length === Object.keys(newRow).length;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="table-container">
      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
      <table className="styled-table">
        <thead>
          <tr>
            {normalizedData.length > 0 &&
              Object.keys(normalizedData[0]).map((header) => (
                <th key={header}>{header}</th>
              ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row, rowIndex) => {
            const globalIndex = indexOfFirstRow + rowIndex;
            return (
              <tr key={globalIndex}>
                {Object.entries(row).map(([key, value]) => (
                  <td key={key}>
                    <input
                      type="text"
                      value={
                        editedRows[globalIndex]?.[key] !== undefined
                          ? editedRows[globalIndex][key]
                          : value
                      }
                      onChange={(e) => handleInputChange(e, globalIndex, key)}
                      className={`input-field ${errors[key] ? "error" : ""}`}
                    />
                    {errors[key] && (
                      <div className="error-message">{errors[key]}</div>
                    )}
                  </td>
                ))}
                <td>
                  <button
                    onClick={() => handleSaveRow(globalIndex)}
                    className="save-btn"
                  >
                    Save
                  </button>
                </td>
              </tr>
            );
          })}
          {showAddRow && (
            <tr>
              {normalizedData.length > 0 &&
                Object.keys(normalizedData[0]).map((key) => (
                  <td key={key}>
                    <input
                      type="text"
                      value={newRow[key] || ""}
                      onChange={(e) => handleNewRowChange(e, key)}
                      placeholder={`Enter ${key}`}
                      className={`input-field ${errors[key] ? "error" : ""}`}
                    />
                    {errors[key] && (
                      <div className="error-message">{errors[key]}</div>
                    )}
                  </td>
                ))}
              <td>
                {isAddRowButtonVisible && (
                  <button onClick={handleAddRow} className="add-row-btn">
                    Add
                  </button>
                )}
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {normalizedData.length > 0 && !showAddRow && (
        <button
          onClick={() => setShowAddRow(true)}
          className="show-add-row-btn"
        >
          Add New Row
        </button>
      )}
      <div className="pagination-controls">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-btn"
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`pagination-btn ${
              currentPage === index + 1 ? "active" : ""
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-btn"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DataTable;
