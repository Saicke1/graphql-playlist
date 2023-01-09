import React, { Key, useState } from 'react';
import { AuthorData } from '../@types';
import { useQuery, useMutation } from '@apollo/client';
import { getAuthorsQuery, addBookMutation } from "../queries/queries";

type Props = {}

const AddBook = (props: Props) => {

    const [name, setName] = useState("");
    const [genre, setGenre] = useState("");
    const [authorId, setAuthorId] = useState("");

    const { loading, error, data } = useQuery(getAuthorsQuery);
    const [addBook] = useMutation(addBookMutation);

    const displayAuthors = () =>{
        if (loading) return <option disabled>Loading Authors...</option>;
        if (error) return <option disabled>Error Loading Authors</option>;
        if(data){
            const {authors} = data;
            return authors.map((author: AuthorData, index: Key) => {
                return (<option key={index} value={author.id}> {author.name} </option>);
            })
        }
    };

    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const collectedData = {name, genre, authorId};
      console.log(collectedData);
      addBook(
        { variables: collectedData }
      );
    };

  return (
    <div>
        <form id="add-book" onSubmit={submitForm}>
        <div className="field">
          <label>Book name:</label>
          <input type="text" value={name} onChange={(e) => {setName(e.target.value)}}/>
        </div>
        
        <div className="field">
          <label>Genre:</label>
          <input type="text" value={genre} onChange={(e) => {setGenre(e.target.value)}}/>
        </div>


        <div className="field">
          <label>Author:</label>
          <select value={authorId} onChange={(e) => {setAuthorId(e.target.value)}}>
            <option>Select Author</option>
            {displayAuthors()}
          </select>
        </div>


        <button>+</button>
      </form>
    </div>
  )
}

export default AddBook