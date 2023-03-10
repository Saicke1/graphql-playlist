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
//importiere cors, weil es installiert wurde mit: npm install cors
import cors from "cors";

dotenv.config({ path: "./.env.local" });

const connectionString = process.env.MONGODB_URI;

//call die express Funktion, welche du importiert hast
const app = express();

//allow cross origin requests
app.use(cors());

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