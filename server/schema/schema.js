//importiere graphql
import graphql from "graphql";
//importiere lodash nachdem du es installiert hast: npm install lodash
import _ from "lodash";
//importiere beide model Dateien author.js und book.js
import Book from "../models/book.js";
import Author from "../models/author.js";

//Erstelle nun eine Konstante mit der Funktion aus dem graphql Paket, indem du es destructure's
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql;

//dummy data books
/* var books = [
    {name: "Name of the Wind", genre: "Fantasy", id: "1", authorId: "1"},
    {name: "The Final Empire", genre: "Fantasy", id: "2", authorId: "2"},
    {name: "The Long Earth", genre: "Sci-Fi", id: "3", authorId: "3"},
    {name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2'},
    {name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3'},
    {name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3'}
]; */

//dummy data authors
/* const authors =  [
    {name: 'Patrick Rothfuss', age: 44, id:"1"},
    {name: 'Brandon Sanderson', age: 42, id:"2"},
    {name: 'Terry Pratchett', age: 66, id:"3"},
]; */

//hier werden nun im Schema die Objekte definiert, damit graphql weiß, wie der Graph der einzelnen Objekte aussieht

//definiere nun einen neuen Objekttypen für Books
const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args){
                //console.log(parent);
                //return _.find(authors, { id: parent.authorId})
                return Author.findById(parent.authorId);
            }
        }
    })
});

//definiere nun einen neuen Objekttypen für Authors
const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                //console.log(parent);
                //return _.filter(books, { authorId: parent.id})
                //es bedeutet: filter mir bitte aus den Büchern alle authorenIds,
                //welche gleich sind mit der author iD aus AuthorType
                return Book.find({ authorId: parent.id });
            }
        }
    })
});

//definiere den Root Query
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args){
                //hier steht der code, um die Daten von der Database oder jedem anderen x-beliebigen Quelle zu erhalten
                //return _.find(books, { id: args.id })
                return Book.findById(args.id);
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args){
                //return _.find(authors, { id: args.id })
                return Author.findById(args.id);
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                //return books
                return Book.find({});
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                //return authors
                return Author.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addAuthor: {
            type: AuthorType,
            args: { 
                name: { type: GraphQLString },
                age: { type: GraphQLInt }
            },
            resolve(parent, args){
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: GraphQLString},
                genre: { type: GraphQLString},
                authorId: { type: GraphQLID}
            },
            resolve(parent, args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                return book.save();
            }
        }
    }
});

const GraphSchema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

export default GraphSchema;