import { Avatar, Box, Button, Divider, Grid, IconButton } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { request } from "../api/Request";
import defaultAvatar from '../assets/defaultAvatar.svg';

const Users = () => {

    const { currentUser } = useContext(AppContext)
    const [users, setUsers] = useState([])

    const getUsers = async () => {
        const result = await request('users', 'GET')
        setUsers(result)
    }
    useEffect(() => {
        getUsers()
    }, [])

    const makeAdmin = async (user) => {
        if (user.role !== 'admin') {
            user.role = 'admin'
            await request('update-user', 'PUT', user)
            getUsers()
        }
    }

    return (
        <Box width={'100%'} color={'white'} backgroundColor={'background.paper'} borderRadius={1}>
            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} paddingX={3}>
                <h2>Users</h2>
            </Box>
            <Divider />
            {users.map((user, index) => {
                if (user._id !== currentUser._id) {
                    return <Grid container key={index} height={100} display={"flex"} alignItems={"center"} paddingX={2}>
                        <Grid item xs={2.4}>
                            <IconButton>
                                <Avatar src={user.profilePicture ? user.profilePicture : defaultAvatar} alt='Profile Picture' />
                            </IconButton>
                        </Grid>
                        <Grid item xs={2.4}>{user.username}</Grid>
                        <Grid item xs={2.4}>{user.email}</Grid>
                        <Grid item xs={2.4}>{user.role}</Grid>
                        <Grid item xs={2.4}>
                            <Button onClick={() => { makeAdmin(user) }} variant="contained">Make Admin</Button>
                        </Grid>
                    </Grid>
                }
            })}
        </Box>
    )
}

export default Users