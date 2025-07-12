import { Button, Card, Col, Empty, Row, Tag, Typography, Space, Popconfirm } from "antd";
import {
    PushpinOutlined,
    BulbOutlined,
    DeleteOutlined,
    FolderOutlined,
    FolderOpenOutlined,
    RestOutlined
} from '@ant-design/icons';
import { TCategory, TNote } from "../../types/note";

const { Title, Text } = Typography;

type NoteSectionProps = {
    notes: TNote[];
    categories: TCategory[];
    onArchive?: (id: string, isArchived: boolean) => void;
    onDelete?: (id: string, isDeleted: boolean) => void;
    showArchiveActions?: boolean;
    showDeleteActions?: boolean;
};

const NoteSection = ({
    notes,
    categories,
    onArchive = () => {},
    onDelete = () => {},
    showArchiveActions = true,
    showDeleteActions = true
}: NoteSectionProps) => {
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
            <Title level={4} style={{ marginBottom: 24, color: '#595959', fontWeight: 500 }}>
                Notes ({notes.length})
            </Title>

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
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            opacity: note.isDeleted ? 0.7 : 1
                        };

                        return (
                            <Col xs={24} sm={12} md={8} lg={6} key={note.id}>
                                <Card
                                    hoverable={!note.isDeleted}
                                    style={cardStyle}
                                    bodyStyle={{
                                        padding: 16,
                                        flex: 1,
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
                                    }}>
                                        {note.isPinned && !note.isDeleted && (
                                            <PushpinOutlined style={{ color: '#faad14', fontSize: 16 }} />
                                        )}
                                        {note.isArchived && !note.isDeleted && (
                                            <Tag color="geekblue">Archived</Tag>
                                        )}
                                        {note.isDeleted && (
                                            <Tag color="error">Deleted</Tag>
                                        )}
                                    </div>

                                    {/* Category */}
                                    <div style={{ marginBottom: 12 }}>
                                        <Tag
                                            color={category?.color || '#d9d9d9'}
                                            style={{ color: '#fff' }}
                                        >
                                            {category?.name || 'Uncategorized'}
                                        </Tag>
                                    </div>

                                    {/* Title */}
                                    <Title
                                        level={5}
                                        style={{
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
                                    <Text
                                        type="secondary"
                                        ellipsis={{}}
                                        style={{
                                            display: 'block',
                                            marginBottom: 16,
                                            flex: 1,
                                            lineHeight: 1.5,
                                            textDecoration: note.isDeleted ? 'line-through' : 'none'
                                        }}
                                    >
                                        {note.content}
                                    </Text>

                                    {/* Footer with Actions */}
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginTop: 'auto'
                                    }}>
                                        <Tag color={getPriorityColor(note.priority)}>
                                            {note.priority.toLowerCase()}
                                        </Tag>

                                        <Space>
                                            {showArchiveActions && !note.isDeleted && (
                                                <Button
                                                    size="small"
                                                    icon={note.isArchived ? <FolderOpenOutlined /> : <FolderOutlined />}
                                                    onClick={() => onArchive(note.id, !note.isArchived)}
                                                >
                                                    {note.isArchived ? 'Unarchive' : 'Archive'}
                                                </Button>
                                            )}

                                            {showDeleteActions && (
                                                note.isDeleted ? (
                                                    <>
                                                        <Button
                                                            size="small"
                                                            icon={<RestOutlined />}
                                                            onClick={() => onDelete(note.id, false)}
                                                        >
                                                            Restore
                                                        </Button>
                                                        <Popconfirm
                                                            title="Permanently delete this note?"
                                                            onConfirm={() => onDelete(note.id, true)}
                                                            okText="Delete"
                                                            cancelText="Cancel"
                                                            okButtonProps={{ danger: true }}
                                                        >
                                                            <Button
                                                                size="small"
                                                                danger
                                                                icon={<DeleteOutlined />}
                                                            >
                                                                Delete Forever
                                                            </Button>
                                                        </Popconfirm>
                                                    </>
                                                ) : (
                                                    <Popconfirm
                                                        title={note.isArchived ? "Move to bin?" : "Move to bin?"}
                                                        onConfirm={() => onDelete(note.id, true)}
                                                        okText="Yes"
                                                        cancelText="No"
                                                    >
                                                        <Button
                                                            size="small"
                                                            danger
                                                            icon={<DeleteOutlined />}
                                                        >
                                                            Delete
                                                        </Button>
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
        </div>
    );
};

export default NoteSection;