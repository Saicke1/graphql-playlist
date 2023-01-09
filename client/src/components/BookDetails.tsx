import React, { Key } from 'react';
import { getBookQuery } from "../queries/queries";
import { useQuery } from '@apollo/client';
import { BookData, DataDefinition } from '../@types';

type Props = {
  bookId: Key | undefined
}

const BookDetails = (props: Props) => {

  const { loading, data, error } = useQuery(getBookQuery, {
    variables: {
        id: props.bookId
    }
  });

  if (loading) return <p>loading...</p>
  if (error) return <p>Something went wrong..</p>

  const displayBookDetails = (data: DataDefinition) => {
    const { book } = data;
    console.log('book', book);
    if(book){
      return (
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>All the books by the author: </p>
          <ul className="other-books">
            {book.author.books.map((item: BookData) =>{
              return<li key={item.id}>{item.name}</li>
              })
            }
          </ul>
        </div>
      )
    }
  };

  return (
    <div id='book-details'>
        <p>Output book details here:</p>
        <>{displayBookDetails(data)}</>
    </div>
  )
}

export default BookDetails