import Main from "./main";
import {  BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./product";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  return (
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/products/:_id" element={<Product />} />
        <Route path="/page/:page" element={<Main />} />
      </Routes>
    </BrowserRouter >
  );
}

export default App;
