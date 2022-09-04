import { Book } from "lib/types";

const BookUi = ({
  book: { title, author, coverImageUrl, id, pageCount, publisher, synopsis },
}: {
  book: Book;
}) => {
  return (
    <li className="flex space-x-5  border p-5 ">
      <img src={coverImageUrl} alt={title} className=" w-40" />

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
  );
};

export default BookUi;
