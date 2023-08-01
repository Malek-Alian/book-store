import { Box, IconButton, Fade } from "@mui/material"
import { useContext, useState } from "react"
import { AppContext } from "../App"
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from "./MenuItem";
import LockPersonIcon from '@mui/icons-material/LockPerson';
import PersonIcon from '@mui/icons-material/Person';

const Menu = () => {

    const { pageMenuOpen, setPageMenuOpen, hover, setHover } = useContext(AppContext)
    const [selectedIndex, setSelectedIndex] = useState(0)

    const menuItems = [
        { 'icon': <HomeIcon />, 'title': 'Shop' },
        { 'icon': <LockPersonIcon />, 'title': 'Admin' },
        { 'icon': <PersonIcon />, 'title': 'User' },
    ]

    const handleMenu = () => {
        if (hover) {
            setPageMenuOpen(true)
            setHover(false)
        } else {
            setPageMenuOpen(false)
            setHover(true)
        }
    }

    return (
        <Box position={"sticky"} top={0} left={0} backgroundColor={'background.paper'} onMouseOver={() => { hover && setPageMenuOpen(true) }} onMouseLeave={() => { hover && setPageMenuOpen(false) }} height={'100vh'}>
            <Box display={"flex"} alignItems={"center"} justifyContent={'space-between'}>
                <Box display={"flex"} alignItems={"center"} paddingX={2} paddingTop={!pageMenuOpen && 1.6} color={'text.secondary'}>
                    <img src='https://templates.iqonic.design/booksto/html-dark/images/logo.png' alt="Logo" width={40} />
                    {pageMenuOpen && <Fade timeout={400} in={pageMenuOpen} direction="right"><h2 style={{ marginLeft: 5 }}>BookStore</h2></Fade>}
                </Box>
                {pageMenuOpen &&
                    <Fade timeout={400} in={pageMenuOpen} direction="right">
                        <IconButton onClick={() => { handleMenu() }}>
                            <MenuIcon sx={{ color: 'text.secondary' }} fontSize="large" />
                        </IconButton>
                    </Fade>}
            </Box>
            <Box marginTop={!pageMenuOpen && 1.6} color={'gray'}>
                {menuItems.map((item, index) => <MenuItem isSelected={selectedIndex === index} itemIndex={index} setSelectedIndex={setSelectedIndex} key={index} icon={item.icon} title={item.title} />)}
            </Box>
        </Box>
    )
}

export default Menu