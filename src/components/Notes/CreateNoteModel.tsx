/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useCallback } from 'react';
import { Modal, Form, Input, Select, Typography } from 'antd';
import { TCategory } from '../../types/note';
import { debounce } from 'lodash';

type CreateNoteModalProps = {
    open: boolean;
    onClose: () => void;
    onSubmit: (values: any) => void;
    onAutoSave?: (values: any) => void; // New prop for auto-save
    categories: TCategory[];
};

const { TextArea } = Input;
const { Text } = Typography;
const priorities = ['LOW', 'MEDIUM', 'HIGH', 'URGENT'];

const CreateNoteModal: React.FC<CreateNoteModalProps> = ({
    open,
    onClose,
    onSubmit,
    onAutoSave,
    categories
}) => {
    const [form] = Form.useForm();
    const [autoSaveStatus, setAutoSaveStatus] = React.useState<string>('');
    const lastSavedRef = useRef<any>(null);

    // Debounced auto-save function
    const debouncedAutoSave = useCallback(
        debounce(async (values: any) => {
            // Check if form has minimum required fields and content has changed
            if (values.title && values.content && values.categoryId && values.priority) {
                const currentValues = JSON.stringify(values);

                // Only auto-save if content has actually changed
                if (currentValues !== lastSavedRef.current) {
                    try {
                        setAutoSaveStatus('Saving...');
                        await onAutoSave?.(values);
                        lastSavedRef.current = currentValues;
                        setAutoSaveStatus('Auto-saved');

                        // Clear status after 2 seconds
                        setTimeout(() => setAutoSaveStatus(''), 2000);
                    } catch (error: any) {
                        console.log(error);
                        setAutoSaveStatus('Save failed');
                        setTimeout(() => setAutoSaveStatus(''), 2000);
                    }
                }
            }
        }, 1000), // 1 second delay
        [onAutoSave]
    );

    // Watch for form changes
    const handleFormChange = () => {
        if (onAutoSave) {
            const values = form.getFieldsValue();
            debouncedAutoSave(values);
        }
    };

    // Load draft from localStorage when modal opens
    useEffect(() => {
        if (open) {
            const savedDraft = localStorage.getItem('note-draft');
            if (savedDraft) {
                try {
                    const draft = JSON.parse(savedDraft);
                    form.setFieldsValue(draft);
                } catch (error) {
                    console.error('Error loading draft:', error);
                }
            }
        }
    }, [open, form]);

    // Save draft to localStorage on form changes
    useEffect(() => {
        if (open) {
            const values = form.getFieldsValue();
            if (values.title || values.content) {
                localStorage.setItem('note-draft', JSON.stringify(values));
            }
        }
    }, [open, form]);

    const handleFinish = (values: any) => {
        onSubmit(values);
        console.log(values);
        form.resetFields();
        localStorage.removeItem('note-draft'); // Clear draft after successful submission
        lastSavedRef.current = null;
        setAutoSaveStatus('');
    };

    const handleCancel = () => {
        onClose();
        form.resetFields();
        // Optionally keep draft or clear it
        // localStorage.removeItem('note-draft');
        setAutoSaveStatus('');
    };

    return (
        <Modal
            centered
            title={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Take Note</span>
                    {autoSaveStatus && (
                        <Text
                            type={autoSaveStatus === 'Save failed' ? 'danger' : 'secondary'}
                            style={{ fontSize: '12px' }}
                        >
                            {autoSaveStatus}
                        </Text>
                    )}
                </div>
            }
            open={open}
            onCancel={handleCancel}
            onOk={() => form.submit()}
            okText="Create"
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
                onValuesChange={handleFormChange}
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
            </Form>
        </Modal>
    );
};

export default CreateNoteModal;