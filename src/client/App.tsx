import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div>
            first page
          </div>} />
      </Routes>
    </BrowserRouter>
  );
}
