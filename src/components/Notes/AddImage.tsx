/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from "react";
import { Button, Tooltip } from "antd";
import { LuImagePlus } from "react-icons/lu";
import { TNote } from "../../types/note";
import { useCreateImageMutation } from "../../redux/api/image/imageApi";
import { useUpdatedNoteMutation } from "../../redux/api/notes/noteApi";
import { toast } from "sonner";

const AddImage = ({ note }: { note: TNote }) => {
    console.log(note);
    const [createImage, { isLoading: isUploading }] = useCreateImageMutation()
    const [updateNote, { isLoading }] = useUpdatedNoteMutation()
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = async (event: any) => {
        const file = event.target.files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append("image", file as File);
        const toastId = toast.loading("Uploading image...");


        try {
            // call your backend upload endpoint
            const res = await createImage(formData).unwrap();
            const url = res.data.imageUrl;

            const updatedImages = [...(note.images || []), url];
            const data = { images: updatedImages };
            const updateData = await updateNote({ id: note.id, data }).unwrap()
            console.log(updateData, 'update data');
            toast.success("Image uploaded successfully!", {
                id: toastId,
            });

        } catch (error) {
            console.error(error);
            toast.error("Upload error", {
                id: toastId,
            });
        }
    }



    return (
        <Tooltip title="Add Image">
            <>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                />
                <Button onClick={handleClick} loading={isLoading || isUploading}>
                    <LuImagePlus  />
                </Button>
            </>
        </Tooltip>
    );
};

export default AddImage;
