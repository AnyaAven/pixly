import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL || "http://localhost:3001/";

export default function App() {
  const [test, setTest] = useState <Record<string, string>>({})

  useEffect(
    function getTest(){

      async function fetchTest(){
        const resp = await fetch(BASE_URL)
        const data: {KEY: string} = await resp.json()

        setTest(data);
      }

      fetchTest();
    }, []
  )

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div>
            first page
            { "KEY" in test && <div>{test.KEY}</div>}
          </div>}
          />
      </Routes>
    </BrowserRouter>
  );
}
