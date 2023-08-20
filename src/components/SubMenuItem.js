import { Box, Fade } from "@mui/material"
import { useContext, useEffect } from "react"
import { AppContext } from "../App"
import { useNavigate } from "react-router-dom"

const SubMenuItem = ({ icon, title, isSelected, itemIndex, setSubSelectedIndex }) => {

    const navigate = useNavigate()
    const { pageMenuOpen } = useContext(AppContext)

    useEffect(() => {
        if (localStorage.getItem('subMenuIndex')) {
            setSubSelectedIndex(JSON.parse(localStorage.getItem('subMenuIndex')))
        }
    }, [])

    const handleClick = () => {
        setSubSelectedIndex(itemIndex)
        localStorage.setItem('subMenuIndex', JSON.stringify(itemIndex))
        navigate(`/${title.toLowerCase()}`)
    }

    return (
        <Box onClick={() => { handleClick() }} paddingLeft={pageMenuOpen ? 6 : 2} color={isSelected && 'text.secondary'} width={'100%'} height={50} sx={{ '&:hover': { color: 'text.secondary', cursor: 'pointer' } }} display={"flex"} alignItems={"center"}>
            {icon}
            {pageMenuOpen && <Fade timeout={400} in={pageMenuOpen} direction="right" style={{ marginLeft: 10 }}><h3>{title}</h3></Fade>}
        </Box>
    )
}

export default SubMenuItem