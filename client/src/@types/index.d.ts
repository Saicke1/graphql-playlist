import React, { Key } from 'react';

interface AuthorData {
    name: String,
    id: Key
}

interface BookData {
    id: Key,
    name: String
}

interface DataDefinition {
    book: {
        __typename: String,
        name: String,
        genre: String,
        id: String
        author: {
        __typename: String,
        name: String,
        age: Number,
        id: string,
        books: []
        }
    }
}