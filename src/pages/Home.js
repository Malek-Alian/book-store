import { Box, Button, Divider, Grid } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { request } from "../api/Request"
import BookCard from "../components/BookCard"
import { AppContext } from "../App"

const Home = () => {

    const { _1300, _1000, _700 } = useContext(AppContext)
    const [books, setBooks] = useState([])

    useEffect(() => {
        const getBooks = async () => {
            const books = await request('books', 'GET')
            setBooks(books)
        }
        getBooks()
    }, [])

    return (
        <Box width={'100%'} color={'white'} backgroundColor={'background.paper'}>
            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} paddingX={3}>
                <h2>Browse Books</h2>
                <Button variant="contained">View All</Button>
            </Box>
            <Divider />
            <Grid container rowGap={4} padding={3}>
                {books.map((book, index) => {
                    return <Grid key={index} item xs={_1300 ? 3 : _1000 ? 4 : _700 ? 6 : 12}>
                        <BookCard book={book} inHome={true} />
                    </Grid>
                })}
            </Grid>
        </Box>
    )
}

export default Home