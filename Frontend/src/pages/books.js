import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Content } from "antd/es/layout/layout";
import { SideBar } from "../components/SideBar";
import PerfectScrollbar from "react-perfect-scrollbar";
import BookDetail from "../components/Books/book-detail";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBookAsync } from "../store/books/bookSlice";
import BookCategory from "../components/Books/book-category";
export default function Books() {
  const [detailRecord, setDetailRecord] = useState(null);
  const getAllBooks = useSelector((state) => state.book.books || []);
  console.log(getAllBooks);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllBookAsync());
  }, []);
  return (
    <div className="h-full min-h-screen grid grid-columns">
      <SideBar />
      <div className="relative flex flex-col">
        <Header />
        <PerfectScrollbar style={{ height: "100vh" }}>
          <Content className="px-4 pt-28 pb-6">
            {!detailRecord ? (
              <BookCategory
                data={getAllBooks}
                setDetailRecord={(booksData) => setDetailRecord(booksData)}
              />
            ) : (
              <BookDetail />
            )}
          </Content>
        </PerfectScrollbar>
      </div>
    </div>
  );
}
