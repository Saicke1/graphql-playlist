import React from 'react';
import { BookData } from '../@types';
import { useQuery } from '@apollo/client';
import { getBooksQuery } from "../queries/queries";
import BookDetails from './BookDetails';

type Props = {}

const BookList = (props: Props) => {

    const { loading, error, data } = useQuery(getBooksQuery);

    if (loading) return <p>Books Loading...</p>;
    if (error) return <p>Error :(</p>;

  return (
    <div>
        <ul id="book-list">
            {data.books.map((book: BookData) => (
                <li key={book.id}>{book.name}</li>
            ))}
        </ul>
        <BookDetails/>
    </div>
  )
}



export default BookList;