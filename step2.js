const fs = require('fs');
const argv = process.argv.slice(2);

const axios = require('axios');

function cat(path){
    fs.readFile(path, 'utf8', (err, data) => {
        if(err){
            console.log('ERRROR:', err);
            process.kill(1)
        }
        console.log(data)
    })
}

function webCat(url){
    axios.get(`${url}`)
        .then(res => {
            console.log(res.data);
        })
        .catch(err => {
           console.log(`Error fetching ${url}:`)
           console.error(`Error: Request failed with status code ${err.response.status}`)
        })
}

if(argv[0].startsWith("http")){
    webCat(argv[0])
} else {
    cat(argv[0])
}

