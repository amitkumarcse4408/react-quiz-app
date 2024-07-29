import { useState } from 'react'
import './App.css'

function App() {

  let [counter, setCounter]=useState(15)

  //let counter=15
  
  console.log(counter);

  const addValue=()=>{

    //counter++;
    if(counter<20){
    setCounter(counter+1)
    }
    //console.log(counter);

  }
  const removeValue=()=>{
    if(counter>0){
    setCounter(counter-1);
    //console.log(counter);
    }
  }

  
  return (
    <>
    <h1>Chai aur react</h1>
    <h2>Counter Value: {counter}</h2>

    <button onClick={addValue}
    >Add Value {counter}</button>
    <br /> <br />
    <button onClick={removeValue}
    >Remove value {counter}</button>
    {/* <br />
    <footer1>You Reached the minimum limit</footer1>
    <br />
    <footer2> You Reached the maximum limit</footer2> */}
    </>
  )
}

export default App
