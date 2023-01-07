//importiere mongoose, weil es installiert wurde mit: npm install mongoose
import mongoose from "mongoose";

const Schema = mongoose.Schema;

//Jetzt wird ein schema für unser Buch erstellt
const bookSchema = new Schema({
    name: String,
    genre: String,
    authorId: String
});

//erstelle eine collection in MongoDB mit dem Namen Book, welches die objekte definiert in bookSchema enthält
const bookModel = mongoose.model("Book", bookSchema);

export default bookModel;