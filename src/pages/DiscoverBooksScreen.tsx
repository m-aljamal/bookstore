import React from "react";
import BookUi from "components/BookUi";
import { Container } from "components/Container";
import { Spinner } from "components/Soinner";
import { client } from "lib/Client";
import { Book } from "lib/types";
import SearchIcon from "components/SearchIcon";

const DiscoverBooksScreen = () => {
  const [queried, setQueried] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [status, setStatus] = React.useState("idle");
  const [books, setBooks] = React.useState<Book[] | []>([]);

  const isLoading = status === "loading";
  const isSuccess = status === "success";

  const handleSubmit = (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQueried(true);
    setQuery(e.target.booksearch.value);
  };

  React.useEffect(() => {
    if (!queried) return;
    setStatus("loading");
    client({
      endPoint: `http://localhost:3001/books?query=${encodeURIComponent(
        query
      )}`,
    }).then((resPonseData) => {
      setBooks(resPonseData);
      setStatus("success");
    });
  }, [queried, query]);

  return (
    <Container className="max-w-4xl">
      <form onSubmit={handleSubmit}>
        <div className=" relative">
          <input
            className="bg-gray-100 w-full mt-10 p-3"
            type="text"
            placeholder="Search books...."
            id="booksearch"
          />

          <div className=" absolute right-5 top-[57%] ">
            {isLoading ? <Spinner /> : <SearchIcon />}
          </div>
        </div>
      </form>
      {isLoading && <div>Loading...</div>}
      {isSuccess ? (
        books.length ? (
          <ul className=" mt-8 space-y-10">
            {books.map((book) => (
              <BookUi book={book} />
            ))}
          </ul>
        ) : (
          <p className="mt-8">No Books found</p>
        )
      ) : null}
    </Container>
  );
};

export default DiscoverBooksScreen;
