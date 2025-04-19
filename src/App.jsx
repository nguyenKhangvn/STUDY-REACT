import { RouterProvider } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import createRouter from "./routes";

function App() {
  const [user, setUser] = useState(null);
  const router = createRouter({ user, setUser });
  return <RouterProvider router={router} />;
}

export default App;
