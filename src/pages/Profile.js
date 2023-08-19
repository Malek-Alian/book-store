import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Avatar, Badge, Box, Button, Grid, IconButton, TextField } from "@mui/material";
import { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { AppContext } from "../App";
import { fileRequest, request } from "../api/Request";
import defaultAvatar from '../assets/defaultAvatar.svg';

const Profile = () => {

    const [edit, setEdit] = useState(false)
    const [passwordVisible, setPasswordVisible] = useState(false)
    const { currentUser, setCurrentUser, getUser } = useContext(AppContext)
    const { register, handleSubmit } = useForm({
        defaultValues: currentUser
    })
    const inputFile = useRef(null);

    const updateProfile = async (data) => {
        currentUser.username = data.username
        currentUser.email = data.email
        currentUser.password = data.password
        const updatedUser = await request('update-user', 'PUT', currentUser)
        setEdit(false)
        setCurrentUser(updatedUser)
    }
    const onAvatarClicked = () => {
        inputFile.current.click();
    }
    const onFileSelected = async (event) => {
        const selectedFile = event.target.files[0]
        const formData = new FormData()
        formData.append("folder", 'Profile Picture')
        formData.append("bookImage", selectedFile)
        const result = await fileRequest(`upload/${currentUser._id}`, 'POST', formData)
        currentUser.profilePicture = result.data._id
        const updatedUser = await request('update-user', 'PUT', currentUser)
        setCurrentUser(updatedUser)
        getUser()
    }

    return (
        <Box width={'100%'} color={'white'} backgroundColor={'background.paper'} display={"flex"} flexDirection={"column"} alignItems={"center"} paddingY={3}>
            <input type="file" onChange={onFileSelected} ref={inputFile} style={{ display: 'none' }} />
            <Badge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} badgeContent={
                <IconButton onClick={() => { onAvatarClicked() }} sx={{
                    backgroundColor: 'white',
                    '&:hover': {
                        backgroundColor: 'lightgray',
                    },
                }}>
                    <EditIcon fontSize='medium' sx={{ color: 'black' }} />
                </IconButton>
            }>
                <Avatar src={currentUser.profilePicture ? currentUser.profilePicture : defaultAvatar} sx={{ width: 150, height: 150 }} />
            </Badge>
            <Grid container width={500} textAlign={"center"} marginY={5} rowGap={8}>
                <Grid item xs={12} sm={6}>
                    <h2>Username:</h2>
                    {edit ? <TextField sx={{
                        "& .MuiOutlinedInput-root": {
                            '& fieldset': {
                                borderColor: 'white',
                            },
                        },
                        height: 60,
                    }} {...register('username', { required: 'Username is required' })} />
                        : <h3>{currentUser.username}</h3>}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
                        <h2 style={{ marginRight: 10 }}>Password:</h2>
                        {passwordVisible ? <VisibilityOffIcon sx={{ '&:hover': { cursor: 'pointer' } }} onClick={() => { setPasswordVisible(false) }} /> : <VisibilityIcon sx={{ '&:hover': { cursor: 'pointer' } }} onClick={() => { setPasswordVisible(true) }} />}
                    </Box>
                    {edit ? <TextField sx={{
                        "& .MuiOutlinedInput-root": {
                            '& fieldset': {
                                borderColor: 'white',
                            },
                        },
                        height: 60,
                    }} type={passwordVisible ? 'text' : 'password'} {...register('password', { required: 'Password is required' })} />
                        : <h3>{passwordVisible ? currentUser.password : '•'.repeat(currentUser.password.length)}</h3>}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <h2>Email:</h2>
                    {edit ? <TextField sx={{
                        "& .MuiOutlinedInput-root": {
                            '& fieldset': {
                                borderColor: 'white',
                            },
                        },
                        height: 60,
                    }} {...register('email', { required: 'Email is required' })} />
                        : <h3>{currentUser.email}</h3>}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <h2>Role:</h2>
                    <h3>{currentUser.role}</h3>
                </Grid>
            </Grid>
            <Box marginY={5}>
                {!edit ? <Button variant="contained" onClick={() => { setEdit(true) }}>Edit</Button>
                    : <>
                        <Button onClick={handleSubmit(updateProfile)} variant="contained">Apply</Button>
                        <Button onClick={() => { setEdit(false) }} variant="contained" sx={{ marginLeft: 1, backgroundColor: 'secondary.main', '&:hover': { backgroundColor: '#fc8b78' } }}>Cancel</Button>
                    </>}
            </Box>
        </Box>
    )
}

export default Profile