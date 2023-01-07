//importiere express, weil es installiert wurde mit: npm install express
import express from "express";
//importiere graphql, weil es installiert wurde mit: npm install express-graphql
import { graphqlHTTP } from "express-graphql";
//importiere das schema
import schema from "./schema/schema.js";
//importiere mongoose, weil es installiert wurde mit: npm install mongoose
import mongoose from "mongoose";
//importiere dotenv, weil es installiert wurde mit: npm install dotenv
import * as dotenv from "dotenv";

dotenv.config({ path: "./.env.local" });

const connectionString = process.env.MONGODB_URI;

//call die express Funktion, welche du importiert hast
const app = express();

//2. In VS Code, open the Command Palette.
//Click on "View" and open "Command Palette."
//Search "MongoDB: Connect" on the Command Palette and click on "Connect with Connection String."

//3. Connect to your MongoDB deployment.
//Paste your connection string into the Command Palette.

//4. Click "Create New Playground" in MongoDB for VS Code to get started.

//connect to MongoDB Database
//make sure to replace the <password> with your the password set in MongoDB for the user
mongoose.set('strictQuery', true);
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
    console.log('Connected to library database')
})
.on('error', (error)=> {
    console.log(error.message);
});

//erstelle ein middleware, wo die funktion graphqlHTTP aufgerufen wird, da diese graphql versteht
app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}));

//nun sagen wir unserer App, zu welchem Port auf unserem Computer sie hören soll
app.listen(4000, () => {
    console.log("Server is now listening for requests at port 4000.");
});