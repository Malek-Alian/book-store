import { Avatar, Button, Grid, IconButton } from "@mui/material";
import { downloadRequest, request } from "../api/Request";
import defaultAvatar from '../assets/defaultAvatar.svg';
import { useEffect } from "react";
import { useState } from "react";

const User = ({ user, getUsers }) => {

    const [userProfilePicture, setUserProfilePicture] = useState('')

    const getUserProfilePicture = async () => {
        const profilePicture = await downloadRequest(`download/${user.profilePicture}`, 'GET', true)
        setUserProfilePicture(window.URL.createObjectURL(profilePicture))
    }
    useEffect(() => {
        getUserProfilePicture()
    }, [])

    const makeAdmin = async (user) => {
        user.role = 'admin'
        await request('update-user', 'PUT', user)
        getUsers()
    }

    return (
        <Grid container height={100} display={"flex"} alignItems={"center"} paddingX={2}>
            <Grid item xs={2.4}>
                <IconButton>
                    <Avatar src={userProfilePicture ? userProfilePicture : defaultAvatar} alt='Profile Picture' />
                </IconButton>
            </Grid>
            <Grid item xs={2.4}>{user.username}</Grid>
            <Grid item xs={2.4}>{user.email}</Grid>
            <Grid item xs={2.4}>{user.role}</Grid>
            <Grid item xs={2.4}>
                <Button disabled={user.role === 'admin'} onClick={() => { makeAdmin(user) }} variant="contained">Make Admin</Button>
            </Grid>
        </Grid>
    )
}

export default User