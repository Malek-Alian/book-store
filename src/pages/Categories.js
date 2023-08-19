import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { Box, Divider, FormControl, Grid, MenuItem, Select } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "../App"
import { request } from "../api/Request"
import BookCard from "../components/BookCard"

const Categories = () => {

    const { _1300, _1000, _700 } = useContext(AppContext)
    const [books, setBooks] = useState([])
    const [category, setCategory] = useState('All')

    const getBooks = async () => {
        if (category === 'All') {
            const books = await request('books', 'GET')
            setBooks(books)
        } else {
            const books = await request('books-category', 'POST', { category })
            setBooks(books)
        }
    }

    useEffect(() => {
        getBooks()
    }, [category])

    return (
        <Box width={'100%'} color={'white'} backgroundColor={'background.paper'}>
            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} paddingX={3}>
                <h2>Books by category</h2>
                <FormControl size="small" sx={{
                    "& .MuiOutlinedInput-root": {
                        '& fieldset': {
                            borderColor: '#ffffff1a',
                        },
                        color: '#a2a4af',
                        fontSize: 14,
                        padding: 0.5
                    },
                    marginBottom: 2,
                }}>
                    <Select onChange={(e) => { setCategory(e.target.value) }} IconComponent={() => <ArrowDropDownIcon />} defaultValue={'All'}>
                        <MenuItem value={'All'}>All</MenuItem>
                        <MenuItem value={'General Category'}>General Category</MenuItem>
                        <MenuItem value={'History Category'}>History Category</MenuItem>
                        <MenuItem value={'Horror Category'}>Horror Category</MenuItem>
                        <MenuItem value={'Art Category'}>Art Category</MenuItem>
                        <MenuItem value={'Film & Photography Category'}>Film & Photography Category</MenuItem>
                        <MenuItem value={'Sports Category'}>Sports Category</MenuItem>
                        <MenuItem value={'Computers & Internet Category'}>Computers & Internet Category</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Divider />
            <Grid container rowGap={4} padding={3}>
                {books?.map((book, index) => {
                    return <Grid key={index} item xs={_1300 ? 3 : _1000 ? 4 : _700 ? 6 : 12}>
                        <BookCard book={book} inHome={true} />
                    </Grid>
                })}
            </Grid>
        </Box>
    )
}

export default Categories