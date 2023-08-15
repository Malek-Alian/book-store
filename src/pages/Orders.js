import { Box, Button, Divider, Grid } from "@mui/material"
import { useEffect, useState } from "react"
import { request } from "../api/Request"
import BookCard from "../components/BookCard"

const Orders = () => {

    const [orders, setOrders] = useState([])

    useEffect(() => {
        const getOrders = async () => {
            const result = await request('get-orders', 'GET')
            setOrders(result.data)
        }
        getOrders()
    }, [])

    return (
        <Box width={'100%'} color={'white'} backgroundColor={'background.paper'}>
            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} paddingX={3}>
                <h2>Placed Orders</h2>
                <Button variant="contained">View All</Button>
            </Box>
            <Divider />
            {orders.map((order, index) => {
                return <Box key={index} padding={2}>
                    <Box display={"flex"} justifyContent={'space-between'}>
                        <h2>{index}</h2>
                        <h2><span style={{ color: '#0dd0b3' }}>Placed By:</span> {order.createdBy.email}</h2>
                        <h2><span style={{ color: '#0dd0b3' }}>Placed On:</span> {order.createdAt.slice(0, 10)}</h2>
                        <h2><span style={{ color: '#0dd0b3' }}>Total Price:</span> ${order.totalPrice}</h2>
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