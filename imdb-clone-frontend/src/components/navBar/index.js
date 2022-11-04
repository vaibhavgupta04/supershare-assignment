import React, {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {EditMovieModal} from '../';
import {Link} from 'react-router-dom';

export default function ButtonAppBar() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Box className="navbar" sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                IMDB Clone
            </Typography>
            <Link to = '/add' className='nU'>
                <Button className='addmoviebutton' color="inherit" >Add Movie</Button>
            </Link>
            </Toolbar>
        </AppBar>
        <EditMovieModal isUpdate = {false} open = {open} handleClose = {handleClose} />
        </Box>
    );
}
