import { Grid } from "@mui/material"
import { useEffect, useState } from "react"
import { request } from "../api/Request"

const Dashboard = () => {

    const [users, setUsers] = useState(0)
    const [orders, setOrders] = useState(0)
    const [books, setBooks] = useState(0)
    const [income, setIncome] = useState(0)

    const getNumberOfUsers = async () => {
        const result = await request('number-of-users', 'GET')
        setUsers(result.data)
    }
    const getNumberOfOrders = async () => {
        const result = await request('number-of-orders', 'GET')
        setOrders(result.data)
    }
    const getNumberOfBooks = async () => {
        const result = await request('number-of-books', 'GET')
        setBooks(result.data)
    }
    const getIncome = async () => {
        const result = await request('get-income', 'GET')
        setIncome(result.data)
    }

    useEffect(() => {
        getNumberOfUsers()
        getNumberOfOrders()
        getNumberOfBooks()
        getIncome()
    }, [])

    return (
        <Grid container color={'white'} justifyContent={'space-between'} rowGap={2} >
            <Grid item md={6.9} xs={12} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} height={400} backgroundColor={'background.paper'} borderRadius={1}>
                <h2>Number Of Users</h2>
                <h2>{users}</h2>
            </Grid>
            <Grid item md={5} xs={12} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} height={400} backgroundColor={'background.paper'} borderRadius={1}>
                <h2>Number Of Orders</h2>
                <h2>{orders}</h2>
            </Grid>
            <Grid item md={5.4} xs={12} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} height={400} backgroundColor={'background.paper'} borderRadius={1}>
                <h2>Number Of Books</h2>
                <h2>{books}</h2>
            </Grid>
            <Grid item md={6.5} xs={12} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} height={400} backgroundColor={'background.paper'} borderRadius={1}>
                <h2>Total Income</h2>
                <h2>${income}</h2>
            </Grid>
        </Grid>
    )
}

export default Dashboard