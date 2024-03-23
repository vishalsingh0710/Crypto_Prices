import React from 'react'
import {AppBar, Container, MenuItem, Select, ThemeProvider, Toolbar, Typography, createTheme, makeStyles } from '@material-ui/core'
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';

const useStyles = makeStyles(()=> ({
    title: {
        flex:1,
        color:'gold',
        fontWeight:'bold',
        cursor:'pointer'
    }
}))
const Header = () => {
    const classes =useStyles();
    const navigate = useNavigate();
    const {currency,  setCurrency} = CryptoState();
    const darkTheme = createTheme({
        palette: {
            primary : {
                main:'#fff',
            },
            type:"dark"
        }
    })
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position='static' color='transparent'>
        <Container>
            <Toolbar>
                <Typography className={classes.title} onClick={() => navigate("/")}>
                    Crypto hunter
                </Typography>
                <Select variant='outlined'
                    style = {{width:100,
                    height:40,
                    marginLeft:15
                    }}
                    value = {currency}
                    onChange={(e)=> setCurrency(e.target.value)}>
                    <MenuItem value={'INR'}>INR</MenuItem>
                    <MenuItem value={'USD'}>USD</MenuItem>
                </Select>
            </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  )
}

export default Header
