import { Box, Button, Divider, Grid } from "@mui/material"
import { useEffect, useState } from "react"
import { request } from "../api/Request"
import BookCard from "../components/BookCard"

const Orders = () => {

    const [orders, setOrders] = useState([])

    console.log(orders);
    const getOrders = async () => {
        const result = await request('get-orders', 'GET')
        setOrders(result.data)
    }

    useEffect(() => {
        getOrders()
    }, [])

    const acceptOrder = async (order) => {
        order.status = 'Accepted'
        await request('update-order', 'PUT', order)
        getOrders()
    }
    const rejectOrder = async (order) => {
        order.status = 'Rejected'
        await request('update-order', 'PUT', order)
        getOrders()
    }
    const acceptAll = async () => {
        orders.map(async (order) => {
            order.status = 'Accepted'
            await request('update-order', 'PUT', order)
        })
        await getOrders()
    }

    return (
        <Box width={'100%'} color={'white'} backgroundColor={'background.paper'}>
            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} paddingX={3}>
                <h2>Placed Orders</h2>
                <Button onClick={() => { acceptAll() }} variant="contained">Accept All</Button>
            </Box>
            <Divider />
            {orders?.map((order, index) => {
                return <Box key={index} padding={2}>
                    <Box display={"flex"} justifyContent={'space-between'} alignItems={"center"}>
                        <h2><span style={{ color: '#0dd0b3' }}>Placed By:</span> {order.createdBy.email}</h2>
                        <h2><span style={{ color: '#0dd0b3' }}>Placed On:</span> {order.createdAt.slice(0, 10)}</h2>
                        <h2><span style={{ color: '#0dd0b3' }}>Total Price:</span> ${order.totalPrice}</h2>
                        <h2><span style={{ color: '#0dd0b3' }}>Status:</span> {order.status}</h2>
                        <Box>
                            <Button disabled={order.status === 'Accepted'} onClick={() => { acceptOrder(order) }} variant="contained">Accept</Button>
                            <Button sx={{ marginLeft: 1, backgroundColor: 'secondary.main', '&:hover': { backgroundColor: '#fc8b78' } }} disabled={order.status === 'Rejected'} onClick={() => { rejectOrder(order) }} variant="contained">Reject</Button>
                        </Box>
                    </Box>
                    <Grid container rowGap={2}>
                        {order.books.map((book, index) => {
                            return <Grid key={index} item xs={3}>
                                <BookCard book={book} />
                            </Grid>
                        })}
                    </Grid>
                </Box>
            })}
        </Box>
    )
}

export default Orders