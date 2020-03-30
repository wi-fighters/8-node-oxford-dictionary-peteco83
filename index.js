#!/usr/bin/env node

const axios = require("axios")

const [word] = process.argv.slice(2)

axios(`https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/${word}?strictMatch=false`, {
    "method": "GET",
    "headers": {
        "app_id": "0802b425",
        "app_key": "1d537d384f8b9c2c3dd49d2aba413b63"
    }

    }).then(res => {
        const lexicalEntries = res.data.results[0].lexicalEntries[0]
        const definitions = lexicalEntries.entries[0].senses
        console.log(`${word} (${lexicalEntries.lexicalCategory.text})`)
        definitions.map((def, i) => {
             console.log(`${i+1}. ${def.definitions}`)
        })
        console.log(`Provided by: ${res.data.metadata.provider}`)
    }).catch(err => console.log(err))

