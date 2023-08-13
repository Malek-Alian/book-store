import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Box, Button, Divider, FormControl, MenuItem, Select, TextField, TextareaAutosize, Typography } from "@mui/material";
import { useContext } from 'react';
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from '../App';
import { fileRequest, request } from '../api/Request';

const EditBook = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const { currentUser } = useContext(AppContext)
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: location.state.book
    })

    const updateBook = async (data) => {
        if (!data.PDF) {
            data.PDF = ' '
        }
        if (!data.description) {
            data.description = ' '
        }
        if ((typeof data.image) !== 'string') {
            await request(`delete-document/${location.state.book.image}`, 'DELETE')
            let formData = new FormData();
            formData.append("bookImage", data.image[0]);
            const result = await fileRequest(`upload/${currentUser._id}`, 'POST', formData)
            await request('update-book', 'PUT', { ...data, image: result.data._id })
        } else {
            await request('update-book', 'PUT', data)
        }
        reset()
        navigate('/books', { replace: true })
    }
    const handleFocus = (event) => {
        event.target.style.borderColor = "#0dd0b3";
        event.target.style.outline = "none";
    };
    const handleBlur = (event) => {
        event.target.style.borderColor = "#ffffff1a";
    };

    return (
        <Box width={'100%'} color={'white'} backgroundColor={'background.paper'} borderRadius={1}>
            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} paddingX={3}>
                <h2>Edit Book</h2>
            </Box>
            <Divider />
            <form onSubmit={handleSubmit(updateBook)} style={{ display: 'flex', flexDirection: 'column', padding: 20 }}>
                <h4 style={{ marginTop: 0 }}>( {<Typography display={"inline"} color={'secondary.main'}>*</Typography>} ) Means the field is required</h4>
                <label style={{ color: '#a2a4af', marginBottom: 10 }}>{<Typography display={"inline"} color={'secondary.main'}>*</Typography>} Book Name:</label>
                <TextField {...register('name', { required: 'Name is required' })} error={errors.name && true} size="small" sx={{
                    "& .MuiOutlinedInput-root": {
                        '& fieldset': {
                            borderColor: '#ffffff1a',
                        },
                        color: '#a2a4af',
                    },
                    marginBottom: 2
                }} />
                {errors.name && <Box marginTop={-2} marginLeft={1} color={"error.main"}><p>{errors.name.message}</p></Box>}
                <label style={{ color: '#a2a4af', marginBottom: 10 }}>{<Typography display={"inline"} color={'secondary.main'}>*</Typography>} Book Category:</label>
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
                    <Select {...register('category', { required: 'Category is required', validate: value => value !== 'bookCategory' || 'Please select a valid category' })} error={errors.category && true} IconComponent={() => <ArrowDropDownIcon />} defaultValue={location.state.book.category || 'bookCategory'}>
                        <MenuItem value={'bookCategory'} disabled>Book Category</MenuItem>
                        <MenuItem value={'General Category'}>General Category</MenuItem>
                        <MenuItem value={'History Category'}>History Category</MenuItem>
                        <MenuItem value={'Horror Category'}>Horror Category</MenuItem>
                        <MenuItem value={'Art Category'}>Art Category</MenuItem>
                        <MenuItem value={'Film & Photography Category'}>Film & Photography Category</MenuItem>
                        <MenuItem value={'Sports Category'}>Sports Category</MenuItem>
                        <MenuItem value={'Computers & Internet Category'}>Computers & Internet Category</MenuItem>
                    </Select>
                </FormControl>
                {errors.category && <Box marginTop={-2} marginLeft={1} color={"error.main"}><p>{errors.category.message}</p></Box>}
                <label style={{ color: '#a2a4af', marginBottom: 10 }}>{<Typography display={"inline"} color={'secondary.main'}>*</Typography>} Book Author:</label>
                <TextField {...register('author', { required: 'Author is required' })} error={errors.author && true} size="small" sx={{
                    "& .MuiOutlinedInput-root": {
                        '& fieldset': {
                            borderColor: '#ffffff1a',
                        },
                        color: '#a2a4af',
                    },
                    marginBottom: 2
                }} />
                {errors.author && <Box marginTop={-2} marginLeft={1} color={"error.main"}><p>{errors.author.message}</p></Box>}
                <label style={{ color: '#a2a4af', marginBottom: 10 }}>{<Typography display={"inline"} color={'secondary.main'}>*</Typography>} Book Image:</label>
                <TextField type="file" {...register('image')} size="small" sx={{
                    "& .MuiOutlinedInput-root": {
                        '& fieldset': {
                            borderColor: '#ffffff1a',
                        },
                        color: '#a2a4af',
                    },
                    marginBottom: 2
                }} />
                <img src={location.state.imageURL} alt={location.state.book.name} width={200} />
                <label style={{ color: '#a2a4af', marginBottom: 10 }}>Book PDF:</label>
                <TextField {...register('PDF')} size="small" sx={{
                    "& .MuiOutlinedInput-root": {
                        '& fieldset': {
                            borderColor: '#ffffff1a',
                        },
                        color: '#a2a4af',
                    },
                    marginBottom: 2
                }} />
                <label style={{ color: '#a2a4af', marginBottom: 10 }}>{<Typography display={"inline"} color={'secondary.main'}>*</Typography>} Book Price:</label>
                <TextField {...register('price', { required: 'Price is required' })} error={errors.price && true} size="small" sx={{
                    "& .MuiOutlinedInput-root": {
                        '& fieldset': {
                            borderColor: '#ffffff1a',
                        },
                        color: '#a2a4af',
                    },
                    marginBottom: 2
                }} />
                {errors.price && <Box marginTop={-2} marginLeft={1} color={"error.main"}><p>{errors.price.message}</p></Box>}
                <label style={{ color: '#a2a4af', marginBottom: 10 }}>Book Description:</label>
                <TextareaAutosize onFocus={handleFocus} onBlur={handleBlur} {...register('description')} minRows={10} style={{
                    color: 'white',
                    backgroundColor: 'inherit',
                    borderRadius: 4,
                    borderColor: '#ffffff1a'
                }} />
                <Box marginTop={2}>
                    <Button type="submit" variant="contained">Submit</Button>
                    <Button onClick={() => { reset() }} variant="contained" sx={{ marginLeft: 1, backgroundColor: 'secondary.main', '&:hover': { backgroundColor: '#fc8b78' } }}>Reset</Button>
                </Box>
            </form>
        </Box>
    )
}

export default EditBook