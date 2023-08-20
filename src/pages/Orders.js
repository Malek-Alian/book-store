import { Box, Button, Divider, Grid } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { request } from "../api/Request"
import BookCard from "../components/BookCard"
import { AppContext } from "../App"

const Orders = () => {

    const [orders, setOrders] = useState([])
    const { _700, _1000, _1300 } = useContext(AppContext)

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
                return <>
                    <Box key={index} padding={2}>
                        <Grid container display={"flex"} justifyContent={'space-between'} alignItems={"center"}>
                            <Grid item xl={2.5} md={4}><h2><span style={{ color: '#0dd0b3' }}>Placed By:</span> {order.createdBy.email}</h2></Grid>
                            <Grid item xl={2.5} md={4}><h2><span style={{ color: '#0dd0b3' }}>Placed On:</span> {order.createdAt.slice(0, 10)}</h2></Grid>
                            <Grid item xl={2.5} md={4}><h2><span style={{ color: '#0dd0b3' }}>Total Price:</span> ${order.totalPrice}</h2></Grid>
                            <Grid item xl={2.5} md={4}><h2><span style={{ color: '#0dd0b3' }}>Status:</span> {order.status}</h2></Grid>
                            <Grid item xl={2} md={4}>
                                <Box marginBottom={(!_700 && !_1000 && !_1300) && 2}>
                                    <Button disabled={order.status === 'Accepted'} onClick={() => { acceptOrder(order) }} variant="contained">Accept</Button>
                                    <Button sx={{ marginLeft: 1, backgroundColor: 'secondary.main', '&:hover': { backgroundColor: '#fc8b78' } }} disabled={order.status === 'Rejected'} onClick={() => { rejectOrder(order) }} variant="contained">Reject</Button>
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid container rowGap={2}>
                            {order.books.map((book, index) => {
                                return <Grid key={index} item xs={_1300 ? 3 : _1000 ? 4 : _700 ? 6 : 12} >
                                    <BookCard book={book} />
                                </Grid>
                            })}
                        </Grid>
                    </Box>
                    <Divider />
                </>
            })}
        </Box>
    )
}

export default Orders