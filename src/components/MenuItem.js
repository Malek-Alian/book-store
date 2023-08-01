import { Box, Fade } from "@mui/material"
import { useContext, useState } from "react"
import { AppContext } from "../App"
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const MenuItem = ({ icon, title, isSelected, itemIndex, setSelectedIndex }) => {

    const { pageMenuOpen, setIsSigned } = useContext(AppContext)
    const [expanded, setExpanded] = useState(false)

    return (
        <Box onClick={() => { setExpanded(!expanded); setSelectedIndex(itemIndex) }} backgroundColor={isSelected && 'background.item'} width={'100%'} height={80} sx={{ '&:hover': { color: 'text.secondary', cursor: 'pointer' } }} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
            <Box display={"flex"} alignItems={"center"} paddingLeft={2}>
                {icon}
                {pageMenuOpen && <Fade timeout={400} in={pageMenuOpen} direction="right"><h3 style={{ marginLeft: 10 }}>{title}</h3></Fade>}
            </Box>
            {pageMenuOpen ? !expanded ? <KeyboardArrowRightIcon /> : <KeyboardArrowDownIcon /> : ''}
        </Box>
    )
}

export default MenuItem