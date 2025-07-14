/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Modal, Form, Input, Select } from 'antd';
import { TCategory } from '../../types/note';

type CreateNoteModalProps = {
    open: boolean;
    onClose: () => void;
    onSubmit: (values: any) => void;
    categories: TCategory[];
};

const { TextArea } = Input;

const priorities = ['LOW', 'MEDIUM', 'HIGH', 'URGENT'];

const CreateNoteModal: React.FC<CreateNoteModalProps> = ({ open, onClose, onSubmit, categories }) => {
    const [form] = Form.useForm();

    const handleFinish = (values: any) => {
        onSubmit(values);
        form.resetFields();
    };

    return (
        <Modal
            centered
            title="Create Note"
            open={open}
            onCancel={() => {
                onClose();
                form.resetFields();
            }}
            onOk={() => form.submit()}
            okText="Create"
        >
            <Form form={form} layout="vertical" onFinish={handleFinish}>
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
            </Form>
        </Modal>
    );
};

export default CreateNoteModal;
