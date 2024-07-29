import { Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import React from 'react'
import vsImage from '../assets/vs.png';

const MyCard = ({match}) => {

    const getMatchCard=()=>{
        return (
            <Card>
                <CardContent>
                    <Grid container justifyContent="center">
                        <Grid item alignContent="center">
                            <Typography variant='h5'>First Text</Typography>
                        </Grid>
                        <Grid item>
                            <Typography><img style={{width:80, height:120}} src={vsImage} alt="" /></Typography>
                        </Grid>
                        <Grid item alignContent="center">
                            <Typography variant='h5'>Second Text</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions>
                    <Grid container justifyContent="center">
                    <Button variant="contained">Show Details</Button>
                    <Button variant="contained">Show Date :{new Date().toString()}</Button>
                    </Grid>
                </CardActions>
            </Card>
        )
    }
  return getMatchCard();
}   
export default MyCard
