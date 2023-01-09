import React, { Key } from 'react'
import { gql, useQuery } from '@apollo/client';
/* import { graphql } from '@apollo/client/react/hoc'; */

type Props = {}

interface BookData {
    id: Key,
    name: String
}

const getBooksQuery = gql`
    {
        books{
            name
            id
        }
    }
`

const BookList = (props: Props) => {
    /* console.log(props);
    console.log('typeof props', typeof props) */

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
    </div>
  )
}



export default BookList;
/* export default graphql(getBooksQuery)(BookList); */