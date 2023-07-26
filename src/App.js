import { Route, Routes } from "react-router-dom";
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import { useMediaQuery } from "@mui/material";
import { createContext } from "react";
export const AppContext = createContext()

function App() {

  const xs = useMediaQuery('(min-width:600px)')
  const sm = useMediaQuery('(min-width:900px)')
  const md = useMediaQuery('(min-width:1200px)')
  const lg = useMediaQuery('(min-width:1500px)')

  return (
    <AppContext.Provider value={{ xs, sm, md, lg }}>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
