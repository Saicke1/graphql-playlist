import React, { Key, useState } from 'react';
import { BookData } from '../@types';
import { useQuery } from '@apollo/client';
import { getBooksQuery } from "../queries/queries";
import BookDetails from './BookDetails';

type Props = {}

const BookList = (props: Props) => {

    const [selected, setSelected] = useState<Key>();

    const { loading, error, data } = useQuery(getBooksQuery);

    if (loading) return <p>Books Loading...</p>;
    if (error) return <p>Error :(</p>;

  return (
    <div>
        <ul id="book-list">
            {data.books.map((book: BookData) => (
                <li key={book.id} onClick={() => setSelected(book.id)}>{book.name}</li>
            ))}
        </ul>
        {/* <BookDetails bookId={selected}/> dies ist auch möglich, aber dann muss in BookDetails undefinied deklariert sein*/}
        {selected ? <BookDetails bookId={selected} /> : <div>No book selected...</div>}
    </div>
  )
}

export default BookList;