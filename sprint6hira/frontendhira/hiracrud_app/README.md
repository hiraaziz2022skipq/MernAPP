
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
1. Insert URL
2. Delete URL
3. Edit URL
4. Display Data Points using High Charts
5. Display sub-URLs using d3.hierarchy

URL should be in this format www.google.com when send from frontend.

## Working of Frontend

All the requests from frontend will be send through an API Gateway to the backend with an API key provided by API Gateway. For Auth0, frontend is deployed on netlify and netlify url is added to auth0.

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

