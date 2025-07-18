/* eslint-disable @typescript-eslint/no-explicit-any */

import {
    Typography,
    Spin,
    Divider,
    Button,
} from 'antd';
import { useState } from 'react';
import { useGetAllCategoryQuery } from "../../redux/api/category/category";
import { useCreateNoteMutation, useGetMyNoteQuery, useUpdatedNoteMutation,  } from "../../redux/api/notes/noteApi";
import NoteSection from '../../components/Notes/NoteSection';
import { TNote } from '../../types/note';
import { useOutletContext } from 'react-router-dom';
import CreateNoteModal from '../../components/Notes/CreateNoteModel';
import { toast } from 'sonner';

const { Title } = Typography;

const NotesPage = () => {
    const { searchQuery } = useOutletContext<{ searchQuery: string }>()
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [draftNoteId, setDraftNoteId] = useState<string | null>(null);

    //fetch data search and filter by category
    const {
        data: notesData,
        isLoading: notesLoading,
    } = useGetMyNoteQuery({ searchTerm: searchQuery, categoryId: selectedCategory });

    //fetch all categories
    const {
        data: categoriesData,
        isLoading: categoriesLoading
    } = useGetAllCategoryQuery({});

    const notes: TNote[] = notesData?.data || [];
    const categories = categoriesData?.data || [];

    // Create Note mutation hook
    const [createNote] = useCreateNoteMutation();
    const [updateNote] = useUpdatedNoteMutation();

    const handleCreateNote = async (values: any) => {
        console.log(values, "Creating note...");
        try {
            const res = await createNote(values).unwrap();
            console.log(res);
            toast.success(res.message || "Note created successfully!");
            setCreateModalOpen(false);
            setDraftNoteId(null);
        } catch (error: any) {
            console.error('Error creating note:', error);
            toast.error(error.data.message || "Failed to create note. Please try again.");
        }
    };

    // Handle auto-save functionality
    const handleAutoSave = async (values: any) => {
        try {
            if (draftNoteId) {
                // Update existing draft
                await updateNote({ id: draftNoteId, ...values }).unwrap();
            } else {
                // Create new draft note
                const draftData = {
                    ...values
                };
                console.log(draftData, 'draft data');
                const res = await createNote(draftData).unwrap();
                setDraftNoteId(res.data.id);
            }
        } catch (error: any) {
            console.error('Auto-save error:', error);
            throw error; // Re-throw to handle in the modal
        }
    };

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

                <Button type="primary" onClick={() => setCreateModalOpen(true)}>Take Notes</Button>

            </div>

            <Divider />

            <NoteSection
                notes={notes}
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                showArchiveActions={true}
                showDeleteActions={true}
            />

            <CreateNoteModal
                open={createModalOpen}
                onClose={() => setCreateModalOpen(false)}
                onSubmit={handleCreateNote}
                onAutoSave={handleAutoSave}
                categories={categories}
            />
        </div>
    );
};

export default NotesPage;