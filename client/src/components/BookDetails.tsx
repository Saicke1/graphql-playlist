import React from 'react';
import { getBookQuery } from "../queries/queries";
import { useQuery } from '@apollo/client';

type Props = {}

const BookDetails = (props: Props) => {
  return (
    <div id='book-details'>
        <p>Output book details here:</p>
    </div>
  )
}

export default BookDetails