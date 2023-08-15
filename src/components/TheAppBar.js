import SearchIcon from '@mui/icons-material/Search';
import { AppBar, Avatar, Box, Divider, Grid, IconButton, InputBase, Menu, MenuItem, Tooltip } from '@mui/material';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import { request } from '../api/Request';
import defaultAvatar from '../assets/defaultAvatar.svg';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import FavoriteIcon from '@mui/icons-material/Favorite';

const TheAppBar = () => {

    const navigate = useNavigate()
    const { setIsSigned, currentUser, setCurrentUser } = useContext(AppContext)
    const [openMenu, setOpenMenu] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)

    const signOut = async () => {
        let result = await request('sign-out', 'POST', currentUser)
        if (result.success) {
            localStorage.removeItem('token')
        }
        setCurrentUser({})
        setIsSigned(false)
        navigate('/login', { replace: true })
    }

    return (
        <>
            <AppBar position="sticky" sx={{ top: 0, height: 90, backgroundColor: 'background.default', color: 'white', paddingX: 3 }}>
                <Grid container width={'100%'} height={'100%'} alignItems={'center'}>
                    <Grid item xs={2} display={'flex'}>
                        <h3>Shop</h3>
                    </Grid>
                    <Grid item xs={7} display={'flex'} justifyContent={'center'}>
                        <Box backgroundColor={'background.paper'} width={400}>
                            <IconButton>
                                <SearchIcon sx={{ color: 'white' }} />
                            </IconButton>
                            <InputBase placeholder='Search Here...' />
                        </Box>
                    </Grid>
                    <Grid item xs={3} display={'flex'} justifyContent={'space-evenly'}>
                        <Box display={'flex'} alignItems={'center'}>
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
                        </Box>
                        <Box display={'flex'}>
                            <Tooltip title='User Settings'>
                                <IconButton onClick={(e) => { setOpenMenu(true); setAnchorEl(e.currentTarget) }}>
                                    <Avatar src={currentUser.profilePicture ? currentUser.profilePicture : defaultAvatar} alt='Profile Picture' />
                                </IconButton>
                            </Tooltip>
                            <Menu anchorEl={anchorEl} sx={{ width: 200 }} open={openMenu} onClose={() => { setOpenMenu(false) }}>
                                <MenuItem sx={{ border: '1px solid white' }} onClick={() => { }}>Profile</MenuItem>
                                <MenuItem sx={{ border: '1px solid white' }} onClick={() => { signOut() }}>Sign Out</MenuItem>
                            </Menu>
                            <h2>{currentUser.username}</h2>
                        </Box>
                    </Grid>
                </Grid>
            </AppBar>
            <Divider />
        </>
    )
}

export default TheAppBar