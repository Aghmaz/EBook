import React, { useEffect } from "react";
import Header from "../components/Header";
import { Content } from "antd/es/layout/layout";
import { Typography, Breadcrumb, Row, Col } from "antd";
import { SideBar } from "../components/SideBar";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Formik } from "formik";
import { profileValidationSchema } from "../utils/profile-util";
import ProfileForm from "../components/Profile/ProfileForm";
import { useSelector } from "react-redux";
const { Text } = Typography;

export default function Profile() {
  const user = useSelector((state) => state?.user?.user);
  console.log(user, "user");
  const nameArray = user?.name?.split(/\s+/);
  return (
    <div className="h-full min-h-screen grid grid-columns">
      <SideBar />
      <div className="relative flex flex-col">
        <Header />
        <PerfectScrollbar style={{ height: "100vh" }}>
          <Content className="px-4 pt-28 pb-6">
            <Breadcrumb
              className="mb-4"
              items={[
                {
                  title: <a href="">Admin Profile</a>,
                },
              ]}
            />
            <Row className="flex flex-wrap justify-between lg:items-center items-start mb-8">
              <Col className="flex flex-col mb-2">
                <Text className="text-primary md:text-[32px] text-xl font-medium mb-3">
                  Profile Information
                </Text>
                <Text className="text-[#888888] md:text-sm font-nomral">
                  From your profile page, you can make changes to your contact
                  information including your name, email, contact number, and
                  password.
                </Text>
              </Col>
            </Row>
            <Formik
              enableReinitialize={true}
              initialValues={{
                firstName: nameArray?.[0] || "",
                lastName: nameArray?.slice(1)?.join(" ") || "",
                email: user?.email || "",
                password: "",
                confirmPassword: "",
                phoneNumber: user?.phoneNumber || "",
                profile_image_url: user?.profile_image_url || "",
              }}
              validationSchema={profileValidationSchema}
              onSubmit={async (values, action) => {}}
            >
              {(formikProps) => {
                return <ProfileForm {...formikProps} />;
              }}
            </Formik>
          </Content>
        </PerfectScrollbar>
      </div>
    </div>
  );
}
