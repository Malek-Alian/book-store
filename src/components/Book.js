import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, IconButton, TableCell, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { downloadRequest, request } from "../api/Request";

const Book = ({ index, book }) => {

    const [imageURL, setImageURL] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const getImage = async () => {
            const result = await downloadRequest(`download/${book.image}`, 'GET', true)
            setImageURL(window.URL.createObjectURL(result))
        }
        getImage()
    }, [])

    const deleteBook = async (id) => {
        await request(`delete-book/${id}`, 'DELETE')
    }

    return (
        <TableRow key={index} sx={{ backgroundColor: !(index % 2) && 'background.default' }}>
            <TableCell>{index}</TableCell>
            <TableCell>{<img src={imageURL} alt={book.name} width={200} />}</TableCell>
            <TableCell>{book.name}</TableCell>
            <TableCell>{book.category}</TableCell>
            <TableCell>{book.author}</TableCell>
            <TableCell>{book.description}</TableCell>
            <TableCell>${book.price}</TableCell>
            <TableCell>{book.PDF}</TableCell>
            <TableCell>{
                <Box width={'100%'} display={'flex'} justifyContent={'space-evenly'}>
                    <IconButton onClick={() => { navigate('/books/edit-book', { state: { book, imageURL } }) }} sx={{ borderRadius: 1, color: 'white', backgroundColor: 'text.secondary' }}><EditIcon /></IconButton>
                    <IconButton onClick={() => { deleteBook(book._id) }} sx={{ borderRadius: 1, color: 'white', backgroundColor: 'text.secondary' }}><DeleteIcon /></IconButton>
                </Box>
            }</TableCell>
        </TableRow>
    )
}

export default Book