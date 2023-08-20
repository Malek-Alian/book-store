import { Box, Button, Divider, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { request } from "../api/Request"
import Book from "../components/Book"

const Books = () => {

    const [books, setBooks] = useState([])

    useEffect(() => {
        const getBooks = async () => {
            const books = await request('books', 'GET')
            setBooks(books)
        }
        getBooks()
    }, [books])

    return (
        <Box width={'100%'} color={'white'} backgroundColor={'background.paper'} borderRadius={1} overflow={'auto'}>
            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} paddingX={3}>
                <h2>Books</h2>
                <Link to={'/books/add-book'}>
                    <Button variant="contained" sx={{ textTransform: 'none' }}>Add new book</Button>
                </Link>
            </Box>
            <Divider />
            <Table sx={{ marginTop: 2, width: '100%' }} border={1}>
                <TableHead>
                    <TableRow>
                        <TableCell>No</TableCell>
                        <TableCell>Book Image</TableCell>
                        <TableCell>Book Name</TableCell>
                        <TableCell>Book Category</TableCell>
                        <TableCell>Book Author</TableCell>
                        <TableCell>Book Description</TableCell>
                        <TableCell>Book Price</TableCell>
                        <TableCell>Book PDF</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {books.map((book, index) => {
                        return <Book key={book._id} index={index} book={book} />
                    })}
                </TableBody>
            </Table>
        </Box>
    )
}

export default Books