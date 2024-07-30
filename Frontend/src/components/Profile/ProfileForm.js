import React, { useState } from "react";
import {
  Upload,
  Avatar,
  Form,
  Input,
  Flex,
  Button,
  Typography,
  Spin,
} from "antd";
import { UserOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { Field } from "formik";
import { getFormItemValidationProps } from "../../utils/form-util";
import { toast } from "react-toastify";

const { Text } = Typography;
const ProfileForm = (props) => {
  const { handleSubmit, isSubmitting, dirty, setFieldValue, values } = props;
  const [loading, setLoading] = useState(false);
  const customRequest = async ({ file, onSuccess, onError }) => {
    try {
      const isLt12MB = file.size / 1024 / 1024 < 12;

      if (!isLt12MB) {
        toast.error("File must be smaller than 12MB!");
        onError();
        return;
      }

      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "yasinCloud");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/hotelroombooking/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      const data = await response.json();
      setFieldValue("profile_image_url", data.url, true);
      onSuccess();
      toast.success("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Error uploading file");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-[#f5f5f5] rounded-xl lg:p-5 p-3">
      <div className="flex gap-2 items-center">
        <Spin spinning={loading}>
          <Avatar
            required
            className="w-[120px] h-[120px] rounded-xl"
            src={values.profile_image_url || "../assets/images/profile-avatar.svg"}
          />
        </Spin>
        <div className="flex flex-col">
          <Upload
            className="mt-6"
            customRequest={customRequest}
            showUploadList={false}
            accept="image/*"
            beforeUpload={(file) => {
              const isLt12MB = file.size / 1024 / 1024 < 12;
              if (!isLt12MB) {
                toast.error("File must be smaller than 12MB!");
                return false;
              }

              const isImage = file.type.startsWith("image/");
              if (!isImage) {
                toast.error("You can only upload image files!");
                return false;
              }

              return true;
            }}
          >
            <div className="flex gap-3 items-center">
              <div className="flex flex-col gap-1">
                <Text className="text-base font-normal text-primary underline">
                  <span style={{ color: "red" }}>* </span>
                  Change Profile Photo
                </Text>
                <Text className="text-xs text-grayLight font-normal">
                  File types supported: JPG, PNG Max size: 12 MB, <br />
                  Recomended dimensions: 64x64
                </Text>
              </div>
            </div>
          </Upload>

          <div
            onClick={() => setFieldValue("profile_image_url", "", true)}
            className="text-sm font-normal text-[#d83a52] mt-1 cursor-pointer"
          >
            Remove image
          </div>
        </div>
      </div>
      <div>
        <div className="grid lg:grid-cols-2 gap-5 mt-8">
          <Field name="firstName">
            {({ field, form }) => (
              <Form name="" size="large" layout="vertical">
                <Form.Item
                  label="First Name:"
                  hasFeedback
                  required
                  {...getFormItemValidationProps(field, form)}
                >
                  <Input
                    {...field}
                    size="large"
                    placeholder="Adam"
                    className="super__select text-sm font-normal text-dark"
                    prefix={<UserOutlined className="text-gray" />}
                  />
                </Form.Item>
              </Form>
            )}
          </Field>
          <Field name="lastName">
            {({ field, form }) => (
              <Form name="" size="large" layout="vertical">
                <Form.Item
                  label="Last Name:"
                  hasFeedback
                  required
                  {...getFormItemValidationProps(field, form)}
                >
                  <Input
                    size="large"
                    placeholder="Synder"
                    className="super__select text-sm font-normal text-dark"
                    prefix={<UserOutlined className="text-gray" />}
                    {...field}
                  />
                </Form.Item>
              </Form>
            )}
          </Field>
          <Field name="email">
            {({ field, form }) => (
              <Form name="" size="large" layout="vertical">
                <Form.Item
                  label="Email:"
                  hasFeedback
                  required
                  {...getFormItemValidationProps(field, form)}
                >
                  <Input
                    size="large"
                    placeholder="JhonHenry123@gmail.com"
                    className="super__select text-sm font-normal text-dark"
                    prefix={<MailOutlined className="text-gray" />}
                    {...field}
                  />
                </Form.Item>
              </Form>
            )}
          </Field>
          <Field name="phoneNumber">
            {({ field, form }) => (
              <Form name="" size="large" layout="vertical">
                <Form.Item
                  label="Phone Number:"
                  hasFeedback
                  required
                  {...getFormItemValidationProps(field, form)}
                >
                  <Input
                    size="large"
                    placeholder="Synder"
                    className="super__select text-sm font-normal text-dark"
                    prefix={<PhoneOutlined className="text-gray rotate-90" />}
                    {...field}
                  />
                </Form.Item>
              </Form>
            )}
          </Field>
          <Field name="password">
            {({ field, form }) => (
              <Form name="" size="large" layout="vertical">
                <Form.Item
                  label="New Password:"
                  hasFeedback
                  required
                  {...getFormItemValidationProps(field, form)}
                >
                  <Input.Password
                    size="large"
                    placeholder="******"
                    className="super__select text-sm font-normal text-dark"
                    prefix={<></>}
                    {...field}
                  />
                </Form.Item>
              </Form>
            )}
          </Field>
          <Field name="confirmPassword">
            {({ field, form }) => (
              <Form name="" size="large" layout="vertical">
                <Form.Item
                  label="Confirm Password:"
                  hasFeedback
                  required
                  {...getFormItemValidationProps(field, form)}
                >
                  <Input.Password
                    size="large"
                    placeholder="******"
                    className="super__select text-sm font-normal text-dark"
                    prefix={<></>}
                    {...field}
                  />
                </Form.Item>
              </Form>
            )}
          </Field>
        </div>
        <Flex className="justify-center mt-10 mb-5">
          <Spin spinning={isSubmitting}>
            <Button
              className="bg-primary flex justify-center items-center w-full max-w-[320px] py-6 text-base font-normal text-white rounded-lg"
              htmlType="submit"
              disabled={isSubmitting || !dirty}
              onClick={handleSubmit}
            >
              Update
            </Button>
          </Spin>
        </Flex>
      </div>
    </div>
  );
};

export default ProfileForm;
