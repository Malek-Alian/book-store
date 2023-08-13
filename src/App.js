import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Hidden, ThemeProvider, useMediaQuery } from "@mui/material";
import { createContext, useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./components/Menu";
import TheAppBar from "./components/TheAppBar";
import Books from "./pages/Books";
import Login from "./services/Login/Login";
import Theme from "./services/Theme";
import Welcome from "./services/Welcome/Welcome";
import AddBook from "./pages/AddBook";
import { request } from "./api/Request";
import EditBook from "./components/EditBook";
import Signup from "./services/Signup/Signup";
export const AppContext = createContext()

function App() {

  // themes, heights, radius, width, folders, 
  const [isSigned, setIsSigned] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  const [pageMenuOpen, setPageMenuOpen] = useState(true)
  const [hover, setHover] = useState(false)
  const [sessionDialog, setSessionDialog] = useState(false)

  const xs = useMediaQuery('(min-width:600px)')
  const sm = useMediaQuery('(min-width:900px)')
  const md = useMediaQuery('(min-width:1200px)')
  const lg = useMediaQuery('(min-width:1500px)')

  const navigate = useNavigate()

  useEffect(() => {
    const getUser = async () => {
      let result = await request('checkUser', 'POST')
      if (result.success) {
        setCurrentUser(result.data)
        setIsSigned(true)
      } else if (result.status === 409) {
        setSessionDialog(true)
      } else {
        navigate('/login', { replace: true })
      }
    }
    getUser()
  }, [])

  const goToLogin = () => {
    setSessionDialog(false)
    navigate('/login', { replace: true })
  }

  return (
    <AppContext.Provider value={{ xs, sm, md, lg, isSigned, setIsSigned, currentUser, setCurrentUser, pageMenuOpen, setPageMenuOpen, hover, setHover }}>
      <ThemeProvider theme={Theme}>
        {sessionDialog && <Box height={'100vh'} backgroundColor={'background.default'}>
          <Dialog sx={{ textAlign: 'center' }} open={sessionDialog}>
            <DialogContent>
              <h2>Your session has been expired</h2>
              <h2>Please login</h2>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center' }}>
              <Button onClick={() => { goToLogin() }} sx={{ marginY: 2, width: 300 }} variant="contained">Login</Button>
            </DialogActions>
          </Dialog>
        </Box>}
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
                  <Route path="/books/edit-book" element={<EditBook />} />
                </Routes>
              </Grid>
            </Grid>
          </Grid>
        </Grid> :
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={isSigned ? <Navigate to={'/home'} /> : <Login />} />
            <Route path="/signup" element={isSigned ? <Navigate to={'/home'} /> : <Signup />} />
          </Routes>
        }
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
