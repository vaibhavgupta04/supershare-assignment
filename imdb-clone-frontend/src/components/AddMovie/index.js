import React, { useState } from 'react'
import {Link} from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import {useParams} from 'react-router-dom';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}


function AddMovie(props) {
    const {id} = useParams();
    const [editmovieid,seteditmovieid] = React.useState(id);
    const [value, setValue] = React.useState(dayjs('2022'));
    const theme = useTheme();
    const [actorList, setActorList] = React.useState([]);
    const [actorIdList, setActorIdList] = React.useState([]);
    const [producer, setProducer] = React.useState({});
    const [producerId, setProducerId] = React.useState(1);
    const [title, setTitle] = React.useState('');
    const [description,setDescription] = React.useState('');
    const [fileData, setFileData] = useState(undefined);
    

    function handleChange(event) {
        setFileData(event.target.files[0])
    }

    const [editData,setEditData] = React.useState({
        loading: false,
        data: {},
        err: false,
        errMsg: '',
    })

    const [fetchData,setFetchData] = React.useState({
        loading: false,
        data: {},
        err: false,
        errMsg: '',
    })

    const baseUrl = 'http://localhost:8000';

    const postData = async() => {
        let formData = new FormData();
        const movieData = {
                name: title,
                year_of_release: value.$y, 
                plot: description,
                actors: actorIdList,
                producer: producerId
        }
        await formData.append("movieData", JSON.stringify(movieData));
        for (var key of formData.entries()) {
            console.log(key[0], key[1]);
        }
        if(editmovieid){
            if(fileData) {
                await formData.append("poster", fileData);
            }
            fetch(`http://localhost:8000/movie/${editmovieid}/edit`, {
                method: "PUT",
                body: formData,
            }).then(function (res) {
            if (res.ok) {
                alert("Perfect! ");
            } else if (res.status == 401) {
                alert("Oops! ");
            }
            }, function (e) {
            alert("Error submitting form!");
            console.log(e);
            });
        }
        else{
            console.log(fileData);
            await formData.append("poster", fileData);
            fetch("http://localhost:8000/movie/add", {
                mode: 'no-cors',
                method: "POST",
                body: formData,
            }).then(function (res) {
            if (res.status == 401) {
                alert("Error adding movie!");
            } else {
                alert("Movie Added! ");
            }
            }, function (e) {
            alert("Internal Server Error!");
            });
        }
    }

    React.useEffect(() => {
        setFetchData({
            ...fetchData,
            loading: true
        })
        fetch(`${baseUrl}/crew/`)
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

         console.log(editmovieid);
         if(editmovieid)
         {
            setEditData({
                ...editData,
                loading: true
            })
            fetch(`${baseUrl}/movie/${editmovieid}`)
             .then((response) => response.json())
             .then((data) =>{
                setEditData({
                    ...editData,
                    data: data,
                    loading: false
                })
                handleInitialData(data);
                
             })
             .catch((err) => {
                setEditData({
                    ...editData,
                    loading: false,
                    err: true,
                    errMsg: err
                })
             });

             console.log(editData)
             
         }


    }, []);

    const handleInitialData = (data) => {
        setActorList(data.data.actors);
        let list = [];
        data.data.actors.map((item)=>{
            list.push(item.id);
        })
        setActorIdList(list);
        setProducer(data.data.producer);
        setTitle(data.data.name);
        setDescription(data.data.plot);
        setValue(data.data.year_of_release);
    }

    const handleSelectNames = (event) => {
        const {
            target: { value },
        } = event;
        let list = [];
        event.target.value.map((item)=>{
            list.push(item.id);
        })
        setActorIdList(list);
        setActorList(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleSelectProducer = (event) => {
        setProducer(event.target.value);
        setProducerId(event.target.value.id);
    }

    return (
        <>
            <div className="addmoviecontainer">
                <div className='addmovietitle'>
                    <h1>
                        {editmovieid ? "EDIT MOVIE" : "ADD MOVIE"}
                    </h1>
                </div>
                <Box

                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Grid container className='formcontainer-addmovie'>
                        <Grid item xs={12} className="inputfield-addmovie">
                            <TextField id="standard-basic" label="Title" value={title} variant="outlined" onChange = {(e) => setTitle(e.target.value)}/>
                        </Grid>
                        <Grid item xs={12} className="inputfield-addmovie">
                            <TextField id="standard-basic" label="Description" value={description} multiline rows={4} variant="outlined"  onChange = {(e) => setDescription(e.target.value)}/>
                        </Grid>
                        <Grid item xs={12} className="inputfield-addmovie">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    views={['year']}
                                    label="Year only"
                                    value={value}
                                    onChange={(newValue) => {
                                        setValue(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} helperText={null} />}
                                />
                            </LocalizationProvider>
                        </Grid>

                        <Grid item xs={12} className="inputfield-addmovie">
                            <FormControl className="formcontrol-addmovie">
                                <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
                                <Select
                                    labelId="demo-multiple-chip-label"
                                    id="demo-multiple-chip"
                                    multiple
                                    value={actorList}
                                    onChange={handleSelectNames}
                                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Chip key={value.name} label={value.name} />
                                            ))}
                                        </Box>
                                    )}
                                    MenuProps={MenuProps}
                                >
                                    {!fetchData.loading && (fetchData.data.hasOwnProperty('data')) && fetchData.data.data.filter((item)=>item.role==='ACTOR').map((item) => (
                                        <MenuItem
                                            key={item.name}
                                            value={item}
                                            style={getStyles(item.name, actorList, theme)}
                                        >
                                            {item.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} className="inputfield-addmovie">
                            <FormControl className="formcontrol-addmovie">
                                <InputLabel id="demo-simple-select-label-producer">Producer</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label-producer"
                                    id="demo-simple-select-producer"
                                    label="Producer"
                                    value={producer}
                                    onChange={handleSelectProducer}
                                >
                                    {!fetchData.loading && (fetchData.data.hasOwnProperty('data')) && fetchData.data.data.filter((item)=>item.role==='PRODUCER').map((item) => (
                                        <MenuItem
                                            key={item.name}
                                            value={item}
                                            style={getStyles(item.name, actorList, theme)}
                                        >
                                            {item.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} className="inputfield-addmovie">
                            <input type="file" onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} className="form-submit-button">
                        <Link className='go-back-button' to="/"><Button color='error' variant="contained">Go Back</Button></Link>
                        <Button variant="contained" onClick={()=>postData()}>Submit</Button>
                        </Grid>
                    </Grid>
                </Box>
            </div>
            
        </>
    )
}

export default AddMovie