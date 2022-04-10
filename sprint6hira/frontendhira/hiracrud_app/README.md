
# WEB HEALTH CRAWLER Application

## Project Frontend
The purpose of Web Health Crawler is to monitor availability and latency of public web resources after every minute and publish availability and latency data points of URL to cloudwatch. Create alarm of all URLs that will trigger if availability decreases and latency increases  beyond certain threshold. First three sub-URLs of URL exist in mongoDB will be shown on frontend using d3 hierarchy. Stats of availability and latency of URLs will be presented using HighCharts. User will access these CRUD operations after successfully login to the auth0.

## Technologies Used
- React js 
- Material UI 
- API Gateway
- Auth0
- Netlify

## You can perform following operations
First SignUp/Login to the application using email password or Gmail account. After a successfully login you can acces to profile hain CRUD operations, sub-URLs and Data points from cloudwatch metrics. 
### 1. Insert URL
    Click insert Url button then enter a valid URL eg `www.google.com`. You will be informed wheather your URL inserted or already exists.
### 2. Delete URL
    Click insert URL button and table will be displayed at the top you can click on delete button to delete any URL.
### 3. Edit URL
    Click insert URL button and table will be displayed at the top you can click on edit button and dialog box will appear and you can add new URL and then click Submit and then cancel.
### 4. Display Data Points using High Charts
    Click on Get Data Points button and then enter URL which should exist in table. After a while data points of that URL will appearn in High Chart form.
### 5. Display sub-URLs using d3.hierarchy
     Click on Search button and then enter URL which should exist in table then sub-URLs of entered URL will appear in form of d3.hierarchy.

URL should be in this format www.google.com when send from frontend.

## Working of Frontend

All the requests from frontend will be send through an API Gateway to the backend with an API key provided by API Gateway.
You can test the API GATEWAY:

Go to API Gateway console and write `Content-Type: application/json` in the header select request. if request requires body then the format will be 
```bash
{ 'url' : 'www.google.com'}
```
## Frontend Deployment
Frontend is deployed on netlify, for this you have to run this command on the root of frontend folder i.e

`npm run build` 

and then drag build folder and drop on netlify. Netlify will provide you with url, add this URL to auth0 (Allowed Callback URLs,Allowed Logout URLs,Allowed Web Origins).

## Cypress Testing 
To run cypress test all you need to do is run this command
```bash
node_modules/.bin/cypress open
```
and cypress studio will appear, go to integration folder and click on any file and cypress test will run.

### Setting Up Project
To start project, run 
```bash
mkdir frontendhira && cd frontendhira
```
```bash
npx create-react-app hiracrud_app
```
```bash
npm start
```
Run npm install to install all dependencies

To display URLs from mongoDB in table with pagination, install
```bash 
npm install @mui/x-data-grid
```
```bash 
npm install react-router-dom
```
```bash
npm install highcharts --save
```
```bash
npm i highcharts-react-official
```
Install axios
```bash
npm install axios
```
```bash
yarn install && yarn dev
```
```bash
npm install cypress eslint-plugin-cypress
```
```bash
node_modules/.bin/cypress open
```
```bash
npm install @auth0/auth0-react
```
```bash
npm run build
```
### HAPPY CODING!

