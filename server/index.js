const express = require('express')  
const axios = require("axios")

const app = express()
app.use(express.json())


app.get('/poke', async (req, res) => {
    try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon')
        if (response) {
            console.log(response.data)
            res.set("Access-Control-Allow-Origin", "*")
            res.status(200).json(response.data)
        }
    } catch(error) {
        console.log(error)
    }
})


const PORT = process.env.PORT || 8000    
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
 
})