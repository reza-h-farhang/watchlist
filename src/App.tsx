import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        toastOptions={{
          className: "bg-u-purple-50",
        }}
      />
    </>
  );
}

export default App;
