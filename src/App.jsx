import { RouterProvider } from "react-router-dom"
import router from "./routes"
import { useState } from "react";
import createRouter from "./routes";

function App() {
  const [user, setUser] = useState(null);
  debugger
  const logout = () => {
    setUser(null);
  }

  const router = createRouter({user, setUser, logout});

  return (
    <RouterProvider router={router} />
  )
}

export default App
