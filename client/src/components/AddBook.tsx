import React, { Key } from 'react';
import { useQuery } from '@apollo/client';
import { getAuthorsQuery } from "../queries/queries";

type Props = {}

interface AuthorData {
    name: String,
    id: Key
}

const AddBook = (props: Props) => {

    const { loading, error, data } = useQuery(getAuthorsQuery);

    const displayAuthors = () =>{
        if (loading) return <option disabled>Loading Authors...</option>;
        if (error) return <option disabled>Error Loading Authors</option>;
        if(data){
            const {authors} = data;
            return authors.map((author: AuthorData, index: Key) => {
                return (<option key={index} value={author.id}> {author.name} </option>);
            })
        }
    }

  return (
    <div>
        <form id="add-book">
        <div className="field">
          <label>Book name:</label>
          <input type="text"/>
        </div>
        
        <div className="field">
          <label>Genre:</label>
          <input type="text"/>
        </div>


        <div className="field">
          <label>Author:</label>
          <select>
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