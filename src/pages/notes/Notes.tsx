


import {
    Typography,
    Spin,
    Divider,
} from 'antd';
import { useState } from 'react';
import { useGetAllCategoryQuery } from "../../redux/api/category/category";
import { useGetAllNoteQuery } from "../../redux/api/notes/noteApi";
import CategorySection from '../../components/Notes/CategorySection';
import NoteSection from '../../components/Notes/NoteSection';
import { TNote } from '../../types/note';
import { useOutletContext } from 'react-router-dom';

const { Title } = Typography;

const NotesPage = () => {
    const { searchQuery } = useOutletContext<{ searchQuery: string }>()
    console.log(searchQuery, 'oii kire ');
    const {
        data: notesData,
        isLoading: notesLoading,
    } = useGetAllNoteQuery({searchTerm: searchQuery});

    const {
        data: categoriesData,
        isLoading: categoriesLoading
    } = useGetAllCategoryQuery({});

    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const notes:TNote[] = notesData?.data || [];
    const categories = categoriesData?.data || [];

    // Filter notes by selected category
    const filteredNotes = selectedCategory
        ? notes.filter(note => note.categoryId === selectedCategory)
        : notes;

    if (notesLoading || categoriesLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Title level={2} style={{ marginBottom: '24px' }}>My Notes</Title>
                <CategorySection
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onCategorySelect={setSelectedCategory}
                />
            </div>

            <Divider />

            <NoteSection
                notes={filteredNotes}
                categories={categories}
                showArchiveActions={true}
                showDeleteActions={true}
            />
        </div>
    );
};

export default NotesPage;