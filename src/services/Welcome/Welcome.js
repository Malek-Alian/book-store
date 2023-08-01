import { Box, Button, Grid } from "@mui/material"
import { useContext } from "react"
import { Link } from "react-router-dom"
import { AppContext } from "../../App"
import WelcomeImage from '../../assets/welcomeImage.jpg'

const Welcome = () => {

    const { xs, sm } = useContext(AppContext)

    return (
        <Box color={'text.primary'} backgroundColor={'background.default'} width={'100vw'} height={'100vh'} display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <Box backgroundColor={'background.paper'} borderRadius={10} width={sm ? 800 : xs ? 600 : 300} height={xs ? 400 : 700} display={"flex"}>
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <img src={WelcomeImage} alt="Welcome" height={'100%'} width={'100%'} style={{ borderTopLeftRadius: 30, borderBottomLeftRadius: xs && 30, borderTopRightRadius: !xs && 30 }} />
                    </Grid>
                    <Grid item xs={12} sm={6} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
                        <h1>Welcome</h1>
                        <h2>to our</h2>
                        <h1 style={{ fontSize: 40 }}>Book Store</h1>
                        <Link to={'/login'}>
                            <Button sx={{ width: 200 }} variant="contained">Continue</Button>
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default Welcome