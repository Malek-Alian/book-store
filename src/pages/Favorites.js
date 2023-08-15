import { Box, Button, Divider, Grid } from "@mui/material"
import { useEffect, useState } from "react"
import BookCard from "../components/BookCard"

const Favorites = () => {

    const [favoriteBooks, setFavoriteBooks] = useState([])

    useEffect(() => {
        if (localStorage.getItem('favorites')) {
            setFavoriteBooks(JSON.parse(localStorage.getItem('favorites')))
        }
    }, [])

    return (
        <Box width={'100%'} color={'white'} backgroundColor={'background.paper'}>
            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} paddingX={3}>
                <h2>Favorites</h2>
                <Button variant="contained">Clear Favorites</Button>
            </Box>
            <Divider />
            <Grid container rowGap={4} padding={3}>
                {favoriteBooks.map((book, index) => {
                    return <Grid key={index} item xs={3}>
                        <BookCard book={book} inFavorites={true} setFavoriteBooks={setFavoriteBooks} />
                    </Grid>
                })}
            </Grid>
        </Box>
    )
}

export default Favorites