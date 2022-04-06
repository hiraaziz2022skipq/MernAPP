const fetch = require("node-fetch");
const cheerio = require("cheerio");

const getSuburls = async (url) => {
    const sub_url=[]
    try {
            url= "https://"+url+"/"
            const response = await fetch(url)
            const body = await response.text();

            const $ = cheerio.load(body);
            const listItems = $("a");
            const sub_url=[]
            let i=0

      for(let i=0; i<3; i++){
            sub_url[i]=$(listItems[i]).attr('href')
        }
            return (sub_url)
        }
    catch(err){
        console.log(err)
         sub_url[0]="1"
         sub_url[0]="2"
         sub_url[0]="3"
         return sub_url

    }
};



module.exports.getSuburls = getSuburls

