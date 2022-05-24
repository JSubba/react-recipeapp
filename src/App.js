import Pages from "./Pages/Pages";
import "./App.css";
import Category from "./components/Category";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Category />
      <Pages />
    </BrowserRouter>
  );
}

export default App;
