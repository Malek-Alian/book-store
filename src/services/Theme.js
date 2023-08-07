import { createTheme } from "@mui/material"

const Theme = createTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#0eb49b',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#ff9b8a',
        },
        text: {
            primary: '#ffffff',
            secondary: '#0dd0b3',
        },
        background: {
            default: '#020406',
            paper: '#0a101b',
            item: 'rgba(13, 208, 179, 0.1)'
        },
        error: {
            main: '#f44336',
        },
        divider: 'rgba(255,255,255,0.12)',
    },
})

export default Theme