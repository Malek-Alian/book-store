import { Box, Button } from "@mui/material"
import WelcomeImage from '../assets/welcomeImage.jpg'
import { Link } from "react-router-dom"
import { useContext } from "react"
import { AppContext } from "../App"

const Welcome = () => {

    const { sm } = useContext(AppContext)

    return (
        <Box backgroundColor={'#005050'} width={'100vw'} height={'100vh'} display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <Box backgroundColor={'#D0F8FF'} width={!sm ? '70%' : '60%'} height={'60%'} display={"flex"}>
                <Box width={'50%'} height={'100%'} display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
                    <h1>Welcome</h1>
                    <h2>to our</h2>
                    <h1 style={{ fontSize: 40 }}>Book Store</h1>
                    <Link to={'/login'}>
                        <Button sx={{ width: 200 }} variant="contained">Continue</Button>
                    </Link>
                </Box>
                <img src={WelcomeImage} width={'50%'} />
            </Box>
        </Box>
    )
}

export default Welcome