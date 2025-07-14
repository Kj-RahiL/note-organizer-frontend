/* eslint-disable @typescript-eslint/no-explicit-any */

import { Form, Input, Button, Typography, Card, message } from "antd";
import { useSignupMutation } from "../../../redux/api/auth/authApi";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;

const SignupPage = () => {
    const [signup, { isLoading }] = useSignupMutation();

    const handleFinish = async (values: any) => {
        console.log(values, "signup form values");

        try {
            const res = await signup(values).unwrap();
            console.log(res, "signup success response");
            message.success("Signup successful!");
        } catch (err) {
            console.error(err);
            message.error("Signup failed");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-md">
                <Title level={3} className="text-center mb-4">
                    Sign Up
                </Title>
                <Form layout="vertical" onFinish={handleFinish}>
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{ required: true, message: "Please enter your name" }]}
                    >
                        <Input placeholder="Full name" />
                    </Form.Item>

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
                        Sign Up
                    </Button>
                </Form>
                <div className="text-center mt-4">
                    <Text type="secondary">Already have an account? </Text>
                    <Link to="/login">Login</Link>
                </div>
            </Card>

           
        </div>
    );
};

export default SignupPage;
