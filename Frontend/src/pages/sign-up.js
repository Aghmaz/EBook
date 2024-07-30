import { Button, Col, Flex, Form, Image, Input, Layout, Row, Spin } from "antd";
import React, { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addUser } from "../store/user/userSlice";

const { Content } = Layout;

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [firstName] = useState("");
  const [loading, setLoading] = useState("");

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onFinish = async () => {
    try {
      setLoading(true);
      const resultAction = await dispatch(addUser({ ...formValues }));
      const response = resultAction.payload;
      if (resultAction.error) {
        toast.error(resultAction.message);
      } else if (resultAction) {
        if (response) {
          if (response) {
            toast.success("Sign Up Successful!");
            setTimeout(() => {
              navigate("/login");
            }, 3000);
          }
        } else {
          toast.error(response?.message || "Something went wrong");
        }
      }
    } catch (error) {
      console.error("Form submission error:", error.message);
      toast.error(error.message);
      navigate("/signup");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Content>
        <Row className="w-full flex lg:flex-row lg:items-stretch flex-col lg:gap-0 gap-5 lg:min-h-screen lg:max-h-screen overflow-hidden">
          <Col className="lg:w-[41.8%] relative flex flex-col justify-between">
            <PerfectScrollbar className="lg:max-h-screen lg:px-9 px-5 py-5">
              <div className="flex items-center justify-center lg:justify-start max-w-[200px] mx-auto lg:mx-0 lg:px-0 lg:mb-9 max-lg:mb-4">
                {/* {Svgs.loginlogo} */}
              </div>
              <div className="flex flex-col justify-center items-center">
                <h1 className="md:text-[26px] text-xl font-normal leading-normal text-dark text-center mt-3 mb-1">
                  Sign Up Your Account
                </h1>
                <p className="text-sm text-primary font-normal leading-normal text-center">
                  Set up your profile to get started the account
                </p>
                <Form
                  name="signup"
                  size="large"
                  layout="vertical"
                  onFinish={onFinish}
                  style={{
                    width: "100%",
                    maxWidth: "400px",
                    margin: "30px auto 0 auto",
                    fontWeight: "500",
                    fontSize: "14px",
                  }}
                  className="flex flex-col gap-3"
                  validateMessages={{
                    required: "${label} is required",
                    types: {
                      email: "${label} is not a valid email",
                    },
                  }}
                  initialValues={{
                    name: formValues.name,
                    email: formValues.email,
                    password: formValues.password,
                  }}
                >
                  <Form.Item
                    label="Name"
                    name="Name"
                    rules={[
                      { required: true, message: "name is required" },
                      { min: 3 },
                    ]}
                    hasFeedback
                  >
                    <Input
                      size="large"
                      required
                      placeholder="Enter Full Name"
                      className="super__select text-sm font-normal text-dark"
                      prefix={<></>}
                      value={firstName}
                      onChange={(e) =>
                        setFormValues({ ...formValues, name: e.target.value })
                      }
                    />
                  </Form.Item>
                  <Form.Item
                    label="Email Address"
                    name="email"
                    rules={[
                      { required: true, message: "Email is required" },
                      {
                        type: "email",
                        message: "Email is not a valid email",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input
                      size="large"
                      required
                      placeholder="User@mail.com"
                      className="super__select text-sm font-normal text-dark"
                      prefix={<></>}
                      value={formValues.email}
                      onChange={(e) =>
                        setFormValues({ ...formValues, email: e.target.value })
                      }
                    />
                  </Form.Item>

                  <Form.Item
                    label="Enter Password"
                    name="password"
                    rules={[
                      { required: true, message: "Password is required" },
                      { min: 6 },
                      { max: 25 },
                    ]}
                    hasFeedback
                  >
                    <Input.Password
                      className="super__select text-sm font-normal text-dark"
                      size="large"
                      required
                      placeholder="*******"
                      prefix={<></>}
                      value={formValues.password}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          password: e.target.value,
                        })
                      }
                    />
                  </Form.Item>

                  <Form.Item
                    className="super__select"
                    style={{ fontWeight: "400" }}
                  >
                    <Form.Item
                      name="acceptTerms"
                      valuePropName="checked"
                      noStyle
                    >
                      <Link
                        to="/"
                        className="text-primary underline mx-[3px] font-medium"
                      >
                        Terms of Use
                      </Link>
                      ,
                      <Link
                        to="/"
                        className="text-primary underline mx-[3px] font-medium"
                      >
                        Privacy Policy
                      </Link>
                      and
                      <Link
                        to="/"
                        className="text-primary underline mx-[3px] font-medium"
                      >
                        Cookie Policy
                      </Link>
                    </Form.Item>
                  </Form.Item>
                  <Form.Item>
                    <Flex vertical style={{ width: "100%", marginTop: 20 }}>
                      <Spin spinning={loading}>
                        <Button
                          className="bg-primary border border-primary text-white hover:bg-white hover:text-primary rounded-xl !h-14 transition-all ease-out"
                          type="submit"
                          htmlType="submit"
                          block
                        >
                          Create Account
                        </Button>
                      </Spin>
                    </Flex>
                  </Form.Item>
                  <p className="lg:mt-1 text-sm text-primary font-normal leading-normal text-center">
                    Already have an account?
                    <Link
                      className="text-primary ml-1 font-medium underline"
                      to="/login"
                    >
                      Log in
                    </Link>
                  </p>
                </Form>
                <ul className="flex items-center justify-center lg:mt-8 max-lg:mt-5 space-x-9">
                  <li>
                    <Link className="text-sm text-dark font-normal leading-normal">
                      Terms and conditions
                    </Link>
                  </li>
                  <li className="list-disc">
                    <Link className="text-sm text-dark font-normal leading-normal">
                      Privacy policy
                    </Link>
                  </li>
                </ul>
              </div>
            </PerfectScrollbar>
          </Col>

          <Col className="bg-login-gradient lg:flex-1 lg:px-9 px-5 py-10 hidden lg:block">
            <div className="flex items-center justify-center w-full h-full">
              <Image
                preview={false}
                className="lg:max-w-sm"
                src="../assets/images/signup-page-pic.svg"
              />
            </div>
          </Col>
        </Row>
      </Content>
    </>
  );
};

export default SignUp;
