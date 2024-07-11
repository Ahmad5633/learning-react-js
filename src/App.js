import "./App.css";
import axios from "axios";
import React from "react";

function App() {
  const [books, setBooks] = React.useState([]);

  React.useEffect(() => {
    axios
      .get("http://localhost:2022/book")
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        const book = {
          _id: (books.length + 1).toString(),
          name: "Default Book",
          author: "Default Author",
          price: 0,
          stock: 0,
        };
        setBooks([book]);
      });
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const book = {
      name: e.target.name.value,
      author: e.target.author.value,
      price: parseInt(e.target.price.value),
      stock: parseInt(e.target.stock.value),
    };
    axios
      .post("http://localhost:2022/book", book)
      .then(async (res) => {
        const bookList = await axios.get("http://localhost:2022/book");
        setBooks(bookList.data);
      })
      .catch((err) => {
        book._id = (books.length + 1).toString();
        const tempBooks = [...books, book];
        setBooks(tempBooks);
      })
      .finally(() => {
        e.target.name.value = "";
        e.target.author.value = "";
        e.target.price.value = "";
        e.target.stock.value = "";
      });
  };

  const deleteBook = async (id) => {
    axios
      .delete(`http://localhost:2022/book/${id}`)
      .then(async (res) => {
        const bookList = await axios.get("http://localhost:2022/book");
        setBooks(bookList.data);
      })
      .catch((err) => {
        const tempBooks = books.filter((book) => book._id !== id);
        setBooks(tempBooks);
      });
  };

  return (
    <div className="App">
      <h1>Book Store</h1>

      <h2>Add Book</h2>
      <form onSubmit={onSubmit}>
        <input type="text" name="name" placeholder="Name" />
        <input type="text" name="author" placeholder="Author" />
        <input type="number" name="price" placeholder="Price" />
        <input type="number" name="stock" placeholder="Stock" />
        <button type="submit">Save</button>
      </form>

      <h2>Books</h2>
      <table>
        <thead>
          <tr>
            <th>Book Name</th>
            <th>Author Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr>
              <td>{book.name}</td>
              <td>{book.author}</td>
              <td>{book.price}</td>
              <td>{book.stock}</td>
              <td>
                <button onClick={() => deleteBook(book._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
