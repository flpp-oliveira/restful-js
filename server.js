const express = require('express');
const app = express();
const data = require("./data.json")

app.use(express.json());


app.get("/clients", function(req, res){
    res.json(data);
});

app.get("/clients/:id", function(req, res){
    const { id } = req.params
    const client = data.find(cli => cli.id == id);

    if (!client) return res.status(404).json();
    
    res.json(client)
});

app.post("/clients", function(req, res){
    const { name, username, email } = req.body;
   
    res.json({ name, username, email });
});

app.put("/clients/:id", function(req, res){
    const { id } = req.params;
    const client = data.find(cli => cli.id == id);

    if (!client) return res.status(204).json();

    const { name } = req.body;
    const { username } = req.body;
    const { email } = req.body;
    
    client.username = username;
    client.name = name;
    client.email = email;

    res.json(client);
});

app.delete("/clients/:id", function(req, res){
    const { id } = req.params;
    const clientsFiltered = data.filter(client => client.id != id);

    res.json(clientsFiltered);
});

app.listen(3000,function(){
    console.log("Server is running");
})