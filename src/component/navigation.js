import React from 'react'
import { makeStyles, MenuList, MenuItem, IconButton } from '@material-ui/core';
import ViewListIcon from '@material-ui/icons/ViewList';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import browserHistory from '../history';

const useStyles = makeStyles({
    root: {
      width: "20vw",
      float: "left",
      marginTop: 64,
      position: "fixed",
      height: "100vh",
      backgroundColor: "#3f51b5",
      color: "#fff"
    },
    icon: {
        color: "#fff"
    },
    isApplied: {
        backgroundColor: "#fff",
        color: ""
    },
    iconPadding : {
        paddingRight: 10
    }
  });

  
const NavigationTab = () =>  {
    const classes = useStyles();

        return(
            <MenuList className={classes.root}>
                <MenuItem>
                    <IconButton
                        aria-label="more"
                        aria-controls="long-menu"
                        aria-haspopup="true"
                        className={classes.icon}
                        href="/">
                        <ViewListIcon fontSize="small" color="inherit" className={classes.iconPadding}/>
                        Contact List
                    </IconButton>
                </MenuItem>
                <MenuItem>
                    <IconButton
                        aria-label="more"
                        aria-controls="long-menu"
                        aria-haspopup="true"
                        className={classes.icon}
                        onClick={() => browserHistory.push("/addContact")}>
                        <AddCircleIcon fontSize="small" color="inherit" className={classes.iconPadding}/>
                        Add Contact
                    </IconButton>
                </MenuItem>
            </MenuList>
        )

}

export default NavigationTab