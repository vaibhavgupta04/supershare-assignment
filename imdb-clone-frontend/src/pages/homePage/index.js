import React, {useState} from 'react';
import Grid from '@mui/material/Grid';
import {NavBar, MovieCard} from '../../components';

export default function HomePage() {
    const [fetchData,setFetchData] = React.useState({
        loading: false,
        data: {},
        err: false,
        errMsg: '',
    })
    
      const baseUrl = 'http://localhost:8000';
      
      React.useEffect(() => {
        setFetchData({
            ...fetchData,
            loading: true
        })
        fetch(`${baseUrl}/movie/`)
         .then((response) => response.json())
         .then((data) =>{
            setFetchData({
                ...fetchData,
                data: data,
                loading: false
            })
         })
         .catch((err) => {
            setFetchData({
                ...fetchData,
                loading: false,
                err: true,
                errMsg: err
            })
         });
    
         console.log(fetchData);
    }, []);
    return (
        <Grid sx={{ flexGrow: 1 }} container justifyContent={'center'} spacing={2}>
            <NavBar />
            <Grid item xs={12}>
                <Grid container justifyContent="center" spacing={2}>
                    {!fetchData.loading && (fetchData.data.hasOwnProperty('data')) && fetchData.data.data.map((item) => (
                    <Grid key={item.id} xs={4} className="moviecard" item>
                            <MovieCard data={item} />
                    </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
}
