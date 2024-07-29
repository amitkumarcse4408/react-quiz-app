import { Fragment, useEffect,useState } from 'react';
import React from 'react'
import Navbar from './components/Nav';
import {getMatches} from './components/Api'
import MyCard from './components/MyCard'
import { Grid } from '@mui/material';

function App() {

  const [matches,setMatches]=useState([]);

  useEffect(()=>{
    getMatches().then((data)=>setMatches(data)).catch();
  },[])

  return (
    <>
      <Navbar/>
      <h1 style={{ textAlign: "center" }}>Cricket Matches</h1>
      {/* <Grid container>
          <Grid sm="2"></Grid>
          <Grid sm="8">
            
          </Grid>
          
      </Grid> */}
      
      {matches.length > 0 ? (
        matches.map(match => (
          <div key={match.id}>
            <h2>{match.name}</h2>
            <p>Venue: {match.venue}</p>
            <p>Date: {match.date}</p>
            <div>
              {match.teamInfo.map(team => (
                <div key={team.shortname}>
                  <p>Team Name: {team.name}</p>
                  <img src={team.img} alt={`${team.name} logo`} />
                </div>
              ))}
            </div>
            <MyCard match={match} />
          </div>
        ))
      ) : (
        <div>No matches available</div>
      )}
    
    </>
  )
}
export default App 
