import { AppBar, Avatar, Box, Divider, Grid, IconButton, InputBase, Menu, MenuItem, Tooltip } from '@mui/material';
import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import defaultAvatar from '../assets/defaultAvatar.svg';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { request } from '../api/Request';

const TheAppBar = () => {

    const navigate = useNavigate()
    const { setIsSigned, currentUser, setCurrentUser } = useContext(AppContext)
    const [openMenu, setOpenMenu] = useState(false)

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
                    <Grid item xs={8} display={'flex'} justifyContent={'center'}>
                        <Box backgroundColor={'background.paper'} width={400}>
                            <IconButton>
                                <SearchIcon sx={{ color: 'white' }} />
                            </IconButton>
                            <InputBase placeholder='Search Here...' />
                        </Box>
                    </Grid>
                    <Grid item xs={2} display={'flex'}>
                        <Tooltip title='User Settings'>
                            <IconButton onClick={() => { setOpenMenu(!openMenu) }}>
                                <Avatar src={currentUser.profilePicture ? currentUser.profilePicture : defaultAvatar} alt='Profile Picture' />
                            </IconButton>
                        </Tooltip>
                        <Menu sx={{ backgroundColor: 'red', width: 200 }} open={openMenu} onClose={() => { setOpenMenu(false) }}>
                            <MenuItem onClick={() => { signOut() }}>a</MenuItem>
                        </Menu>
                        <h2>{currentUser.username}</h2>
                    </Grid>
                </Grid>
            </AppBar>
            <Divider />
        </>
    )
}

export default TheAppBar