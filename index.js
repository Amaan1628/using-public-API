import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://v2.jokeapi.dev/joke/";

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req,res) => {
    res.render("index.ejs", { content : "Fill in the details to get the joke."})
})

app.post("/saif", async (req,res)=> {
    try {
        const word = req.body.word;
        console.log(req.body);
        let type = req.body.type;
        if (req.body.type == ""){
           type = "Any";
        }
        const result = await axios.get(`${API_URL}/${type}?type=single&contains=${word}`);
        if (result.data.error) {
            res.render("index.ejs", {content: result.data.message})
        } else {
            console.log(result);
            console.log(req.body);
            res.render("index.ejs", {content : result.data.joke} );
        }
    } catch (error) {
        res.status(404).send(error.message);
    }
    });

app.listen(port, ()=>{
    console.log(`server running on ${port}`);
});