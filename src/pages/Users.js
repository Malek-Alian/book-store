import { Box, Divider } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { request } from "../api/Request";
import User from "../components/User";

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

    return (
        <Box width={'100%'} color={'white'} backgroundColor={'background.paper'} borderRadius={1}>
            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} paddingX={3}>
                <h2>Users</h2>
            </Box>
            <Divider />
            {users.map((user, index) => {
                if (user._id !== currentUser._id) {
                    return <User key={index} user={user} getUsers={getUsers} />
                }
            })}
        </Box>
    )
}

export default Users