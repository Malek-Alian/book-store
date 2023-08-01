import { useContext } from "react"
import { AppContext } from "../App"
import { Box, Button } from "@mui/material"

const Home = () => {

    const { pageMenuOpen } = useContext(AppContext)

    return (
        <>
            <Box width={'100%'} height={600} color={'white'} backgroundColor={'background.paper'}>
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} paddingX={3}>
                    <h2>Browse Books</h2>
                    <Button variant="contained">View All</Button>
                </Box>
                <hr />
                <Box></Box>
            </Box>
        </>
    )
}

export default Home