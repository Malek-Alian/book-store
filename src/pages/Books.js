import { Box, Button, Divider, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { AppContext } from "../App"
import { request } from "../api/Request"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Books = () => {

    const { books, setBooks } = useContext(AppContext)

    useEffect(() => {
        const getBooks = async () => {
            const books = await request('books', 'GET')
            setBooks(books)
        }
        getBooks()
    }, [setBooks])

    return (
        <Box width={'100%'} color={'white'} backgroundColor={'background.paper'} borderRadius={1}>
            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} paddingX={3}>
                <h2>Books</h2>
                <Link to={'/books/add-book'}>
                    <Button variant="contained" sx={{ textTransform: 'none' }}>Add new book</Button>
                </Link>
            </Box>
            <Divider />
            <Table border={1}>
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
                        return <TableRow key={index} sx={{ backgroundColor: !(index % 2) && 'background.default' }}>
                            <TableCell>{index}</TableCell>
                            <TableCell>{<img src={book.image !== ' ' ? book.image : 'https://static.vecteezy.com/system/resources/previews/005/337/799/non_2x/icon-image-not-found-free-vector.jpg'} alt="Book" width={150} />}</TableCell>
                            <TableCell>{book.name}</TableCell>
                            <TableCell>{book.category}</TableCell>
                            <TableCell>{book.author}</TableCell>
                            <TableCell>{book.description}</TableCell>
                            <TableCell>{book.price}</TableCell>
                            <TableCell>{book.PDF}</TableCell>
                            <TableCell>{
                                <>
                                    <IconButton sx={{ color: 'white', backgroundColor: 'text.secondary' }}><EditIcon /></IconButton>
                                    <IconButton sx={{ color: 'white', backgroundColor: 'text.secondary' }}><DeleteIcon /></IconButton>
                                </>
                            }</TableCell>
                        </TableRow>
                    })}
                </TableBody>
            </Table>
        </Box>
    )
}

export default Books