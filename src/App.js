import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from "./redux/store";
import Signup from "./components/Signup";
import Login from "./components/Login";
import CSVUPLOAD from "./components/CSVUPLOAD";
import DATATABLE from "./components/DATATABLE";
import CSVEXPORT from "./components/CSVEXPORT";
import ProtectedRoute from "./components/ProtectedRoute";
import FileSelector from "./components/FileSelector";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <h1>CSV Parser and Exporter</h1>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <FileSelector />
                  <CSVUPLOAD />
                  <DATATABLE />
                  <CSVEXPORT />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
