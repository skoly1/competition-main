import { RouterProvider } from "react-router-dom";
import { router as indexRouter } from "./pages/index";
import "./App.css";

function App() {
  return (
    <>
      <RouterProvider router={indexRouter} />
    </>
  );
}

export default App;
