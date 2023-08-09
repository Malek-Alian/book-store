import { Box, Button, Divider } from "@mui/material"

const Home = () => {

    return (
        <>
            <Box width={'100%'} height={600} color={'white'} backgroundColor={'background.paper'}>
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} paddingX={3}>
                    <h2>Browse Books</h2>
                    <Button variant="contained">View All</Button>
                </Box>
                <Divider />
            </Box>
        </>
    )
}

export default Home