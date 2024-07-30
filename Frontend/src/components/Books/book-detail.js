import React, { useLayoutEffect } from "react";
import {
  Breadcrumb,
  Row,
  Col,
  Avatar,
  Typography,
  Menu,
  Space,
  Dropdown,
} from "antd";
import { Svgs } from "../Svgs/svg-icons";
import EditJob from "./edit-book";
import DeleteJob from "./delete-book";
const { Text } = Typography;

const BookDetail = ({ data, goBack }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  };

  const userDropdown = (record) => (
    <Menu className="!py-3 border border-[#DBDBDB] rounded-[5px] !shadow-none">
      <Menu.Item key="0">
        <EditJob data={record} />
      </Menu.Item>
      <Menu.Item key="1">
        <DeleteJob goBack={goBack} data={record} />
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <Breadcrumb
        className="mb-4"
        items={[
          {
            title: <a href="">User Management</a>,
          },
          {
            title: <a href="">Books</a>,
          },
          {
            title: <a href="">Book Detail</a>,
          },
        ]}
      />
      <Row className="flex flex-col lg:flex-row justify-between lg:items-center items-start mb-1">
        <Col className="gap-2">
          <Text
            onClick={goBack}
            className="cursor-pointer text-primary md:text-[32px] text-xl font-medium flex items-center justify-start gap-4 mb-3"
          >
            {Svgs.arrowback}
            Book Details
          </Text>
          <Text className="text-[#868687] text-sm font-normal mb-4 block">
            You can see all details about the book here.
          </Text>
        </Col>
        <Col>
          <Dropdown
            overlay={userDropdown(data)}
            placement="bottomRight"
            trigger={["click"]}
            className="cursor-pointer"
          >
            <Space className="gap-1 items-center text-xs font-medium text-primary py-1 px-3 bg-[#D7E5FF] rounded">
              {Svgs.action} <span>Action</span>{" "}
            </Space>
          </Dropdown>
        </Col>
      </Row>
      <Row className="lg:p-6 p-5 rounded-lg bg-[#F5F5F5] grid gap-5">
        <Col span={24}>
          <Row className="grid xl:grid-cols-2 gap-3">
            <Col>
              <div className="bg-white rounded-xl lg:p-5 p-3 card__shadow">
                <div className="flex items-center gap-3 mb-6">
                  <Avatar
                    className="w-20 h-20 rounded-full"
                    src={Svgs.profilevendor}
                  />
                  <div className="flex flex-col">
                    <Text className="md:text-2xl text-xl font-normal text-primary">
                      {/* {data.name} */}
                    </Text>
                    <Text className="text-sm font-normal text-success flex gap-1 items-center">
                      {/* {data && data.isPaused == false ? "Pause" : "Resume"} */}
                      <span>{Svgs.verify}</span>
                    </Text>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <Text className="flex flex-col gap-2 font-normal">
                    <span className="text-base text-gray">Email Address:</span>
                    <span className="text-sm text-gray bg-[#F7F7F7] rounded p-2">
                      {/* {data.email} */}
                    </span>
                  </Text>
                  <Text className="flex flex-col gap-2 font-normal">
                    <span className="text-base text-gray">Joining Date:</span>
                    <span className="text-sm text-gray bg-[#F7F7F7] rounded p-2">
                      {/* {formatDate(data.CreatedAt)} */}
                    </span>
                  </Text>
                </div>
              </div>
            </Col>
            <Col>
              {/* <div className="bg-white rounded-xl lg:p-5 p-3 card__shadow">
                <div className="flex flex-col">
                  <Text className="md:text-xl text-lg font-medium text-gray">
                    Client Stats:
                  </Text>
                  <Text className="text-sm font-normal text-gray">
                    You can see general stats of client here
                  </Text>
                </div>
                <div className="grid lg:grid-cols-3 gap-3 mt-5">
                  <div className="bg-[#F4F2FF] rounded-xl flex flex-col items-center justify-center h-full min-h-[104px]">
                    <span className="text-sm font-medium text-gray">
                      Requests Made:
                    </span>
                    <span className="md:text-xl text-lg font-semibold text-[#303030]">
                      23
                    </span>
                  </div>
                  <div className="bg-[#FAEFD9] rounded-xl flex flex-col items-center justify-center h-full min-h-[104px]">
                    <span className="text-sm font-medium text-gray">
                      Proposals Received:
                    </span>
                    <span className="md:text-xl text-lg font-semibold text-[#303030]">
                      34
                    </span>
                  </div>
                  <div className="bg-[#DBFFEC] rounded-xl flex flex-col items-center justify-center h-full min-h-[104px]">
                    <span className="text-sm font-medium text-gray">
                      Services Availed:
                    </span>
                    <span className="md:text-xl text-lg font-semibold text-[#303030]">
                      05
                    </span>
                  </div>
                </div>
              </div> */}
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default BookDetail;
