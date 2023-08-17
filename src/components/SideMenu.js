import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import { Box, Fade, IconButton } from "@mui/material";
import { useContext, useState } from "react";
import { AppContext } from "../App";
import MenuItem from "./MenuItem";
import InterestsIcon from '@mui/icons-material/Interests';

const SideMenu = ({ absolute }) => {

    const { pageMenuOpen, setPageMenuOpen, hover, setHover, currentUser, lg } = useContext(AppContext)
    const [selectedIndex, setSelectedIndex] = useState(0)

    const menuItems = [
        { 'icon': <LockPersonIcon />, 'title': 'Admin' },
        { 'icon': <PersonIcon />, 'title': 'User' },
    ]
    const subMenuItems = [
        [
            { 'icon': <DashboardIcon />, 'title': 'Dashboard' },
            { 'icon': <GroupIcon />, 'title': 'Users' },
            { 'icon': <ListAltIcon />, 'title': 'Orders' },
            { 'icon': <LibraryBooksIcon />, 'title': 'Books' },
        ],
        [
            { 'icon': <HomeIcon />, 'title': 'Home' },
            { 'icon': <InterestsIcon />, 'title': 'Categories' },
            { 'icon': <PersonIcon />, 'title': 'User' },
        ]
    ]

    const handleMenu = () => {
        if (lg) {
            if (hover) {
                setPageMenuOpen(true)
                setHover(false)
            } else {
                setPageMenuOpen(false)
                setHover(true)
            }
        } else {
            setPageMenuOpen(false)
        }
    }

    return (
        <Box position={absolute ? "absolute" : 'sticky'} zIndex={2} top={0} left={0} backgroundColor={'background.paper'} onMouseOver={() => { hover && setPageMenuOpen(true) }} onMouseLeave={() => { lg && hover && setPageMenuOpen(false) }} height={'100vh'}>
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
            <Box marginTop={!pageMenuOpen && 3.6} color={'#b5b5be'}>
                {menuItems.map((item, index) =>
                    currentUser.role === 'admin' ? index === 0 && <MenuItem subItems={subMenuItems[index]} isSelected={selectedIndex === index} itemIndex={index} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} key={index} icon={item.icon} title={item.title} />
                        : index === 1 && <MenuItem subItems={subMenuItems[index]} isSelected={selectedIndex === index} itemIndex={index} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} key={index} icon={item.icon} title={item.title} />)}
            </Box>
        </Box>
    )
}

export default SideMenu