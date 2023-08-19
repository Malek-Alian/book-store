import SearchIcon from '@mui/icons-material/Search';
import { AppBar, Avatar, Box, Divider, Grid, IconButton, InputBase, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import { request } from '../api/Request';
import defaultAvatar from '../assets/defaultAvatar.svg';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

const TheAppBar = () => {

    const navigate = useNavigate()
    const { setIsSigned, currentUser, setCurrentUser, xxs, lg, _1000, rightMenu, setRightMenu, setPageMenuOpen, currentTotalPrice } = useContext(AppContext)
    const [openMenu, setOpenMenu] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)

    const signOut = async () => {
        let result = await request('sign-out', 'POST', currentUser)
        if (result.success) {
            localStorage.removeItem('token')
        }
        setCurrentUser({})
        setIsSigned(false)
        setOpenMenu(false)
        navigate('/login', { replace: true })
    }
    const handleRightMenu = () => {
        setRightMenu(!rightMenu)
    }

    return (
        <>
            <AppBar position="sticky" sx={{ top: 0, height: 90, backgroundColor: 'background.default', color: 'white', paddingX: 3 }}>
                <Grid container width={'100%'} height={'100%'} alignItems={'center'}>
                    <Grid item xs={2} display={'flex'}>
                        {lg ? <h3>Shop</h3>
                            : <Box display={'flex'} alignItems={'center'} color={'text.secondary'}>
                                <IconButton onClick={() => { setPageMenuOpen(true) }}>
                                    <MenuIcon sx={{ color: 'text.secondary' }} fontSize="large" />
                                </IconButton>
                                <img src='https://templates.iqonic.design/booksto/html-dark/images/logo.png' alt="Logo" width={45} height={50} />
                                <h2 style={{ marginLeft: 5, }}>BookStore</h2>
                            </Box>
                        }
                    </Grid>
                    <Grid item xs={7} display={'flex'} justifyContent={'center'}>
                        {_1000 && <Box backgroundColor={'background.paper'} width={400}>
                            <IconButton>
                                <SearchIcon sx={{ color: 'white' }} />
                            </IconButton>
                            <InputBase placeholder='Search Here...' />
                        </Box>}
                    </Grid>
                    <Grid item xs={3} display={'flex'} justifyContent={!_1000 ? 'end' : 'space-evenly'}>
                        {xxs && currentUser.role === 'user' && <Box display={'flex'} alignItems={'center'}>
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
                        {_1000 ? <Box display={'flex'}>
                            <Tooltip title='User Settings'>
                                <IconButton onClick={(e) => { setOpenMenu(true); setAnchorEl(e.currentTarget) }}>
                                    <Avatar sx={{ width: 55, height: 55 }} src={currentUser.profilePicture ? currentUser.profilePicture : defaultAvatar} alt='Profile Picture' />
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
                            : <IconButton onClick={() => { handleRightMenu() }}>
                                <MenuOpenIcon sx={{ color: 'text.secondary' }} fontSize="large" />
                            </IconButton>}
                    </Grid>
                </Grid>
            </AppBar>
            <Divider />
        </>
    )
}

export default TheAppBar