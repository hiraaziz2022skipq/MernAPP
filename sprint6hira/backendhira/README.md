# WEB HEALTH CRAWLER Application

## Project Backend
The purpose of Web Health Crawler is to monitor availability and latency of public web resources after every minute and publish availability and latency data points of URL to cloudwatch. Create alarm of all URLs that will trigger if availability decreases and latency increases  beyond certain threshold. Fetch sub-URLs using Node Fetch and Cheerio. Get the datapoints of availability and latency from cloudwatch. Storing all URLs in mongo DB.

## Technologies Used
- Express js
- Mongo DB
- AWS Lambda
- CloudWatch
- API Gateway
- Node Fetch & Cheerio

## You can perform following operations
1. get
2. put
3. post
4. delete
5. get/search/url
6. get/getdata/url

URL that will be send to the mongo DB will be in the following format
`{ 'url' : 'www.google.com' }`

## Working of Backend

All the requests from frontend will be send through an API Gateway to the backend with an API key provided by API Gateway. Request will send from express.js to mongo DB and find URL in mongoDB if found then process the request otherwise send a message to the frontend.

## Useful commands
```bash
npm i --save body-parser
```
```bash
npm install @vendia/serverless-express
```
To scrap sub-URLs of URl, install these dependencies
```bash
npm i --save node-fetch cheerio
npm install node-fetch
npm install node-fetch@2

```

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template
