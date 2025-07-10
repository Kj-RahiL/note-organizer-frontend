// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useGetAllCategoryQuery } from "../../redux/api/category/category";
// import { useGetAllNoteQuery } from "../../redux/api/notes/noteApi";


// const NotesPage = () => {
//     const { data: notesData, isLoading: notesLoading } = useGetAllNoteQuery({});
//     const { data: categoriesData, isLoading: categoriesLoading } = useGetAllCategoryQuery({});

//     const notes = notesData?.data || [];
//     const categories = categoriesData?.data || [];

//     if (notesLoading || categoriesLoading) {
//         return <div className="p-6">Loading...</div>;
//     }

//     return (
//         <div className="p-6">
//             <h1 className="text-3xl font-bold mb-6">Notes</h1>

//             {/* Categories List */}
//             <div className="mb-6">
//                 <h2 className="text-xl font-semibold mb-2">Categories</h2>
//                 <div className="flex flex-wrap gap-2">
//                     {categories.map((category:any) => (
//                         <span
//                             key={category.id}
//                             className="text-sm px-3 py-1 rounded text-white"
//                             style={{ backgroundColor: category.color }}
//                         >
//                             {category.name}
//                         </span>
//                     ))}
//                 </div>
//             </div>

//             {/* Notes Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 {notes.map((note:any) => (
//                     <div
//                         key={note.id}
//                         className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
//                     >
//                         <div className="flex justify-between items-center mb-2">
//                             <h2 className="text-xl font-semibold">{note.title}</h2>
//                             {note.isPinned && (
//                                 <span className="text-yellow-500 text-xl">📌</span>
//                             )}
//                         </div>

//                         <p className="text-gray-700 mb-4">{note.content}</p>

//                         <div className="flex justify-between items-center">
//                             {/* Category Badge */}
//                             {note.category ? (
//                                 <span
//                                     className="text-sm px-2 py-1 rounded text-white"
//                                     style={{ backgroundColor: note.category.color }}
//                                 >
//                                     {note.category.name}
//                                 </span>
//                             ) : (
//                                 <span className="text-sm text-gray-400">No Category</span>
//                             )}

//                             {/* Priority Badge */}
//                             <span
//                                 className={`text-xs font-semibold px-2 py-1 rounded ${note.priority === 'HIGH'
//                                         ? 'bg-red-500 text-white'
//                                         : note.priority === 'MEDIUM'
//                                             ? 'bg-yellow-500 text-white'
//                                             : 'bg-green-500 text-white'
//                                     }`}
//                             >
//                                 {note.priority}
//                             </span>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default NotesPage;


import {
    Row,
    Col,
    Card,
    Typography,
    Tag,
    Spin,
    Alert,
    Divider,
    Empty,
    Badge,
    Avatar
} from 'antd';
import {
    PushpinOutlined,
    BookOutlined,
    BulbOutlined,
    CheckOutlined,
    UserOutlined,
    FolderOutlined,
    FileOutlined
} from '@ant-design/icons';
import { useGetAllCategoryQuery } from "../../redux/api/category/category";
import { useGetAllNoteQuery } from "../../redux/api/notes/noteApi";

const { Title, Text } = Typography;
const { Meta } = Card;

const NotesPage = () => {
    const {
        data: notesData,
        isLoading: notesLoading,
        isError: notesError,
        error: notesErrorData
    } = useGetAllNoteQuery({});

    const {
        data: categoriesData,
        isLoading: categoriesLoading,
        isError: categoriesError,
        error: categoriesErrorData
    } = useGetAllCategoryQuery({});

    const notes = notesData?.data || [];
    const categories = categoriesData?.data || [];

    const getCategoryIcon = (name) => {
        switch (name.toLowerCase()) {
            case 'work':
                return <FolderOutlined />;
            case 'study':
                return <BookOutlined />;
            case 'tasks':
                return <CheckOutlined />;
            case 'personal':
                return <UserOutlined />;
            case 'ideas':
                return <BulbOutlined />;
            default:
                return <FileOutlined />;
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'HIGH':
                return 'red';
            case 'MEDIUM':
                return 'orange';
            case 'LOW':
                return 'green';
            default:
                return 'blue';
        }
    };

    // Handle loading state
    if (notesLoading || categoriesLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
                <Spin size="large" />
            </div>
        );
    }

    // Handle error states
    if (notesError || categoriesError) {
        const errorMessage = notesErrorData?.message || categoriesErrorData?.message || 'Failed to load data';
        return (
            <div style={{ margin: '24px 0' }}>
                <Alert message="Error" description={errorMessage} type="error" showIcon />
            </div>
        );
    }

    return (
        <div style={{ padding: '24px' }}>
            <Title level={2} style={{ marginBottom: '24px' }}>My Notes</Title>

            {/* Categories Section */}
            <div style={{ marginBottom: '36px' }}>
                <Title level={4} style={{ marginBottom: '16px', color: '#8c8c8c' }}>Categories</Title>
                <Row gutter={[16, 16]}>
                    {categories.map((category) => {
                        const noteCount = notes.filter(note => note.categoryId === category.id).length;
                        return (
                            <Col xs={24} sm={12} md={8} lg={6} key={category.id}>
                                <Card
                                    hoverable
                                    style={{ borderLeft: `4px solid ${category.color}` }}
                                >
                                    <Meta
                                        avatar={
                                            <Avatar
                                                style={{
                                                    backgroundColor: `${category.color}20`,
                                                    color: category.color
                                                }}
                                                icon={getCategoryIcon(category.name)}
                                            />
                                        }
                                        title={category.name}
                                        description={`${noteCount} ${noteCount === 1 ? 'note' : 'notes'}`}
                                    />
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </div>

            <Divider />

            {/* Notes Section */}
            <div>
                <Title level={4} style={{ marginBottom: '16px', color: '#8c8c8c' }}>All Notes</Title>
                {notes.length === 0 ? (
                    <Empty
                        image={<BulbOutlined style={{ fontSize: '48px', color: '#d9d9d9' }} />}
                        imageStyle={{ height: 60 }}
                        description={
                            <span style={{ color: '#8c8c8c' }}>
                                No notes yet. Create your first note to get started.
                            </span>
                        }
                    />
                ) : (
                    <Row gutter={[16, 16]}>
                        {notes.map((note) => {
                            const category = categories.find(cat => cat.id === note.categoryId);
                            return (
                                <Col xs={24} sm={12} md={8} key={note.id}>
                                    <Card
                                        hoverable
                                        style={{
                                            borderLeft: `4px solid ${category?.color || '#d9d9d9'}`,
                                            position: 'relative'
                                        }}
                                    >
                                        {note.isPinned && (
                                            <Badge.Ribbon
                                                text="Pinned"
                                                color="gold"
                                                placement="start"
                                            >
                                                <div style={{ position: 'absolute', top: 12, right: 12 }}>
                                                    <PushpinOutlined style={{ color: '#faad14' }} />
                                                </div>
                                            </Badge.Ribbon>
                                        )}
                                        <div style={{ marginBottom: '12px' }}>
                                            <Tag
                                                color={category?.color || '#d9d9d9'}
                                                style={{ color: '#fff' }}
                                            >
                                                {category?.name || 'Uncategorized'}
                                            </Tag>
                                            {note.isArchived && (
                                                <Tag color="default" style={{ float: 'right' }}>Archived</Tag>
                                            )}
                                        </div>
                                        <Title level={5} style={{ marginBottom: '8px' }}>{note.title}</Title>
                                        <Text
                                            type="secondary"
                                            ellipsis={{ rows: 3 }}
                                            style={{ display: 'block', marginBottom: '12px' }}
                                        >
                                            {note.content}
                                        </Text>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Tag color={getPriorityColor(note.priority)}>
                                                {note.priority.toLowerCase()}
                                            </Tag>
                                            <Text type="secondary">
                                                {new Date(note.createdAt).toLocaleDateString()}
                                            </Text>
                                        </div>
                                    </Card>
                                </Col>
                            );
                        })}
                    </Row>
                )}
            </div>
        </div>
    );
};

export default NotesPage;