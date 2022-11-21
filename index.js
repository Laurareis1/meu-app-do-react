const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let listOfPersons = [
    {
        id: 11,
        name: "Carla",
        phone: 54521
    },
    {
        id: 12,
        name: "Alvinho",
        phone: 5638290
    },
    {
        id: 13,
        name: "Vera",
        phone: 5638424
    },
    {
        id: 14,
        name: "Maria",
        phone: 445544
    }
];

function generateId() {
    const lastPerson = listOfPersons[listOfPersons.length-1];
    return lastPerson.id+1;
}
app.get('/persons/:id',(req,res)=>{
   let resultado=null;
   let searchId =req.params.id

    for(let person of listOfPersons){
        if(person.id ==searchId ){
           resultado=person
           res.send(resultado)
           return;
        }
    }
    res.status(404);
    res.send({message: `Person with id ${searchId} not found!`});
})
app.put('/persons/:id',(req,res)=>{
    const seeId =req.params.id;
    let dataToUpdate= req.body;

    for(let person of listOfPersons){
        if(person.id ==seeId ){
        person.name=dataToUpdate.name;
        person.phone=dataToUpdate.phone
        return;
        }
    }
    res.status(404);
    res.send({message: `Person with id ${seeId} not found!`});
})
app.delete('/persons/:id',(req,res)=>{
    let searchId =req.params.id;
    let I = '';
    for(let pos in listOfPersons){
        if(listOfPersons[pos].id ==searchId ){
            I=pos; 
        }
    }
    listOfPersons.splice(I,1)
    res.send({message: `Person with id ${searchId} is delet!`})
})

app.get('/persons', (req, res) => {
    const searchName = req.query.name;
    if(searchName!=undefined) {
        let result = [];

        for(let person of listOfPersons) {
            if (person.name == searchName) {
                result.push(person);
                
            }
        }

        res.send(result);
    } else {
        res.send(listOfPersons);
    }

})

app.post('/persons', (req, res) => {
    
    const newPerson = req.body;
    newPerson.id=generateId() 
    listOfPersons.push(newPerson);
    res.send(listOfPersons);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})