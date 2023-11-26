const fs = require('fs');
const argv = process.argv.slice(2);

function cat(path){
    fs.readFile(path, 'utf8', (err, data) => {
        if(err){
            console.log('ERRROR:', err);
            process.kill(1)
        }
        console.log(data)
    })
}

cat(argv[0])