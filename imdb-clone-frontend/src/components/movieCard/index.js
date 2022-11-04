import React, {useState} from 'react';
import {Card, CardActions, CardContent, CardMedia, Button, Typography, Chip, Stack} from '@mui/material'; 
import {EditMovieModal} from '../';
import {Link} from 'react-router-dom';

export default function MovieCard(props) {
  const [open, setOpen] = React.useState(false);
  const [data,setData] = React.useState(props.data);
  console.log(data);
  const handleClickOpen = () => {
      setOpen(true);
  };

  const handleClose = () => {
      setOpen(false);
  };

  return (
    <Card className='moviecard-card'>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="/img1.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
            {data.plot}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
            Producer: <Chip label={data.producer.name} size="small" />
        </Typography>
      </CardContent>
      
      <CardContent>
        <Typography variant="body2" color="text.secondary">
            Casts: 
            <Stack direction="row" spacing={1}>
                {data.hasOwnProperty('actors') && data.actors.map((item) => {
                    return <Chip label={item.name} size="small" />
                })}
            </Stack>
        </Typography>
      </CardContent>
      <CardActions>
      <Link to={`edit/${data.id}`}>
        <Button size="small" onClick = {handleClickOpen}>Edit Movie</Button>
      </Link>
      </CardActions>
      <EditMovieModal open = {open} handleClose = {handleClose}/>
    </Card>
  );
}
