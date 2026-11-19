import { RouterProvider } from "react-router";
import { router } from "./router";

function App() {
  return (
    <>
      {/* Toasters ... */}

      <RouterProvider router={router} />
    </>
  );
}

export default App;
