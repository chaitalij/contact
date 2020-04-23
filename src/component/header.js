import React from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import './header.css'

const Header = () => {
    return (
        <AppBar position="fixed">
            <Toolbar className="app-text-content">
                <Typography variant="h5" align="center">Contact Information</Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header;