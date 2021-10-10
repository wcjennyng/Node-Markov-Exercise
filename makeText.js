/** Command-line tool to generate Markov text. */

const fs = require('fs')
const axios = require('axios')

const markov = require('./markov')
const path = require('path')

//Read markov file and generate text
function makeText(path) {
    fs.readFile(path, "utf8", function(err, data)  {
        if (err) {
            console.error(`${path} not found. ${err}`)
            process.exit(1)
        } else {
            generate(data)
        }
    })
}

//Make markov machine and generate text
function generate(text) {
    let mm = new markov.MarkovMachine(text)
    let generated = mm.makeText()
    console.log(generated)
}



//Read URL and generate text
async function makeURLText(url) {
let res;
    try {
        res = await axios.get(url)
    } catch (err) {
        console.error(`${url} not working. ${err}`)
        process.exit(1)
    }
    generate(res.data)
}

let type = process.argv[2]
let route = process.argv[3]

if (type === 'file') {
    makeText(route)
} else if (type === 'url') {
    makeURLText(route)
} else {
    console.error(`${type} not found. Please try again.`)
    process.exit(1)
}
