import { Avatar, Button, Divider, Grid, IconButton } from "@mui/material";
import { downloadRequest, request } from "../api/Request";
import defaultAvatar from '../assets/defaultAvatar.svg';
import { useContext, useEffect } from "react";
import { useState } from "react";
import { AppContext } from "../App";

const User = ({ user, getUsers }) => {

    const [userProfilePicture, setUserProfilePicture] = useState('')
    const { xs } = useContext(AppContext)

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
        <>
            <Grid container padding={3} display={"flex"} alignItems={"center"} textAlign={"center"} paddingX={2}>
                <Grid item lg={2.4} md={3} sm={4} xs={12} marginY={!xs && 2}>
                    <IconButton>
                        <Avatar src={userProfilePicture ? userProfilePicture : defaultAvatar} alt='Profile Picture' />
                    </IconButton>
                </Grid>
                <Grid item lg={2.4} md={3} sm={4} xs={12} marginY={!xs && 2}>{user.username}</Grid>
                <Grid item lg={2.4} md={3} sm={4} xs={12} marginY={!xs && 2}>{user.email}</Grid>
                <Grid item lg={2.4} md={3} sm={4} xs={12} marginY={!xs && 2}>{user.role}</Grid>
                <Grid item lg={2.4} md={3} sm={4} xs={12} marginY={!xs && 2}>
                    <Button disabled={user.role === 'admin'} onClick={() => { makeAdmin(user) }} variant="contained">Make Admin</Button>
                </Grid>
            </Grid>
            <Divider />
        </>
    )
}

export default User