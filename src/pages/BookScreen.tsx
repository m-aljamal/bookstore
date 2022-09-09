import BookUi from "components/BookUi";
import { Container } from "components/Container";
import { client } from "lib/Client";
import { Book, User } from "lib/types";
import useAsync from "lib/useAsync";
import React from "react";
import { useParams } from "react-router-dom";

const loadingBook = {
  title: "loading...",
  author: "loading...",
  id: "loading...",
  pageCount: 1,
  publisher: "loading...",
  synopsis: "loading...",
  coverImageUrl: "loading...",
};

const BookScreen = ({ user }: { user: User }) => {
  const { bookId } = useParams();
  const { data: book, run, isLoading, isSuccess } = useAsync<Book>();

  React.useEffect(() => {
    run(
      client(`http://localhost:3001/books/${bookId}`, {
        token: user.token,
      })
    );
  }, [bookId, run, user.token]);

  if (isLoading) {
    return (
      <Container>
        <BookUi book={loadingBook} />
      </Container>
    );
  }

  return (
    <Container>{isSuccess && book ? <BookUi book={book} /> : null}</Container>
  );
};

export default BookScreen;
