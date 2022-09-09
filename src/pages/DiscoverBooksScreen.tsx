import React from "react";
import BookUi from "components/BookUi";
import { Container } from "components/Container";
import { Spinner } from "components/Soinner";
import { client } from "lib/Client";
import { Book, User } from "lib/types";
import SearchIcon from "components/SearchIcon";
import useAsync from "lib/useAsync";

const DiscoverBooksScreen = ({ user }: { user: User }) => {
  const [queried, setQueried] = React.useState(false);
  const [query, setQuery] = React.useState("");

  const { data, run, error, isError, isLoading, isSuccess } =
    useAsync<Book[]>();

  const handleSubmit = (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQueried(true);
    setQuery(e.target.booksearch.value);
  };

  React.useEffect(() => {
    if (!queried) return;
    run(
      client(`http://localhost:3001/books?query=${encodeURIComponent(query)}`, {
        token: user.token,
      })
    );
  }, [queried, query, run, user.token]);

  return (
    <Container className="max-w-2xl">
      <form onSubmit={handleSubmit}>
        <div className=" relative">
          <input
            className="bg-gray-100 w-full  p-3"
            type="text"
            placeholder="Search books...."
            id="booksearch"
          />

          <div className=" absolute right-5 top-[30%] ">
            {isLoading ? <Spinner /> : <SearchIcon />}
          </div>
        </div>
      </form>
      {isError ? (
        <div className="text-red-500 text-center mt-10">
          <p>Error</p>
          <pre>{error?.message}</pre>
        </div>
      ) : null}

      {isSuccess ? (
        data?.length ? (
          <ul className=" mt-8 flex flex-col gap-10">
            {data?.map((book) => (
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
