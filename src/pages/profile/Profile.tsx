/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */


import { useEffect, useState } from "react"
import { Form, Input, Button, Typography, Card, Avatar, Modal, Upload, Divider, Badge, Row, Col, message } from "antd"
import {
    EditOutlined,
    UserOutlined,
    MailOutlined,
    LockOutlined,
    CameraOutlined,
    SaveOutlined,
    CloseOutlined,
} from "@ant-design/icons"
import type { UploadFile, UploadProps } from "antd"
import { useChangePasswordMutation, useGetMyProfileQuery } from "../../redux/api/auth/authApi"
import { useUpdatedMeMutation } from "../../redux/api/user/userApi"
import { toast } from "sonner"
import { useCreateImageMutation } from "../../redux/api/image/imageApi"

const { Title, Text, Paragraph } = Typography



export default function ProfilePage() {
    const { data: userData, isLoading: isUserLoading } = useGetMyProfileQuery({})
    const [updateProfile, { isLoading: isUpdating }] = useUpdatedMeMutation()
    const [changePassword, { isLoading: isChangingPassword }] = useChangePasswordMutation()
    const [createImage] = useCreateImageMutation()


    const [isEditing, setIsEditing] = useState(false)
    const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false)
    const [form] = Form.useForm()
    const [passwordForm] = Form.useForm()
    const [profilePicture, setProfilePicture] = useState<string>("")
    const [imagePreview, setImagePreview] = useState<string>("")
    const [imageFile, setImageFile] = useState(null)



    useEffect(() => {
        if (userData) {
            form.setFieldsValue({
                name: userData.data.name,
                email: userData.data.email,
            })
            setProfilePicture(userData.data.profilePicture || "")
            setImagePreview(userData.data.profilePicture || "")
        }
    }, [userData, form])

    const handleProfileUpdate = async (values: any) => {
       if(imageFile){
           const formData = new FormData();
           formData.append("image", imageFile as File);

           try {
               // call your backend upload endpoint
               const res = await createImage(formData).unwrap();

               const data = res.data

               setImagePreview(data.imageUrl);

           } catch (error) {
               console.error(error);
               toast.error("Upload error");
           }

       }
        try {
            const updatedData = {
                ...values,
                profilePicture: imagePreview,
            }
            console.log(updatedData, 'updated data');
            const res = await updateProfile(updatedData).unwrap()
            console.log(res, 'response');
            toast.success("Profile updated successfully!")
            setProfilePicture(imagePreview)
            setIsEditing(false)
        } catch (err: any) {
            console.error(err)
            toast.error(err?.data?.message || "Failed to update profile")
        }
    }

    const handlePasswordChange = async (values: any) => {
        if (values.newPassword !== values.confirmPassword) {
            message.error("New passwords don't match!")
            return
        }

        try {
            await changePassword({
                currentPassword: values.currentPassword,
                newPassword: values.newPassword,
            }).unwrap()
            message.success("Password changed successfully!")
            passwordForm.resetFields()
            setIsPasswordModalVisible(false)
        } catch (err: any) {
            console.error(err)
            message.error(err?.data?.message || "Failed to change password")
        }
    }

    const handleImageChange = async (info: any) => {
        const { file: newFile } = info
        setImageFile(newFile)
        setImagePreview(URL.createObjectURL(newFile));

    }

    const cancelEdit = () => {
        setIsEditing(false)
        form.setFieldsValue({
            name: userData?.data.name,
            email: userData?.data.email,
        })
        setImagePreview(profilePicture)
    }

    const beforeUpload = () => {
        return false // Prevent auto upload
    }

    if (isUserLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-[purple-50] p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <Title level={1} className="!text-gray-800 !mb-2">
                        My Profile
                    </Title>
                    <Paragraph className="text-gray-600 text-lg">Manage your account settings and preferences</Paragraph>
                </div>

                <Row gutter={[24, 24]}>
                    {/* Profile Card */}
                    <Col xs={24} lg={16}>
                        <Card
                            className="shadow-xl border-0 rounded-2xl overflow-hidden"
                            style={{
                                background: "linear-gradient(135deg, #667eea 0%, #000435 100%)",
                            }}
                        >
                            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-8">
                                {/* Avatar Section */}
                                <div className="text-center mb-8">
                                    <div className="relative inline-block">
                                        <Avatar
                                            size={120}
                                            src={imagePreview || "/placeholder.svg?height=120&width=120"}
                                            icon={<UserOutlined />}
                                            className="border-4 border-white shadow-lg"
                                        />
                                        {isEditing && (
                                            <Upload
                                                onChange={handleImageChange}
                                                beforeUpload={beforeUpload}
                                                accept="image/*"
                                                showUploadList={false}
                                                className="absolute -bottom-2 -right-2"
                                            >
                                                <Button
                                                    type="primary"
                                                    shape="circle"
                                                    icon={<CameraOutlined />}
                                                    size="large"
                                                    className="shadow-lg hover:scale-110 transition-transform"
                                                />
                                            </Upload>
                                        )}
                                    </div>

                                    <div className="mt-4">
                                        <Title level={2} className="!mb-1 !text-gray-800">
                                            {userData?.data.name}
                                        </Title>
                                        <Text className="text-gray-600 flex items-center justify-center gap-2">
                                            <MailOutlined />
                                            {userData?.data.email}
                                        </Text>
                                        {userData?.data.role && (
                                            <div className="mt-3">
                                                <Badge
                                                    count={userData.data.role}
                                                    style={{
                                                        backgroundColor: "#4299e1",
                                                        fontSize: "12px",
                                                        padding: "4px 12px",
                                                        borderRadius: "12px",
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <Divider />

                                {/* Form Section */}
                                {isEditing ? (
                                    <Form form={form} layout="vertical" onFinish={handleProfileUpdate} className="space-y-4">
                                        <Form.Item
                                            name="name"
                                            label={
                                                <span className="flex items-center gap-2 font-medium">
                                                    <UserOutlined />
                                                    Full Name
                                                </span>
                                            }
                                            rules={[{ required: true, message: "Please enter your name!" }]}
                                        >
                                            <Input size="large" placeholder="Enter your full name" className="rounded-lg" />
                                        </Form.Item>

                                        <Form.Item
                                            name="email"
                                            label={
                                                <span className="flex items-center gap-2 font-medium">
                                                    <MailOutlined />
                                                    Email Address
                                                </span>
                                            }
                                        >
                                            <Input size="large" disabled className="rounded-lg bg-gray-50" />
                                        </Form.Item>

                                        <Text type="secondary" className="text-sm">
                                            * Email address cannot be changed
                                        </Text>

                                        <div className="flex gap-3 pt-4">
                                            <Button size="large" onClick={cancelEdit} className="flex-1 rounded-lg" icon={<CloseOutlined />}>
                                                Cancel
                                            </Button>
                                            <Button
                                                type="primary"
                                                size="large"
                                                htmlType="submit"
                                                loading={isUpdating}
                                                className="flex-1 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 border-0"
                                                icon={<SaveOutlined />}
                                            >
                                                Save Changes
                                            </Button>
                                        </div>
                                    </Form>
                                ) : (
                                    <div className="space-y-6">
                                        {/* Profile Info */}
                                        <div className="space-y-4">
                                            <div className="bg-gray-50 p-4 rounded-xl">
                                                <div className="flex items-center gap-3">
                                                    <UserOutlined className="text-blue-500 text-lg" />
                                                    <div>
                                                        <Text strong className="block">
                                                            Full Name
                                                        </Text>
                                                        <Text className="text-gray-600">{userData?.data.name}</Text>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="bg-gray-50 p-4 rounded-xl">
                                                <div className="flex items-center gap-3">
                                                    <MailOutlined className="text-green-500 text-lg" />
                                                    <div>
                                                        <Text strong className="block">
                                                            Email Address
                                                        </Text>
                                                        <Text className="text-gray-600">{userData?.data.email}</Text>
                                                    </div>
                                                </div>
                                            </div>

                                            {userData?.data.createdAt && (
                                                <div className="bg-gray-50 p-4 rounded-xl">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                                                            <div className="w-2 h-2 bg-white rounded-full"></div>
                                                        </div>
                                                        <div>
                                                            <Text strong className="block">
                                                                Member Since
                                                            </Text>
                                                            <Text className="text-gray-600">
                                                                {new Date(userData.data.createdAt).toLocaleDateString("en-US", {
                                                                    year: "numeric",
                                                                    month: "long",
                                                                    day: "numeric",
                                                                })}
                                                            </Text>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex gap-3">
                                            <Button
                                                type="default"
                                                size="large"
                                                onClick={() => setIsEditing(true)}
                                                className="flex-1 rounded-lg border-2 border-blue-200 hover:border-blue-400"
                                                icon={<EditOutlined />}
                                            >
                                                Edit Profile
                                            </Button>
                                            <Button
                                                type="primary"
                                                size="large"
                                                onClick={() => setIsPasswordModalVisible(true)}
                                                className="flex-1 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 border-0"
                                                icon={<LockOutlined />}
                                            >
                                                Change Password
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Card>
                    </Col>

                    {/* Stats Card */}
                    <Col xs={24} lg={8}>
                        <Card
                            title={
                                <span className="flex items-center gap-2">
                                    <UserOutlined />
                                    Account Stats
                                </span>
                            }
                            className="shadow-xl border-0 rounded-2xl h-fit"
                        >
                            <div className="space-y-4">
                                <div className="text-center p-4 bg-blue-50 rounded-xl">
                                    <Title level={3} className="!mb-1 !text-blue-600">
                                        {userData?.data.role || "User"}
                                    </Title>
                                    <Text className="text-gray-600">Account Type</Text>
                                </div>

                                <div className="text-center p-4 bg-green-50 rounded-xl">
                                    <Title level={3} className="!mb-1 !text-green-600">
                                        Active
                                    </Title>
                                    <Text className="text-gray-600">Account Status</Text>
                                </div>

                                {userData?.data.createdAt && (
                                    <div className="text-center p-4 bg-purple-50 rounded-xl">
                                        <Title level={3} className="!mb-1 !text-purple-600">
                                            {Math.floor(
                                                (new Date().getTime() - new Date(userData.data.createdAt).getTime()) / (1000 * 60 * 60 * 24),
                                            )}
                                        </Title>
                                        <Text className="text-gray-600">Days Active</Text>
                                    </div>
                                )}
                            </div>
                        </Card>
                    </Col>
                </Row>

                {/* Password Change Modal */}
                <Modal
                    title={
                        <span className="flex items-center gap-2 text-lg">
                            <LockOutlined />
                            Change Password
                        </span>
                    }
                    open={isPasswordModalVisible}
                    onCancel={() => {
                        setIsPasswordModalVisible(false)
                        passwordForm.resetFields()
                    }}
                    footer={null}
                    className="rounded-2xl"
                    width={500}
                >
                    <Form form={passwordForm} layout="vertical" onFinish={handlePasswordChange} className="mt-6">
                        <Form.Item
                            name="currentPassword"
                            label="Current Password"
                            rules={[{ required: true, message: "Please enter your current password!" }]}
                        >
                            <Input.Password size="large" placeholder="Enter current password" className="rounded-lg" />
                        </Form.Item>

                        <Form.Item
                            name="newPassword"
                            label="New Password"
                            rules={[
                                { required: true, message: "Please enter your new password!" },
                                { min: 8, message: "Password must be at least 8 characters long!" },
                            ]}
                        >
                            <Input.Password size="large" placeholder="Enter new password" className="rounded-lg" />
                        </Form.Item>

                        <Form.Item
                            name="confirmPassword"
                            label="Confirm New Password"
                            rules={[{ required: true, message: "Please confirm your new password!" }]}
                        >
                            <Input.Password size="large" placeholder="Confirm new password" className="rounded-lg" />
                        </Form.Item>

                        <div className="flex gap-3 pt-4">
                            <Button
                                size="large"
                                onClick={() => {
                                    setIsPasswordModalVisible(false)
                                    passwordForm.resetFields()
                                }}
                                className="flex-1 rounded-lg"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="primary"
                                size="large"
                                htmlType="submit"
                                loading={isChangingPassword}
                                className="flex-1 rounded-lg bg-gradient-to-r from-red-500 to-pink-600 border-0"
                            >
                                Update Password
                            </Button>
                        </div>
                    </Form>
                </Modal>
            </div>
        </div>
    )
}
