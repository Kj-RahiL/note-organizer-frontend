import { Card, Form, FormProps, Input, Button } from "antd";
import Title from "antd/es/typography/Title";
import { useLoginUserMutation } from "../../../redux/service/authApi";
import ApiErrorHandler from "../../../utils/ApiErrorHandler";
import { decodeJwtToken } from "../../../utils/decodeJwtToken";
import { useAppDispatch } from "../../../redux/hooks/hooks";
import { setUser } from "../../../redux/features/authSlice";
import { UserRole } from "../../../types/enum";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface FieldType {
  email: string;
  password: string;
}

const Login = () => {
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      const res = await loginUser(values).unwrap();
      // console.log(res);
      // console.log(res);
      const token = decodeJwtToken(res.data?.accessToken || "") as {
        email: string;
        id: string;
        role: UserRole;
      } | null;
      if (res.success && token) {
        dispatch(
          setUser({
            user: {
              email: token.email || "",
              id: token.id || "",
              role: token.role || "",
            },
            accessToken: res.data?.accessToken || "",
          })
        );
        toast.success(res.message);
        navigation("/");
      }
    } catch (error) {
      ApiErrorHandler(error);
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="h-screen flex justify-center items-center ">
      <Card className="!rounded-lg max-w-md w-full p-6 shadow-lg">
        <Title className="text-center  !font-semibold mb-4">Login</Title>
        <Form
          size="large"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          {/* Email Field */}
          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Enter a valid email" },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          {/* Password Field */}
          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button
              loading={isLoading}
              size="large"
              type="primary"
              htmlType="submit"
              className="w-full"
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
