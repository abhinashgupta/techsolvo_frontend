import { useSelector } from "react-redux";
import Papa from "papaparse";

const ExportCSV = () => {
  const data = useSelector((state) => state.csv?.data || []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const handleExport = () => {
    // Filter out empty rows (rows where all values are empty)
    const filteredData = data.filter((row) =>
      Object.values(row).some((value) => value !== "")
    );

    // Exclude the 'id' column
    const cleanedData = filteredData.map(({ id, ...rest }) => rest);

    // Convert filtered data to CSV
    const csv = Papa.unparse(cleanedData);

    // Trigger download
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button onClick={handleExport} className="export-btn">
      Export CSV
    </button>
  );
};

export default ExportCSV;
