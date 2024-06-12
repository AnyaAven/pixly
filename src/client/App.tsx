import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL || "http://localhost:3001/";

export default function App() {
  const [test, setTest] = useState<Record<string, string>>({});

  // useEffect(
  //   function getTest() {

  //     async function fetchTest() {
  //       const resp = await fetch(BASE_URL);
  //       const data: { KEY: string; } = await resp.json();

  //       setTest(data);
  //     }

  //     fetchTest();
  //   }, []
  // );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div>
            first page

            <form action={`${BASE_URL}upload`} encType="multipart/form-data" method="post">
              <div className="form-group">
                <input type="file" className="form-control-file" name="uploaded_file" />
                <input type="text" className="form-control" placeholder="Number of speakers" name="nspeakers" />
                <input type="submit" value="Get me the stats!" className="btn btn-default" />
              </div>
            </form>

          </div>
        }
        />
      </Routes>
    </BrowserRouter>
  );
}
