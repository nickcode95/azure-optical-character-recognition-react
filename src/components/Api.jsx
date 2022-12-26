import { React, useState, useEffect } from 'react';

export default function Api(props) {
  // Need this unique value to send the GET request. We receive it from the POST request
  const [operationLocation, setOperationLocation] = useState(null);

  const [operationLocation2, setOperationLocation2] = useState(null);
  // We will add the text from the image to this variable
  const [getText, setGetText] = useState(null);

  const [finalText, setFinalText] = useState(null);

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState(null)

  const [responseHeaders, setResponseHeaders] =useState ({})

  const [error, setError] = useState(null);

  console.log(props.UserUrl)

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

const optionsOptions = {
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
"Access-Control-Allow-Methods": "POST, GET",
"Access-Control-Allow-Origin": "*"
}
// Useeffect for POST request

  useEffect(() => {
    // Post request
   
    const fetchData = async () => {
    
      setLoading(true);
      try {
        // Make the POST request
        const response = await fetch(url, options)
        // Wait for the response headers to be received
        setResponseHeaders(response.headers);
        console.log(responseHeaders)
        setOperationLocation(responseHeaders.get('operation-location'))
        console.log(operationLocation)


        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }
     
      } catch (e) {
        setError(e);
      }

      
     
    };

    fetchData();
    
    
  }, [props.UserUrl]);

  // Useeffect for GET request
  useEffect(()=> {
    // Post request
   
    const fetchData = async () => {
    
      setLoading(true);
      try {
        // Make the POST request
        const response = await fetch(url, options)
        // Wait for the response headers to be received
        setResponseHeaders(response.headers);
        console.log(responseHeaders)
        setOperationLocation2(responseHeaders.get('operation-location'))
        console.log(operationLocation2)


        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }
     
      } catch (e) {
        setError(e);
      }

      
     
    };

    fetchData();

  }, [operationLocation])

  

    {if (loading) {
      return(
      <div className="center">Loading...</div>
      )
    } else {
      return (
        <div className="center">
        <p>{getText}</p>
      <p>{finalText}</p>
      <p>{props.UserUrl}</p>
    </div>
      )}
    }}
