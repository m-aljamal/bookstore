import { Book } from "lib/types";
import { Link } from "react-router-dom";

const BookUi = ({
  book: { title, author, coverImageUrl, id, pageCount, publisher, synopsis },
}: {
  book: Book;
}) => {
  return (
    <Link to={`/book/${id}`}>
      <li className="flex flex-col md:flex-row  space-x-5  border p-5 ">
        <img
          src={coverImageUrl}
          alt={title}
          className=" md:w-40 w-full h-60  object-contain"
        />

        <div>
          <div className="flex justify-between items-center">
            <h2 className="text-blue-800 text-xl font-medium">{title}</h2>
            <div className="flex flex-col text-gray-700">
              <small>{author}</small>
              <small>{publisher}</small>
            </div>
          </div>
          <p className="text-slate-600 mt-3">{synopsis}</p>
        </div>
      </li>
    </Link>
  );
};

export default BookUi;
