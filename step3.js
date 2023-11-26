const fs = require('fs');
const argv = process.argv.slice(2);

const axios = require('axios');
const { argv0 } = require('process');

function cat(path, output){
    fs.readFile(path, 'utf8', (err, data) => {
        if(err){
            console.log(`Error reading ${path} ${err}`)
            process.exit(1)
        }
        catWrite(output, data)
    })
}

function webCat(url, output){
    axios.get(`${url}`)
        .then(res => {
            catWrite(output, res.data)
        })
        .catch(err => {
           console.log(`Error fetching ${url}`)
           process.exit(1);
           
        })
}

function catWrite(output, data){
    if(output){
        fs.writeFile(output, data, "utf8", err => {
            if(err){
                console.log(`Error writing ${data} ${err}`)
                process.exit(1)
            }
        })
    } else {
        console.log(data)
    }
}


let output;

if(argv.length > 1){
    if(argv[2].startsWith("http")){
        webCat(argv[2], argv[1])
    } else {
        cat(argv[2], argv[1])
    }
} else {
    if(argv[0].startsWith("http")){
        console.log(argv[0], output)
        webCat(argv[0], output)
    } else {
        cat(argv[0], output)
    }
}


