import { React, useState, useEffect } from 'react';

export default function Api(props) {
  // Need this unique value to send the GET request. We receive it from the POST request
  const [operationLocation, setOperationLocation] = useState(null);

 
  // We will add the text from the image to this variable
  const [getText, setGetText] = useState(null);

  const [userUrl, setUserUrl] = useState('');

  const [loading, setLoading] = useState(false);

  const [responseHeaders, setResponseHeaders] =useState ({})


  // We make a POST request to this URL
  let url = `${import.meta.env.VITE_ENDPOINT}.cognitiveservices.azure.com/vision/v3.2/read/analyze`;
  // Options for POST request
  const options = {
    // Change the image url to any you like that has text
    body: (JSON.stringify({ "url": props.UserUrl })),
    headers: {
      // Need to set this parameter or else won't work due to CORS
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
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
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
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
    const fetchData = async () => {
      setLoading(true)
      fetch(url, options)
      // Setting the operation location value from the header
      .then((res) => {
        return setOperationLocation(res.headers.get('operation-location'))
      })   
      // On first render, operationLocation value is not being returned, returns null
       .then(console.log(operationLocation))
         }
        
        // Get request
      const getData = async () => {
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
  
          setLoading(false)
        })
        .catch(err => {
          console.log(err)
        })
        
      }  
    // Asyncrhonously make the requests. We need to wait for response from the POST request before we execute the GET request
  
      async function callApi () {     
        await fetchData ()
        console.log('post request successful')
        console.log(operationLocation)
        await getData()
        console.log('get request succesful')
      setLoading(false)
    } 

      callApi();
  
  }, [props.UserUrl])
  
  // We check to see if the request has populate state and then we render the response
  if (loading) {
      return (
       <div>
        Loading...
       </div>
      )} else {
        return (
           <div className="center">
        <p>{getText}</p>
      <p>{props.UserUrl}</p>
    </div>
        )
      }
    }
