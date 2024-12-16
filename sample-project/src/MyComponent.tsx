import { useState } from "react";

export interface Item {
  id: number | string;
  name: string;
}
const ItemList = () => {
  const [list, setList] = useState<Item[]>([]);
  const [item, setItem] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // add item to the list
    setList([
      ...list,
      {
        id: list.length,
        name: item,
      },
    ]);
    setItem("");
  };

  const handleRemove = (index: number) => {
    // remove item from the list
    list.splice(index, 1);
    setList([...list]);
  };

  return (
    <div>
      // render the list of items
      <ol>
        {list.map((item, i) => (
          <li key={item.id}>
            <span>{item.name}</span>
            <button type="button" onClick={() => handleRemove(i)}>
              Delete
            </button>
          </li>
        ))}
      </ol>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default ItemList;

import { useEffect, useRef, useState } from "react";

interface Book {
  name: string;
}

const useInterval = (func: () => void, delay: number) => {
  setInterval(() => {
    func();
  }, delay);
};

function Books() {
  const [books, setBooks] = useState<Book[]>([]);
  const mounted = useRef(false);

  async function fetchBooks() {
    const response = await fetch("/books");
    const books = await response.json();
    if (mounted.current) {
      setBooks(books.results);
    }
  }

  useEffect(() => {
    mounted.current = true;
  }, []);

  useInterval(fetchBooks, 1000);

  return (
    <ul>
      {books.map((book, i) => (
        <li key={i}>{book.name}</li>
      ))}
    </ul>
  );
}

export default Books;
