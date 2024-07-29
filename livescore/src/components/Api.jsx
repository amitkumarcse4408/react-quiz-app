const API_KEY="e68174a7-7853-478f-a870-0fd7bf6316ab"

export const getMatches=(match)=>{
    const url=`https://api.cricapi.com/v1/matches?apikey=${API_KEY}`;

    return fetch(url).then((response)=>response.json()).catch((error)=> console.log("Error",error));
}