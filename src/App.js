import "./App.css";
import React, { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Carts from "./components/Carts";

function App() {
  return (
    <>
      <div>
        <Carts></Carts>
      </div>
    </>
  );
}

export default App;
