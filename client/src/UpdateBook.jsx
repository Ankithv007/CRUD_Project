import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const Updatebook = () => {
  const { id } = useParams();
  const [values, setValues] = useState({
    publisher: "",
    name: "",
    date: "",
  });
  const navigate = useNavigate();

  // This function should use PUT for updating, not POST for creating
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/update/${id}`, values)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  };    

  useEffect(() => {
    axios
      .get(`http://localhost:5000/getrecord/${id}`)
      .then((res) => {
        // Usually API returns either an object or an array with one item
        const book = res.data[0]; // Assuming first item in array
        if (book) {
          setValues({
            publisher: book.publisher,
            name: book.name,
            date: book.date.split('T')[0], // Format date to YYYY-MM-DD for input type="date"
          });
        }
      })
      .catch((err) => console.log(err));
  }, [id]); // Added id as dependency

  return (
    <div className="d-flex align-items-center flex-column mt-3">
      <h1>Update a Book</h1>
      <form className="w-50" onSubmit={handleSubmit}>
        <div className="mb-3 mt-3">
          <label htmlFor="publisher" className="form-label">
            Publisher:
          </label>
          <input
            type="text"
            className="form-control"
            id="publisher"
            placeholder="Enter Publisher Name"
            name="publisher"
            value={values.publisher}
            onChange={(e) =>
              setValues({ ...values, publisher: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Book Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter Book Name"
            name="name"
            value={values.name}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Publish Date:
          </label>
          <input
            type="date"
            className="form-control"
            id="date"   
            name="date"
            value={values.date}
            onChange={(e) => setValues({ ...values, date: e.target.value })}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
};