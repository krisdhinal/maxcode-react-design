import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRouter from "./routes/AppRouter";

const App = () => {
 

  return (
    <div className="App">
      <ToastContainer />
      <AppRouter />
    </div>
  );
};

export default App;
