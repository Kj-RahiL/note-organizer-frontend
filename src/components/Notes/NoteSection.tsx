/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Col, Empty, Row, Tag, Typography, Space, Popconfirm, Tooltip, Image } from "antd";
import {
    PushpinOutlined,
    BulbOutlined,
    DeleteOutlined,
    RestOutlined,
    EditOutlined,
} from '@ant-design/icons';
import { TCategory, TNote } from "../../types/note";
import { MdOutlineArchive, MdOutlineUnarchive } from "react-icons/md";
import CategorySection from "./CategorySection";
import { useDeleteNoteMutation, useUpdatedNoteMutation } from "../../redux/api/notes/noteApi";
import { toast } from "sonner";

import AddImage from "./AddImage";
import EditNoteModal from "./EditNoteModal";
import { useState } from "react";


const { Title, Text } = Typography;

type NoteSectionProps = {
    notes: TNote[];
    categories: TCategory[];
    selectedCategory?: string | null;
    setSelectedCategory?: (categoryId: string | null) => void;
    showArchiveActions?: boolean;
    showDeleteActions?: boolean;
};

const NoteSection = ({
    notes,
    categories,
    selectedCategory,
    setSelectedCategory = () => { },
    showArchiveActions = true,
    showDeleteActions = true
}: NoteSectionProps) => {
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedNote, setSelectedNote] = useState<TNote | null>(null);

    const [updateNote] = useUpdatedNoteMutation()
    const [deleteNote] = useDeleteNoteMutation()
    


    const handleArchive = async (id: string, isArchived: boolean) => {
        console.log(id, isArchived, 'ar');
        const data = {
            isArchived
        }
        try {
            await updateNote({ id, data }).unwrap()
            toast.success(isArchived ? "Note archived" : "Note unarchived")
        } catch (error: any) {
            console.log(error)
            toast.error(error?.data.message || "Failed to update")
        }
    };

    const handleBin = async (id: string, isDeleted: boolean) => {
        console.log(id, isDeleted, 'bin');
        const data = {
            isDeleted
        }
        try {
            await updateNote({ id, data }).unwrap()
            toast.success(isDeleted ? "Note deleted" : "Note restored")
        } catch (error: any) {
            console.log(error)
            toast.error(error?.data.message || "Failed to delete")
        }
    };

    const handlePermanentDelete = async (id: string) => {
        console.log(id, 'per')
        try {
            const res = await deleteNote(id).unwrap()
            console.log(res);
            toast.success("Note deleted permanently")
        } catch (error: any) {
            console.log(error)
            toast.error(error?.data.message || "Failed to permanent delete")
        }
    }


    const handlePinToggle = async (id: string, isPinned: boolean) => {
        // console.log(id, isPinned);
        const data = {
            isPinned
        }
        try {
            const res = await updateNote({ id, data }).unwrap()
            console.log(res);
            toast.success(isPinned ? "Pinned" : "Unpinned")
        } catch (error: any) {
            console.log(error)
            toast.error(error?.data.message || "Failed to Pinned")
        }
    };

    const handleEditNote = (note: TNote) => {
        setSelectedNote(note);
        setEditModalOpen(true);
    };


    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'HIGH': return 'red';
            case 'MEDIUM': return 'orange';
            case 'LOW': return 'green';
            default: return 'blue';
        }
    };
    return (
        <div style={{ padding: '0 16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Title level={4} style={{ marginBottom: 24, color: '#595959', fontWeight: 500 }}>
                    Notes ({notes.length})
                </Title>
                <CategorySection
                    categories={categories}
                    selectedCategory={selectedCategory!}
                    onCategorySelect={setSelectedCategory}
                />
            </div>

            {notes.length === 0 ? (
                <Empty
                    image={<BulbOutlined style={{ fontSize: 48, color: '#bfbfbf' }} />}
                    imageStyle={{ height: 60, opacity: 0.8 }}
                    description={
                        <Text type="secondary" style={{ fontSize: 16 }}>
                            No notes found
                        </Text>
                    }
                    style={{ marginTop: 48 }}
                />
            ) : (
                <Row gutter={[24, 24]}>
                    {notes.map((note) => {
                        const category = categories.find(cat => cat.id === note.categoryId);
                        const cardStyle: React.CSSProperties = {
                            borderLeft: `4px solid ${category?.color || '#d9d9d9'}`,
                            borderRadius: 8,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.09)',
                            transition: 'all 0.3s',
                            display: 'flex',
                            flexDirection: 'column',
                            opacity: note.isDeleted ? 0.7 : 1,
                            // minHeight: 250
                        };

                        return (
                            <Col xs={24} sm={12} md={8} lg={8} key={note.id}>
                                <Card
                                    hoverable={!note.isDeleted}
                                    style={cardStyle}
                                    bodyStyle={{
                                        padding: 16,
                                        // flex: 1,
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}
                                >
                                    {/* Status Indicators */}
                                    <div style={{
                                        position: 'absolute',
                                        top: 12,
                                        right: 12,
                                        display: 'flex',
                                        gap: 8
                                    }}> {!note.isDeleted && (
                                        <Tooltip title={note.isPinned ? "Unpin" : "Pin"}>
                                            <Button
                                                type="text"
                                                icon={<PushpinOutlined style={{ color: note.isPinned ? '#faad14' : '#bfbfbf' }} />}
                                                onClick={() => handlePinToggle(note.id, !note.isPinned)}
                                            />
                                        </Tooltip>
                                    )}

                                    </div>

                                    {/* Category */}
                                    <div style={{
                                        // position: 'absolute',
                                        // top: 12,
                                        // left: 12,
                                        display: 'flex',
                                        gap: 8,
                                        alignItems: 'center',

                                    }}>
                                        <Tag
                                            color={category?.color || '#d9d9d9'}
                                            style={{ color: '#fff' }}
                                        >
                                            {category?.name || 'Uncategorized'}
                                        </Tag>
                                        <Tag color={getPriorityColor(note.priority)}>
                                            {note.priority.toLowerCase()}
                                        </Tag>
                                    </div>

                                    {/* images */}
                                    {note.images && note.images.length > 0 && (
                                        <div style={{ marginTop: 12 }}>
                                            <Image.PreviewGroup>
                                                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                                                    {note.images.map((imgUrl, index) => (
                                                        <Image
                                                            key={index}
                                                            src={imgUrl}
                                                            alt={`note-image-${index}`}
                                                            width={80}
                                                            height={80}
                                                            style={{ objectFit: "cover", borderRadius: 4 }}
                                                        />
                                                    ))}
                                                </div>
                                            </Image.PreviewGroup>
                                        </div>
                                    )}


                                    {/* Title */}
                                    <Title
                                        level={5}
                                        style={{
                                            marginTop: 20,
                                            marginBottom: 8,
                                            fontWeight: 500,
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            textDecoration: note.isDeleted ? 'line-through' : 'none'
                                        }}
                                    >
                                        {note.title}
                                    </Title>


                                    {/* Content */}
                                    <p
                                        className={`mb-4 leading-relaxed ${note.isDeleted ? 'line-through text-gray-400' : 'text-gray-500'
                                            }`}
                                    >
                                        {note.content}
                                    </p>


                                    {/* Footer with Actions */}
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginTop: 'auto'
                                    }}>
                                        {/* edit and image action */}
                                        <div>
                                            {!note.isDeleted && !note.isArchived && (
                                                <div className="flex gap-2">
                                                    <Tooltip title="Edit Note">
                                                        <Button onClick={() => handleEditNote(note)}>
                                                            <EditOutlined />
                                                        </Button>
                                                    </Tooltip>
                                                    <Tooltip title="Add Image">
                                                        <AddImage note={note} />
                                                    </Tooltip>

                                                </div>
                                            )}
                                        </div>

                                        {/* archived and delete actions */}
                                        <Space>
                                            {showArchiveActions && !note.isDeleted && (
                                                <Tooltip title={note.isArchived ? 'Unarchive' : 'Archive'}>
                                                    <Button
                                                        icon={note.isArchived ? <MdOutlineArchive /> : <MdOutlineUnarchive />}
                                                        onClick={() => handleArchive(note.id, !note.isArchived)}
                                                    />
                                                </Tooltip>
                                            )}

                                            {showDeleteActions && (
                                                note.isDeleted ? (
                                                    <>
                                                        <Tooltip title="Restore">
                                                            <Button
                                                                size="middle"
                                                                icon={<RestOutlined />}
                                                                onClick={() => handleBin(note.id, false)}
                                                            />
                                                        </Tooltip>
                                                        <Popconfirm
                                                            title="Permanently delete this note?"
                                                            onConfirm={() => handlePermanentDelete(note.id)}
                                                            okText="Delete"
                                                            cancelText="Cancel"
                                                            okButtonProps={{ danger: true }}
                                                        >
                                                            <Tooltip title="Delete Forever">
                                                                <Button
                                                                    danger
                                                                    icon={<DeleteOutlined />}
                                                                />
                                                            </Tooltip>
                                                        </Popconfirm>
                                                    </>
                                                ) : (
                                                    <Popconfirm
                                                        title={note.isArchived ? "Move to bin?" : "Move to bin?"}
                                                        onConfirm={() => handleBin(note.id, true)}
                                                        okText="Yes"
                                                        cancelText="No"
                                                    >
                                                        <Tooltip title="Delete">
                                                            <Button
                                                                danger
                                                                icon={<DeleteOutlined />}
                                                            />
                                                        </Tooltip>
                                                    </Popconfirm>
                                                )
                                            )}
                                        </Space>
                                    </div>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            )}


            {selectedNote && (
                <EditNoteModal
                    open={editModalOpen}
                    onClose={() => {
                        setEditModalOpen(false);
                        setSelectedNote(null);
                    }}
                    categories={categories}
                    note={selectedNote}
                />
            )}

        </div>
    );
};

export default NoteSection;