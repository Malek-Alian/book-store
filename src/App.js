import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, Grid, IconButton, Menu, MenuItem, Slide, ThemeProvider, Tooltip, Typography, useMediaQuery } from "@mui/material";
import { createContext, useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { downloadRequest, request } from "./api/Request";
import SideMenu from "./components/SideMenu";
import TheAppBar from "./components/TheAppBar";
import AddBook from "./pages/AddBook";
import Books from "./pages/Books";
import Cart from "./pages/Cart";
import EditBook from "./pages/EditBook";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import Users from "./pages/Users";
import Login from "./services/Login/Login";
import Signup from "./services/Signup/Signup";
import Theme from "./services/Theme";
import Welcome from "./services/Welcome/Welcome";
import defaultAvatar from './assets/defaultAvatar.svg';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";

export const AppContext = createContext()

function App() {

  const xxs = useMediaQuery('(min-width:450px)')
  const xs = useMediaQuery('(min-width:600px)')
  const _700 = useMediaQuery('(min-width:700px)')
  const sm = useMediaQuery('(min-width:900px)')
  const _1000 = useMediaQuery('(min-width:1000px)')
  const md = useMediaQuery('(min-width:1200px)')
  const _1300 = useMediaQuery('(min-width:1300px)')
  const lg = useMediaQuery('(min-width:1500px)')

  const [isSigned, setIsSigned] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  const [profilePicture, setProfilePicture] = useState('')
  const [pageMenuOpen, setPageMenuOpen] = useState(lg ? true : false)
  const [hover, setHover] = useState(false)
  const [sessionDialog, setSessionDialog] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [rightMenu, setRightMenu] = useState(false)
  const [currentTotalPrice, setCurrentTotalPrice] = useState(0)

  const navigate = useNavigate()

  const getUser = async () => {
    let result = await request('checkUser', 'POST')
    if (result.success) {
      const profilePicture = await downloadRequest(`download/${result.data.profilePicture}`, 'GET', true)
      setProfilePicture(window.URL.createObjectURL(profilePicture))
      setCurrentUser(result.data)
      setIsSigned(true)
    } else if (result.status === 409) {
      setSessionDialog(true)
      localStorage.removeItem('token')
    } else {
      navigate('/', { replace: true })
    }
  }

  useEffect(() => {
    getUser()
    if (currentUser.role === 'user' && localStorage.getItem('cart')) {
      let cart = JSON.parse(localStorage.getItem('cart'))
      let total = cart.reduce((sum, item) => sum + item.price, 0)
      setCurrentTotalPrice(total)
    }
  }, [])

  const goToLogin = () => {
    setSessionDialog(false)
    navigate('/login', { replace: true })
  }
  const signOut = async () => {
    let result = await request('sign-out', 'POST', currentUser)
    if (result.success) {
      localStorage.removeItem('token')
    }
    setCurrentUser({})
    setIsSigned(false)
    setOpenMenu(false)
    navigate('/', { replace: true })
  }

  return (
    <AppContext.Provider value={{ xxs, xs, sm, md, lg, _700, _1000, _1300, isSigned, setIsSigned, currentUser, setCurrentUser, pageMenuOpen, setPageMenuOpen, hover, setHover, setRightMenu, rightMenu, currentTotalPrice, setCurrentTotalPrice, getUser, profilePicture, setProfilePicture }}>
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
          {(lg || pageMenuOpen) && <Grid item xs={(pageMenuOpen && !lg) ? 0 : pageMenuOpen ? 2 : 0.5}><SideMenu absolute={pageMenuOpen && !lg} /></Grid>}
          <Grid item xs={!lg ? 12 : pageMenuOpen ? 10 : 11.5}>
            <Grid container>
              <Grid zIndex={1} item xs={12} position={'sticky'} top={0}>
                <TheAppBar />
                <Slide in={rightMenu}>
                  <Box position={"absolute"} height={100} width={'100%'} color={"white"} backgroundColor={'background.paper'}>
                    <Box display={"flex"} alignItems={"center"} justifyContent={!xxs ? 'space-evenly' : 'flex-end'} height={'100%'} paddingX={3}>
                      {!xxs && currentUser.role === 'user' && <Box display={'flex'} alignItems={'center'}>
                        <Tooltip title='Cart Books'>
                          <IconButton onClick={() => { navigate('/cart') }}>
                            <ShoppingCartCheckoutIcon fontSize='large' color='primary' />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title='Favorite Books'>
                          <IconButton onClick={() => { navigate('/favorites') }}>
                            <FavoriteIcon fontSize='large' color='secondary' />
                          </IconButton>
                        </Tooltip>
                      </Box>}
                      <Tooltip title='User Settings'>
                        <IconButton onClick={(e) => { setOpenMenu(true); setAnchorEl(e.currentTarget) }}>
                          <Avatar sx={{ width: 55, height: 55 }} src={profilePicture ? profilePicture : defaultAvatar} alt='Profile Picture' />
                        </IconButton>
                      </Tooltip>
                      <Menu anchorEl={anchorEl} sx={{ width: 200 }} open={openMenu} onClose={() => { setOpenMenu(false) }}>
                        <MenuItem sx={{ border: '1px solid white' }} onClick={() => { navigate('/profile'); setOpenMenu(false) }}>Profile</MenuItem>
                        <MenuItem sx={{ border: '1px solid white' }} onClick={() => { signOut() }}>Sign Out</MenuItem>
                      </Menu>
                      <Box display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                        <Typography fontSize={20} fontWeight={'bold'}>{currentUser.username}</Typography>
                        <Typography color={'text.secondary'}>${currentTotalPrice}</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Slide>
              </Grid>
              <Grid item xs={12} padding={3} display={"flex"} flexDirection={"column"} justifyContent={"center"}>
                <Routes>
                  <Route path="/home" element={<Home />} />
                  <Route path="/books" element={<Books />} />
                  <Route path="/books/add-book" element={<AddBook />} />
                  <Route path="/books/edit-book" element={<EditBook />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/categories" element={<Categories />} />
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
