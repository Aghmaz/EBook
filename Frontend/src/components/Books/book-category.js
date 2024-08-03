import React, { useEffect, useState } from "react";
import {
  Layout,
  Row,
  Col,
  Typography,
  Breadcrumb,
  Input,
  Card,
  Space,
  Dropdown,
  Menu,
  Pagination,
  Divider,
} from "antd";
import { Svgs } from "../Svgs/svg-icons";
import EditBook from "./edit-book";
import DeleteBook from "./delete-book";
import CreateBook from "./add-book";

const { Search } = Input;
const { Text, Paragraph } = Typography;

function BookCategory({ data, setDetailRecord }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [originalData, setOriginalData] = useState(data);
  const [filteredData, setFilteredData] = useState(data);
  const [clearFilter, setClearFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  const handleActiveFilter = (booleanValue) => setClearFilter(booleanValue);

  const userDropdown = (record) => (
    <Menu className="!py-3 border border-[#DBDBDB] rounded-[5px] !shadow-none">
      <Menu.Item key="1">
        <EditBook data={record} />
      </Menu.Item>
      <Menu.Item key="2">
        <DeleteBook data={record} />
      </Menu.Item>
    </Menu>
  );

  const handleSearch = (value) => {
    setSearchTerm(value);
    handleActiveFilter(!!value);
    filterData(value);
  };

  const filterData = (searchValue) => {
    const filtered = originalData.filter((item) =>
      item?.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filtered);
  };

  useEffect(() => {
    filterData(searchTerm);
  }, [searchTerm, data, clearFilter]);

  useEffect(() => {
    setFilteredData(data);
    setOriginalData(data);
  }, [data]);

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <Layout>
      <Breadcrumb
        className="mb-4"
        items={[
          {
            title: <a href="">User Management</a>,
          },
          {
            title: <a href="">Books</a>,
          },
        ]}
      />
      <Row className="flex justify-between items-center mb-4">
        <Col>
          <Text className="text-primary md:text-[32px] text-xl font-medium">
            Book
          </Text>
        </Col>
        <Col>
          <CreateBook />
        </Col>
      </Row>
      {data.length === 0 && (
        <div className="lg:py-20 py-10 px-8 flex flex-col justify-center items-center">
          <Text className="text-[#2C2C2E] md:text-2xl text-xl font-normal mt-2 mb-2">
            No Book is Added
          </Text>
          <Paragraph>
            You need to Add Book First then you can see the books.
          </Paragraph>
        </div>
      )}
      {data.length > 0 && (
        <div className="flex gap-3 mb-5">
          <Search
            allowClear
            value={searchTerm}
            className="search-input-custom w-full max-w-[400px]"
            placeholder="Search Service"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      )}
      <div>
        {paginatedData.length > 0 ? (
          <Row gutter={[16, 16]} className="book-card-container">
            {paginatedData.map((item, index) => (
              <Col
                xs={24}
                sm={12}
                md={8}
                lg={8}
                key={index}
                className="book-card"
              >
                <Card
                  type="inner"
                  title={`Book No. : ${
                    index + 1 + (currentPage - 1) * pageSize
                  }`}
                  extra={
                    <>
                      {[
                        <Dropdown
                          overlay={userDropdown(item)}
                          placement="bottomRight"
                          trigger={["click"]}
                          className="cursor-pointer"
                        >
                          <Space className="gap-3 items-center">
                            {Svgs.dots}
                          </Space>
                        </Dropdown>,
                      ]}
                    </>
                  }
                >
                  <Row>
                    <Col span={22}>
                      <Text className="text-primary  font-medium">
                        Book Title :
                      </Text>
                    </Col>
                    <Col span={2}> {item.title}</Col>
                  </Row>
                  <Divider />
                  <Row>
                    <Col span={22}>
                      <Text className="text-primary  font-medium">
                        Author :
                      </Text>
                    </Col>
                    <Col span={2}> {item.author}</Col>
                  </Row>
                  <Divider />
                  <Row>
                    <Col span={22}>
                      <Text className="text-primary  font-medium">
                        Description :
                      </Text>
                    </Col>
                    <Col span={2}> {item.description}</Col>
                  </Row>
                  <Divider />
                  <Row>
                    <Col span={22}>
                      <Text className="text-primary  font-medium">Genre :</Text>
                    </Col>
                    <Col span={2}> {item.genre}</Col>
                  </Row>
                  <Divider />
                  <Row>
                    <Col span={22}>
                      <Text className="text-primary  font-medium">
                        Published Year :
                      </Text>
                    </Col>
                    <Col span={2}> {item.publishedYear}</Col>
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <>
            {originalData.length > 0 && (
              <div className="lg:py-20 py-10 px-8 flex flex-col justify-center items-center">
                <Text className="text-[#2C2C2E] md:text-2xl text-xl font-normal mt-2 mb-2">
                  No Data Match
                </Text>
              </div>
            )}
          </>
        )}
      </div>
      {filteredData.length > 0 && (
        <Pagination
          className="pagination-custom mt-5 mb-2 "
          current={currentPage}
          pageSize={pageSize}
          total={filteredData.length}
          onChange={handlePageChange}
          showSizeChanger
          pageSizeOptions={["6", "12", "18", "24", "30"]}
        />
      )}
    </Layout>
  );
}

export default BookCategory;
