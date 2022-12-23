import { useState, useEffect } from 'react'


function App() {
  // Need this unique value to send the GET request. We receive it from the POST request
  const [operationLocation, setOperationLocation] = useState([]);
// We will add the text from the image to this variable
  const [getText, setGetText] = useState('');

// We make a POST request to this URL
  let url = "https://ai-102-learning.cognitiveservices.azure.com//vision/v3.2/read/analyze";
  // Options for POST request
  const options = {
    // Change the image url to any you like that has text
    body: (JSON.stringify({ "url": "https://i.stack.imgur.com/i1Abv.png" })),
    headers: {
      // Need to set this parameter or else won't work due to CORS
      "Access-Control-Allow-Origin": "*",
      // This is the value we need to get in the header request
      "Access-Control-Expose-Headers": "operation-location",
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": import.meta.env.VITE_API_KEY
    },
    method: "POST",
    mode: 'cors',
    credentials: "same-origin"
  };


  // Options for Get request
  const optionsGet = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      'Accept': 'application/json',
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": import.meta.env.VITE_API_KEY
    },
    method: "GET",
    mode: 'cors',
    credentials: "same-origin"
  };



useEffect(()=> {
  // Post request
  const fetchData = () => {
    fetch(url, options)
    // Setting the operation location value from the header
    .then(res => setOperationLocation(res.headers.get('operation-location')))   
      console.log(operationLocation)
       }
      
      // Get request
    const getData = () => {
      // Passing the operation location value from the POST request into our GET request
      fetch(operationLocation, optionsGet)
      .then((res) => {
        if (res.ok) {
          return res.json()
        }    
      })
      .then((json)=> {
        // The response returns an array of text. The text gets broken up into multiple lines
        const textArray = json.analyzeResult.readResults[0].lines;
        // Map through the response to get each individual text
        const textOutput = textArray.map(item => item.text) //returns an array
        // Use the join method to get rid of the commas in the array so it returns a string
        const textOutputString = textOutput.join(' ')
        setGetText(textOutputString)    
      })
      .catch(err => {
        console.log(err)
      })
      
    }  
  // Asyncrhonously make the requests. We need to wait for response from the POST request before we execute the GET request
    async function callApi () {
      if (operationLocation) { 
      await fetchData ()
      console.log('post request successful')
      console.log(operationLocation)
      await getData()
      console.log('get request succesful')
    }
  }

    callApi();

}, [getText])

// We check to see if the request has populate state and then we render the response
if (getText) {
    return (
    <div className="App">
<p>{getText}</p>

    </div>

  )
}

}

export default App
