import { Box, Card, IconButton, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { downloadRequest } from "../api/Request"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';

const BookCard = ({ book, inHome, inFavorites, inCart, setCartBooks, setFavoriteBooks }) => {

    const [imageURL, setImageURL] = useState('')

    useEffect(() => {
        const getImage = async () => {
            const result = await downloadRequest(`download/${book.image}`, 'GET', true)
            setImageURL(window.URL.createObjectURL(result))
        }
        getImage()
    }, [])

    const addToCart = () => {
        if (!localStorage.getItem('cart')) {
            localStorage.setItem('cart', JSON.stringify([]))
        }
        let flag = false
        let cart = JSON.parse(localStorage.getItem('cart'))
        cart.map((item) => {
            if (item._id === book._id) {
                flag = true
            }
        })
        if (!flag) {
            cart.push(book)
            localStorage.setItem('cart', JSON.stringify(cart))
        }
    }
    const removeFromCart = () => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        cart.map((item, index) => {
            if (item._id === book._id) {
                cart.splice(index, 1)
            }
        })
        localStorage.setItem('cart', JSON.stringify(cart))
        setCartBooks(cart)
    }
    const addToFavorites = () => {
        if (!localStorage.getItem('favorites')) {
            localStorage.setItem('favorites', JSON.stringify([]))
        }
        let flag = false
        let favorites = JSON.parse(localStorage.getItem('favorites'))
        favorites.map((item) => {
            if (item._id === book._id) {
                flag = true
            }
        })
        if (!flag) {
            favorites.push(book)
            localStorage.setItem('favorites', JSON.stringify(favorites))
        }
    }
    const removeFromFavorites = () => {
        let favorites = JSON.parse(localStorage.getItem('favorites'))
        favorites.map((item, index) => {
            if (item._id === book._id) {
                favorites.splice(index, 1)
            }
        })
        localStorage.setItem('favorites', JSON.stringify(favorites))
        setFavoriteBooks(favorites)
    }

    return (
        <Card elevation={0} sx={{ display: 'flex', height: 280 }} >
            <img width={200} src={imageURL} />
            <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} paddingLeft={2}>
                <Typography fontSize={24} fontWeight={'bold'}>{book.name}</Typography>
                <Typography color={'#b5b5be'} fontSize={16}>{book.author}</Typography>
                <Typography fontSize={18} fontWeight={'bold'}>${book.price}</Typography>
                {(inHome || inCart || inFavorites) && <Box margin={-1} display={"flex"}>
                    <IconButton onClick={() => { inCart ? removeFromCart() : addToCart() }}>
                        {inHome || inFavorites ? <ShoppingCartIcon color="primary" /> : <RemoveShoppingCartIcon color="primary" />}
                    </IconButton>
                    <IconButton onClick={() => { inFavorites ? removeFromFavorites() : addToFavorites() }}>
                        {inHome || inCart ? <FavoriteIcon color="secondary" /> : <HeartBrokenIcon color="secondary" />}
                    </IconButton>
                </Box>}
            </Box>
        </Card>
    )
}

export default BookCard