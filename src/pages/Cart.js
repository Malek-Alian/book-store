import { Box, Button, Divider, Grid } from "@mui/material"
import BookCard from "../components/BookCard"
import { useContext, useEffect, useState } from "react"
import { request } from "../api/Request"
import { AppContext } from "../App"

const Cart = () => {

    const { currentUser } = useContext(AppContext)
    const [cartBooks, setCartBooks] = useState([])
    let totalPrice = 0

    useEffect(() => {
        if (localStorage.getItem('cart')) {
            setCartBooks(JSON.parse(localStorage.getItem('cart')))
        }
    }, [])

    const makeOrder = async () => {
        const booksIds = cartBooks.map(book => book._id);
        await request('make-order', 'POST', { createdBy: currentUser._id, books: booksIds, totalPrice })
        totalPrice = 0
        localStorage.removeItem('cart')
        setCartBooks([])
    }
    return (
        <Box width={'100%'} color={'white'} backgroundColor={'background.paper'}>
            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} paddingX={3}>
                <h2>Cart</h2>
                <Button onClick={() => { makeOrder() }} variant="contained">Make Order</Button>
            </Box>
            <Divider />
            <Grid container rowGap={4} padding={3}>
                {cartBooks.map((book, index) => {
                    totalPrice += book.price
                    return <Grid key={index} item xs={3}>
                        <BookCard book={book} inCart={true} setCartBooks={setCartBooks} />
                    </Grid>
                })}
            </Grid>
        </Box>
    )
}

export default Cart