//importiere mongoose, weil es installiert wurde mit: npm install mongoose
import mongoose from "mongoose";

const Schema = mongoose.Schema;

//Jetzt wird ein schema für unseren Author erstellt
const authorSchema = new Schema({
    name: String,
    age: Number
});

//erstelle eine collection in MongoDB mit dem Namen Author, welches die objekte definiert in authorSchema enthält
const authorModel = mongoose.model("Author", authorSchema);

export default authorModel;