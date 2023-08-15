import { Box, Button, Divider, Grid } from "@mui/material"
import { useEffect, useState } from "react"
import { request } from "../api/Request"
import BookCard from "../components/BookCard"

const Home = () => {

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
                    return <Grid key={index} item xs={3}>
                        <BookCard book={book} inHome={true} />
                    </Grid>
                })}
            </Grid>
        </Box>
    )
}

export default Home