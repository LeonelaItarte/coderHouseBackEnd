const express = require('express') ;
const { get } = require('express/lib/response');

const app = express();

const PORT = process.env.PORT || 8080;

const fs = require('fs');

class Contenedor{

    constructor(name){
        this.name= `./${name}.txt`

    }


    async getAll(){
        try{
        let response  =await fs.promises.readFile(`./${this.name}`, "utf-8")
        return await JSON.parse(response) 
         
        }
        catch(error){
            console.log(error)
        }
    }
}

const documento = new Contenedor ('productos')


app.get('/productos',(req,res)=>{
    documento.getAll()
    .then(lista=>{
        res.json(lista)
    })
})

app.get('/productosRandom',(req,res)=>{
    documento.getAll()
    .then(itemLista=>res.json(itemLista[0]))
})

const server= app.listen(PORT,()=>console.log(`Server listening on PORT ${PORT}`));

server.on("error", error => console.log("Errooor"))

