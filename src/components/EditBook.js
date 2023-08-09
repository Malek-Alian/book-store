import { Box, Button, Divider, FormControl, MenuItem, Select, TextField, TextareaAutosize, Typography } from "@mui/material"
import { useForm } from "react-hook-form";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useLocation } from "react-router-dom";

const EditBook = () => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const location = useLocation()

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
            <form onSubmit={handleSubmit()} style={{ display: 'flex', flexDirection: 'column', padding: 20 }}>
                <h4 style={{ marginTop: 0 }}>( {<Typography display={"inline"} color={'secondary.main'}>*</Typography>} ) Means the field is required</h4>
                <label style={{ color: '#a2a4af', marginBottom: 10 }}>{<Typography display={"inline"} color={'secondary.main'}>*</Typography>} Book Name:</label>
                <TextField {...register('name', { required: 'Name is required' })} error={errors.name} size="small" sx={{
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
                    <Select {...register('category', { required: 'Category is required', validate: value => value !== 'bookCategory' || 'Please select a valid category' })} error={errors.category} IconComponent={() => <ArrowDropDownIcon />} defaultValue={'bookCategory'}>
                        <MenuItem value={'bookCategory'} disabled>Book Category</MenuItem>
                        <MenuItem value={'General'}>General Category</MenuItem>
                        <MenuItem value={'History'}>History Category</MenuItem>
                        <MenuItem value={'Horror'}>Horror Category</MenuItem>
                        <MenuItem value={'Art'}>Art Category</MenuItem>
                        <MenuItem value={'Film & Photography'}>Film & Photography Category</MenuItem>
                        <MenuItem value={'Sports'}>Sports Category</MenuItem>
                        <MenuItem value={'Computers & Internet'}>Computers & Internet Category</MenuItem>
                    </Select>
                </FormControl>
                {errors.category && <Box marginTop={-2} marginLeft={1} color={"error.main"}><p>{errors.category.message}</p></Box>}
                <label style={{ color: '#a2a4af', marginBottom: 10 }}>{<Typography display={"inline"} color={'secondary.main'}>*</Typography>} Book Author:</label>
                <TextField {...register('author', { required: 'Author is required' })} error={errors.author} size="small" sx={{
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
                <TextField type="file" {...register('image', { required: 'Image is required' })} error={errors.image} size="small" sx={{
                    "& .MuiOutlinedInput-root": {
                        '& fieldset': {
                            borderColor: '#ffffff1a',
                        },
                        color: '#a2a4af',
                    },
                    marginBottom: 2
                }} />
                {errors.image && <Box marginTop={-2} marginLeft={1} color={"error.main"}><p>{errors.image.message}</p></Box>}
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
                <TextField {...register('price', { required: 'Price is required' })} error={errors.price} size="small" sx={{
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