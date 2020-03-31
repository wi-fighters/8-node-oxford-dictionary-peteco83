#!/usr/bin/env node

require('dotenv').config()

const axios = require("axios")

const [word] = process.argv.slice(2)

axios(`https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/${word}?strictMatch=false`, {
    "method": "GET",
    "headers": {
        "app_id": process.env.API_ID,
        "app_key": process.env.API_KEY
    }

}).then(res => {
    const lexicalEntries = res.data.results[0].lexicalEntries[0]
    const definitions = lexicalEntries.entries[0].senses
    console.log(`${word} (${lexicalEntries.lexicalCategory.text})`)
    definitions.map((def, i) => {
        console.log(`${i + 1}. ${def.definitions}`)
    })
    console.log(`Provided by: ${res.data.metadata.provider}`)
}).catch(err => console.log(err))
