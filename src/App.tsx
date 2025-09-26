import React, { useEffect, useState } from "react";
import type { Book } from "./components/types";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";
import BookSearchSortFilter from "./components/BookSearchSortFilter";
import { Button, Pagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks, addBook, deleteBook, editBook } from "./store/slice/BookSlice";
import Loading from "./components/Loading";
import type { AppDispatch, RootState } from "./store/store";

const App: React.FC = () => {
  const books = useSelector((state: RootState) => state.books.books);
  const loading = useSelector((state: RootState) => state.books.loading);
  const totalPage = useSelector((state: RootState) => state.books.totalPage);

  const dispatch = useDispatch<AppDispatch>();

  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState<Partial<Book> | undefined>();

  // --- phân trang + tìm kiếm ---
  const [page, setPage] = useState(1);
  const size = 4;
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getAllBooks({ page, size, search }));
  }, [dispatch, page, size, search]);

  const handleSubmit = (data: Book) => {
    if (data.id) {
      // edit
      dispatch(editBook(data));
    } else {
      // add
      const newBook = { ...data, id: Date.now().toString() };
      dispatch(addBook(newBook as Book));
    }
    setOpenForm(false);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
          <h1 className="text-3xl font-bold mb-6">📚 Book Library Manager</h1>

          <Button
            variant="contained"
            onClick={() => {
              setEditing(undefined);
              setOpenForm(true);
            }}
          >
            Add Book
          </Button>

          <div className="mt-4">
            <BookSearchSortFilter
              search={search}
              category="all"
              sortBy="title"
              sortDir="asc"
              categories={[]}
              onSearchChange={setSearch}
              onCategoryChange={() => {}}
              onSortChange={() => {}}
              onClear={() => setSearch("")}
            />
          </div>

          <div className="mt-6">
            <BookList
              books={books}
              onEdit={(b) => {
                setEditing(b);
                setOpenForm(true);
              }}
              onDelete={(id) => dispatch(deleteBook(id))}
            />
          </div>

          {/* Pagination */}
          <div className="mt-4 flex justify-center">
            <Pagination
              count={totalPage}
              page={page}
              onChange={(_, value) => setPage(value)}
              color="primary"
            />
          </div>

          <BookForm
            open={openForm}
            initial={editing}
            onClose={() => setOpenForm(false)}
            onSubmit={handleSubmit}
          />
        </div>
      )}
    </>
  );
};

export default App;
