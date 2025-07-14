
import { Card, Form, FormProps, Input, Button, Typography } from "antd";
import ApiErrorHandler from "../../../utils/ApiErrorHandler";
import { decodeJwtToken } from "../../../utils/decodeJwtToken";
import { useAppDispatch } from "../../../redux/hooks/hooks";
import { setUser } from "../../../redux/features/authSlice";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../../redux/api/auth/authApi";
import { TUserRole } from "../../../types/userType";

const {Text, Title} = Typography

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
        role: TUserRole;
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <Title level={3} className="text-center mb-4">
          Log In
        </Title>
        <Form layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input placeholder="Email address" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block loading={isLoading}>
            Log In
          </Button>
        </Form>
        <div className="text-center mt-4">
          <Text type="secondary">Don't have an account? </Text>
          <Link to="/signup">Sign up</Link>
        </div>
      </Card>
    </div>
  );
};

export default Login;
