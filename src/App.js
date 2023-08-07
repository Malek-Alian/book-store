import { Grid, ThemeProvider, useMediaQuery } from "@mui/material";
import { createContext, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Menu from "./components/Menu";
import TheAppBar from "./components/TheAppBar";
import Books from "./pages/Books";
import Login from "./services/Login/Login";
import Theme from "./services/Theme";
import Welcome from "./services/Welcome/Welcome";
import AddBook from "./pages/AddBook";
export const AppContext = createContext()

function App() {

  // themes, heights, radius, width, folders, 
  const [isSigned, setIsSigned] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  const [pageMenuOpen, setPageMenuOpen] = useState(true)
  const [hover, setHover] = useState(false)
  const [books, setBooks] = useState([])

  const xs = useMediaQuery('(min-width:600px)')
  const sm = useMediaQuery('(min-width:900px)')
  const md = useMediaQuery('(min-width:1200px)')
  const lg = useMediaQuery('(min-width:1500px)')

  return (
    <AppContext.Provider value={{ xs, sm, md, lg, isSigned, setIsSigned, currentUser, setCurrentUser, pageMenuOpen, setPageMenuOpen, hover, setHover, books, setBooks }}>
      <ThemeProvider theme={Theme}>
        {isSigned ? <Grid sx={{ overflowX: 'hidden', '&::-webkit-scrollbar': { display: 'none' } }} container width={'100vw'} height={'100vh'} backgroundColor={'background.default'}>
          <Grid item xs={pageMenuOpen ? 2 : 0.5}><Menu /></Grid>
          <Grid item xs={pageMenuOpen ? 10 : 11.5}>
            <Grid container>
              <Grid zIndex={1} item xs={12} position={'sticky'} top={0}>
                <TheAppBar />
              </Grid>
              <Grid item xs={12} padding={3} display={"flex"} flexDirection={"column"} justifyContent={"center"}>
                <Routes>
                  <Route path="/home" element={<Home />} />
                  <Route path="/books" element={<Books />} />
                  <Route path="/books/add-book" element={<AddBook />} />
                </Routes>
              </Grid>
            </Grid>
          </Grid>
        </Grid> :
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={isSigned ? <Navigate to={'/home'} /> : <Login />} />
          </Routes>
        }
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
