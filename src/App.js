import { Grid, ThemeProvider, useMediaQuery } from "@mui/material";
import { createContext, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./services/Login/Login";
import Theme from "./services/Theme";
import Welcome from "./services/Welcome/Welcome";
import Menu from "./components/Menu";
import TheAppBar from "./components/TheAppBar";
export const AppContext = createContext()

function App() {

  // themes, heights, radius, width, folders, 
  const [isSigned, setIsSigned] = useState(true)
  const [currentUser, setCurrentUser] = useState({})
  const [pageMenuOpen, setPageMenuOpen] = useState(true)
  const [hover, setHover] = useState(false)

  const xs = useMediaQuery('(min-width:600px)')
  const sm = useMediaQuery('(min-width:900px)')
  const md = useMediaQuery('(min-width:1200px)')
  const lg = useMediaQuery('(min-width:1500px)')

  return (
    <AppContext.Provider value={{ xs, sm, md, lg, isSigned, setIsSigned, currentUser, setCurrentUser, pageMenuOpen, setPageMenuOpen, hover, setHover }}>
      <ThemeProvider theme={Theme}>
        {isSigned && <Grid container width={'100vw'} height={'100vh'} backgroundColor={'background.default'}>
          <Grid item xs={pageMenuOpen ? 2 : 0.5}><Menu /></Grid>
          <Grid item xs={pageMenuOpen ? 10 : 11.5}>
            <Grid container>
              <Grid item xs={12}>
                <TheAppBar />
              </Grid>
              <Grid item xs={12} padding={2} display={"flex"} justifyContent={"center"}>
                <Routes>
                  <Route path="/a" element={<Welcome />} />
                  <Route path="/login" element={isSigned ? <Navigate to={'/home'} /> : <Login />} />
                  <Route path="/home" element={<Home />} />
                </Routes>
              </Grid>
            </Grid>
          </Grid>
        </Grid>}
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
