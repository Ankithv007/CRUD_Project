import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);

const handleDelete = (id) =>{
    axios.delete('http://localhost:5000/delete/' + id)
    .then(res => window.location.reload())
    .catch(err => console.log(err))
}

  useEffect(() => {
    axios
      .get("http://localhost:5000/")
      .then((res) => setBooks(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container mt-5">
      <Link to="/create" className="btn btn-success">Create Book</Link>
      {books.length !== 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Publisher</th>
              <th scope="col">Book Name</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book,index) => (
              <tr key={book.id}>
                <td>{index + 1}</td> 
                <td>{book.id}</td>
                <td>{book.publisher}</td>
                <td>{book.name}</td>
                <td>{book.date}</td>
                <td>{book.action}</td>
                <td>
                    <Link to={`/update/${book.id}`} className="btn btn-info btn-sm me-2">Update</Link>
                    <button type="button" onClick={() => handleDelete(book.id)} className="btn btn-danger btn-sm ">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h2>No Records</h2>
      )}
    </div>
  );
};

export default Books;