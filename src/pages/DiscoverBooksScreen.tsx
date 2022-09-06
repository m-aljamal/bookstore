import React from "react";
import BookUi from "components/BookUi";
import { Container } from "components/Container";
import { Spinner } from "components/Soinner";
import { client } from "lib/Client";
import { Book } from "lib/types";
import SearchIcon from "components/SearchIcon";
import  useAsync  from "lib/useAsync";
const DiscoverBooksScreen = () => {
  const [queried, setQueried] = React.useState(false);
  const [query, setQuery] = React.useState("");
  // const [status, setStatus] = React.useState("idle");
  const [books, setBooks] = React.useState<Book[] | []>([]);

  const {data,run, error, status} = useAsync()



  console.log({ data, error, status });
  
  // const [error, setError] = React.useState<Error | null>(null);

  // const isLoading = status === "loading";
  // const isSuccess = status === "success";
  // const isError = status === "error";

  const handleSubmit = (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQueried(true);
    setQuery(e.target.booksearch.value);
  };

  React.useEffect(() => {
    if (!queried) return;
    run(client(`http://localhost:3001/books?query=${encodeURIComponent(query)}`))
    
    // setStatus("loading");

    // client(
    //   `http://localhost:3001/books?query=${encodeURIComponent(query)}`
    // ).then(
    //   (resPonseData) => {
    //     setBooks(resPonseData);
    //     setStatus("success");
    //   },
    //   (errorData) => {
    //     setStatus("error");
    //     setError(errorData);
    //   }
    // );
  }, [queried, query, run]);

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

          {/* <div className=" absolute right-5 top-[57%] ">
            {isLoading ? <Spinner /> : <SearchIcon />}
          </div> */}
        </div>
      </form>
      {/* {isError ? (
        <div className="text-red-500 text-center mt-10">
          <p>Error</p>
          <pre>{error?.message}</pre>
        </div>
      ) : null} */}

      {/* {isSuccess ? (
        books.length ? (
          <ul className=" mt-8 space-y-10">
            {books.map((book) => (
              <BookUi book={book} />
            ))}
          </ul>
        ) : (
          <p className="mt-8">No Books found</p>
        )
      ) : null} */}
    </Container>
  );
};

export default DiscoverBooksScreen;
