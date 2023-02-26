
//------------------------------------------------------------------------------//
let express =  require("express");
let mongoC = require("mongodb");
let cors = require("cors");// cors
let PORT_NO = 9090; // endport no
let parser = require("body_parser"); // tparse json
let DB_URL = "mongodb://localhost:27017"; //url of mongoC.Db

let app = express() ; //express object
let mongoClient = mongoC.MongoClient;
app.use(parser.json()); // bodyparser
app.use(cors()); //initailize cors

//------------------------------------------------------------------------------//

//listen to call port
app.listen(PORT_NO, () => console.log('Server started'));

//------------------------------------------------------------------------------//

//Register user profile
app.post("/Profile", (request, reponse) => {
   let post_data = request.body;
   mongoClient.connect(DB_URL, {useNewUrlParser:true})
   .then((client) => {
    let client_db = client.db("mydb");
    client_db.collection("Profile")
    .insertOne(post_data)
    .then(() => response.status(201).json({"message":"Profile registration succesful"}))
    .catch(() => response.status(404).json({"error": "Profile registration unsuccessful"}))
    .finally(() => client.close())
   })
   .catch(() => response.status(404).json({"error":"Failed to Connect"}))
});

// Contact registration
app.post("/Contact", (request, reponse) => {
    let post_data = request.body;
    mongoClient.connect(DB_URL, { useNewUrlParser: true })
        .then((client) => {
            let client_db = client.db("mydb");
            client_db.collection("Contact")
                .insertOne(post_data)
                .then(() => response.status(201).json({ "message": "Contact registration succesful" }))
                .catch(() => response.status(404).json({ "error": "Contact registration unsuccessful" }))
                .finally(() => client.close())
        })
        .catch(() => response.status(404).json({ "error": "Failed to Connect" }))
});

//get and show requested contacts
app.get("/Contacts", (request, response) => {
    mongoClient.connect(DB_URL, {userNewUrlParser: true})
    .then((client) => {
        let save_contacts = [];
        let data_db = client.db("mydb");
        let cursor = data_db.collection("Contacts").find();
        cursor.forEach(dataPoint => save_contacts.push(dataPoint))
        .then(() => response.json(contacts))
        .finally(() => client.close())
    })
        .catch(() => response.status(404).json({ "error": "Failed to Connect"}))
})

//Delete Contacts using id
app.delete("/Contacts/:id", (request,reponse) =>{
    let id = parseInt(request.params.id);
    mongoClient.connect(DB_URL, {useNewUrlParser: true})
    .then((client) => {
        let data_db =client.db("mydb");
        data_db.collection("Contacts")
        .deleteOne({_id: id})
        .then((delValue) => response.status(200).json(value))
        .catch((err)=> response.status(404).json(err))
        .finally(() => client.close())
    })
        .catch(() => response.status(404).json({ "error": "Failed to Connect" }))
})


//update Profile
app.put("/profile/:id", (request, reponse) => {
    let id = parseInt(request.params.id);
    let data_db = request.body;
    mongoClient.connect(DB_URL, {useNewUrlParser: true})
    .then((client) => {
        let db = client.db("mydb");
        data_db.collection("Profile")
        .updateOne({_id:id}, {$set: data})
        .then((value) => response.status(200).json(value))
        .catch((err) => response.status(404).json(err))
        .finally(() => client.close())
    })
        .catch(() => response.status(404).json({ "error": "Failed to Connect" }))
});





