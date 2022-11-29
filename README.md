#####
Call Microsoft Azure Optical Character Recognition (OCR) Read service as part of the Computer Vision API

This codebase is a boilerplate for calling the Azure Computer Vision 3.2 General Availability (GA) API via React using Fetch

The objective is to read the text from an image

To do this you will need an Azure subscription and to set up a Computer Vision resource in Azure where you will get an API key. The full docs are here:
https://learn.microsoft.com/en-us/azure/cognitive-services/computer-vision/how-to/call-read-api

To sucessfully return the text from an image is two parts:
1. Send a GET request to the API that returns the endpoint plus a unique ID
2. Make a GET request to the API that returns the response headers

The response headers are nested object and parts of the text are returned across multiple objects so the last part is where we map over the array to combine it into a string to be returned

The string gets rendered as a HTML element

To get the result, the development environment needs to be run twice. I.e run npm run dev, you will notice an error that it can only return HTML. Hit save in your environment to re-render
and you should see some success

#####
Other things to know

This project was setup using React Vite: https://vitejs.dev/guide/

The API is stored in a .env file, you will need to create your own and you will notice the import.meta.env syntax which is how .env variables are referenced via Vite

#######################
Some further aspirations I have for this project is that there is a form in controlled State where users can input custom urls to be rendered by the service
Also, figuring out why it only renders on restart
Lastly, that the service reads from an uploaded image from the user

