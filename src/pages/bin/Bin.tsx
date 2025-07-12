
import Title from "antd/es/typography/Title";
import NoteSection from "../../components/Notes/NoteSection";
import { useGetAllCategoryQuery } from "../../redux/api/category/category";
import { useGetAllNoteQuery } from "../../redux/api/notes/noteApi";
import { Spin } from "antd";


const BinPage = () => {
    const {
        data: notesData,
        isLoading: notesLoading,
    } = useGetAllNoteQuery({ isDeleted: true });

    const {
        data: categoriesData,
        isLoading: categoriesLoading
    } = useGetAllCategoryQuery({});

    const notes = notesData?.data || [];
    const categories = categoriesData?.data || [];

    // Handle loading state
    if (notesLoading || categoriesLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div style={{ padding: '24px' }}>
            <Title level={2} style={{ marginBottom: '24px' }}>My Notes</Title>

            {/* Notes Section */}
            <NoteSection notes={notes} categories={categories} showArchiveActions={true}
                showDeleteActions={true} />

        </div>
    );
}

export default BinPage