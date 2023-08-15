import { Box, Fade } from "@mui/material"
import { useContext } from "react"
import { AppContext } from "../App"
import { Link, useNavigate } from "react-router-dom"

const SubMenuItem = ({ icon, title, isSelected, itemIndex, setSubSelectedIndex }) => {

    const navigate = useNavigate()
    const { pageMenuOpen } = useContext(AppContext)

    const handleClick = () => {
        setSubSelectedIndex(itemIndex)
        navigate(`/users`)
    }

    return (
        <Link to={'/books'} style={{ textDecoration: 'none', color: '#b5b5be' }}>
            <Box onClick={() => { handleClick() }} paddingLeft={pageMenuOpen ? 6 : 2} color={isSelected && 'text.secondary'} width={'100%'} height={50} sx={{ '&:hover': { color: 'text.secondary', cursor: 'pointer' } }} display={"flex"} alignItems={"center"}>
                {icon}
                {pageMenuOpen && <Fade timeout={400} in={pageMenuOpen} direction="right" style={{ marginLeft: 10 }}><h3>{title}</h3></Fade>}
            </Box>
        </Link>
    )
}

export default SubMenuItem