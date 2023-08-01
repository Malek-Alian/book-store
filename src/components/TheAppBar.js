import { AppBar, Avatar, Box, Grid, IconButton, InputBase, Tooltip } from '@mui/material';
import React, { useContext } from 'react';
import { AppContext } from '../App';
import defaultAvatar from '../assets/defaultAvatar.svg';
import SearchIcon from '@mui/icons-material/Search';

const TheAppBar = () => {

    const { currentUser } = useContext(AppContext)

    return (
        <AppBar position="sticky" sx={{ top: 0, height: 100, backgroundColor: 'inherit', color: 'white', borderBottom: 1 }}>
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
                        <IconButton>
                            <Avatar src={currentUser.profilePicture ? currentUser.profilePicture : defaultAvatar} alt='Profile Picture' />
                        </IconButton>
                    </Tooltip>
                    <h2>{currentUser.name}</h2>
                </Grid>
            </Grid>
        </AppBar>
    )
}

export default TheAppBar