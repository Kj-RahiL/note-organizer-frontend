/* eslint-disable @typescript-eslint/no-explicit-any */
import  { useRef } from "react";
import { Button, Tooltip } from "antd";
import { LuImagePlus } from "react-icons/lu";
import { TNote } from "../../types/note";

const AddImage = ({ note }: { note: TNote }) => {
    console.log(note);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event:any) => {
        const file = event.target.files[0];
        if (file) {
          
            //     const formData = new FormData();
            //     formData.append("image", imageFile as File);

            //     try {
            //         // call your backend upload endpoint
            //         const res = await createImage(formData).unwrap();

            //         const data = res.data

            //         setImagePreview(data.imageUrl);

            //     } catch (error) {
            //         console.error(error);
            //         toast.error("Upload error");
            //     }

 
            // try {
            //     const res = await updateNote({ id, data }).unwrap()
            //     console.log(res);
            //     toast.success(isPinned ? "Pinned" : "Unpinned")
            // } catch (error: any) {
            //     console.log(error)
            //     toast.error(error?.data.message || "Failed to Pinned")
            // }
        }
    };

 

    return (
        <Tooltip title="Add Image">
            <>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                />
                <Button onClick={handleClick}>
                    <LuImagePlus />
                </Button>
            </>
        </Tooltip>
    );
};

export default AddImage;
