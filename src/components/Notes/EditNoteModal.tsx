/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Modal, Form, Input, Select, Image, Button, Popconfirm } from 'antd';
import { TCategory, TNote } from '../../types/note';
import { DeleteOutlined } from '@ant-design/icons';
import { useUpdatedNoteMutation } from '../../redux/api/notes/noteApi';
import { useDeleteImageMutation } from '../../redux/api/image/imageApi';
import { toast } from 'sonner';

type EditNoteModalProps = {
    open: boolean;
    onClose: () => void;
    categories: TCategory[];
    note: TNote;
};

const { TextArea } = Input;
const priorities = ['LOW', 'MEDIUM', 'HIGH', 'URGENT'];

const EditNoteModal: React.FC<EditNoteModalProps> = ({ open, onClose, categories, note }) => {
    const [updateNote, { isLoading }] = useUpdatedNoteMutation();
    const [deleteImage] = useDeleteImageMutation()
    const [form] = Form.useForm();

    const handleFinish = async(values: any) => {
        // merge images to values before submit
        try {
            const res = await updateNote({ id: note.id, data: values }).unwrap();
            onClose()
            toast.success(res?.data.message || "Note updated successfully!");
        } catch (error: any) {
            console.log(error);
            toast.error(error?.data.message || "Failed to Edit note");
        }
        form.resetFields();
    };

    const handleRemoveImage = async (imageUrl: string) => {

        const updatedImages = note.images.filter(img => img !== imageUrl);
        const data = { images: updatedImages };
        console.log(data, 'data');

        try {
            await updateNote({ id: note.id, data }).unwrap();
            await deleteImage({url:imageUrl}).unwrap();
            toast.success("Image removed");
          
        } catch (error: any) {
            console.log(error);
            toast.error(error?.data.message || "Failed to remove image");
        }
    };

    return (
        <Modal
            centered
            title="Edit Note"
           
            open={open}
            onCancel={() => {
                onClose();
                form.resetFields();
            }}
            onOk={() => form.submit()}
            okText="Update"
            afterClose={() => form.resetFields()}
            confirmLoading={isLoading}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
                initialValues={{
                    categoryId: note.categoryId,
                    title: note.title,
                    content: note.content,
                    priority: note.priority,
                }}
            >
                <Form.Item
                    name="categoryId"
                    label="Category"
                    rules={[{ required: true, message: 'Please select a category' }]}
                >
                    <Select placeholder="Select category">
                        {categories.map(category => (
                            <Select.Option key={category.id} value={category.id}>
                                {category.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="title"
                    label="Title"
                    rules={[{ required: true, message: 'Please enter title' }]}
                >
                    <Input placeholder="Note title" />
                </Form.Item>

                <Form.Item
                    name="content"
                    label="Content"
                    rules={[{ required: true, message: 'Please enter content' }]}
                >
                    <TextArea rows={4} placeholder="Note content" />
                </Form.Item>

                <Form.Item
                    name="priority"
                    label="Priority"
                    rules={[{ required: true, message: 'Please select priority' }]}
                >
                    <Select placeholder="Select priority">
                        {priorities.map(priority => (
                            <Select.Option key={priority} value={priority}>
                                {priority}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                {/* Display current images with delete option */}
                {note.images && note.images.length > 0 && (
                    <Form.Item label="Images">
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                            {note.images.map((imgUrl, index) => (
                                <div key={index} style={{ position: 'relative', display: 'inline-block' }}>
                                    <Image
                                        src={imgUrl}
                                        alt={`note-image-${index}`}
                                        width={80}
                                        height={80}
                                        style={{ objectFit: 'cover', borderRadius: 4 }}
                                    />
                                    <Popconfirm
                                        title="Remove this image?"
                                        onConfirm={() => handleRemoveImage(imgUrl)}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button
                                            size="small"
                                            danger
                                            shape="circle"
                                            icon={<DeleteOutlined />}
                                            style={{ position: 'absolute', top: 0, right: 0 }}
                                        />
                                    </Popconfirm>
                                </div>
                            ))}
                        </div>
                    </Form.Item>
                )}
            </Form>
        </Modal>
    );
};

export default EditNoteModal;
