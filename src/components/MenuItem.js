import { Box, Fade, Slide } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "../App"
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SubMenuItem from "./SubMenuItem";

const MenuItem = ({ icon, title, subItems }) => {

    const { pageMenuOpen } = useContext(AppContext)
    const [expanded, setExpanded] = useState(false)
    const [isSelected, setIsSelected] = useState(false)
    const [subSelectedIndex, setSubSelectedIndex] = useState(0)

    useEffect(() => {
        if (localStorage.getItem('expanded')) {
            setExpanded(JSON.parse(localStorage.getItem('expanded')))
            setIsSelected(JSON.parse(localStorage.getItem('expanded')))
        }
    }, [])

    const handleClick = () => {
        setExpanded(!expanded)
        setIsSelected(!isSelected)
        localStorage.setItem('expanded', JSON.stringify(!expanded))
    }

    return (
        <>
            <Box onClick={() => { handleClick() }} color={isSelected && 'text.secondary'} backgroundColor={isSelected && 'background.item'} width={'100%'} height={50} sx={{ '&:hover': { color: 'text.secondary', cursor: 'pointer' }, marginTop: 2 }} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                <Box display={"flex"} alignItems={"center"} paddingLeft={2}>
                    {icon}
                    {pageMenuOpen && <Fade timeout={400} in={pageMenuOpen} direction="right"><h3 style={{ marginLeft: 10 }}>{title}</h3></Fade>}
                </Box>
                {pageMenuOpen ? expanded && isSelected ? <KeyboardArrowDownIcon sx={{ borderRight: isSelected && 3, height: 40, paddingRight: 2 }} /> : <KeyboardArrowRightIcon sx={{ borderRight: isSelected && 3, height: 40, paddingRight: 2 }} /> : ''}
            </Box>
            {(isSelected && expanded) &&
                <Slide in={expanded}>
                    <Box overflow={'hidden'}>
                        {subItems.map((item, index) => <SubMenuItem key={index} icon={item.icon} title={item.title} itemIndex={index} isSelected={subSelectedIndex === index} setSubSelectedIndex={setSubSelectedIndex} />)}
                    </Box>
                </Slide>
            }
        </>
    )
}

export default MenuItem