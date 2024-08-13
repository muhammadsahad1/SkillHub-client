import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import noImg from "../../assets/no img.png";
import { showToastError, showToastSuccess } from "../common/utilies/toast";
import { BarLoader } from "react-spinners";
import { useUploadPost } from "../../hook/usePosts";
import { PostType } from "../../@types/postType";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: "90%",
    sm: "80%",
    md: "70%",
    lg: "60%",
  },
  maxWidth: "500px",
  maxHeight: "90vh",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 20,
  borderRadius: "20px",
  p: 4,
  overflow: "auto",
};

interface PropsValues {
  isOpen: boolean;
  onClose: () => void;
}

const PostSpringModal: React.FC<PropsValues> = ({ isOpen, onClose }) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaSrc, setMediaSrc] = useState<string | null>(null);
  const [caption, setCaption] = useState<string>("");
  const uploadPostMutation = useUploadPost();

  const handleUploadMedia = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
      const validVideoTypes = ["video/mp4", "video/avi", "video/mkv"];

      if (
        validImageTypes.includes(file.type) ||
        validVideoTypes.includes(file.type)
      ) {
        setMediaFile(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          setMediaSrc(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        showToastError("Please upload a valid image or video file.");
      }
    }
  };

  const handlePostMedia = async () => {
    if (!mediaFile && !caption) {
      showToastError("Please provide an image, video, or caption.");
      return;
    }

    setLoading(true);

    let postType: PostType = PostType.THOUGHTS;
    if (mediaFile?.type.startsWith("image/")) {
      postType = PostType.IMAGE;
    } else if (mediaFile?.type.startsWith("video/")) {
      postType = PostType.VIDEO;
    }

    const formData = new FormData();
    if (mediaFile) {
      formData.append("postImage", mediaFile);
    }
    formData.append("caption", caption);
    formData.append("type", postType);

    try {
      const result = await uploadPostMutation.mutateAsync(formData);
      if (result.success) {
        showToastSuccess(result.message);
        resetForm();
        onClose();
      } else {
        showToastError(result.message);
      }
    } catch (error) {
      showToastError("An error occurred while uploading the post.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setMediaFile(null);
    setMediaSrc(null);
    setCaption("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal
      className="min-w-2xl"
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {isLoading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
            <BarLoader color="black" />
          </div>
        )}
        <div
          className={`relative flex flex-col items-center space-y-4 ${
            isLoading ? "blur-sm" : ""
          }`}
        >
          <Typography variant="h6" component="h2" className="text-center">
            <span className="font-poppins font-semibold text-zinc-800">
              Upload Media
            </span>
          </Typography>

          <div className="w-full max-w-md aspect-video flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
            {mediaSrc ? (
              mediaFile?.type.startsWith("image/") ? (
                <img
                  src={mediaSrc}
                  alt="Uploaded content"
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <video
                  src={mediaSrc}
                  controls
                  className="max-w-full max-h-full object-contain"
                />
              )
            ) : (
              <img
                src={noImg}
                alt="No content"
                className="max-w-32 max-h-full object-contain"
              />
            )}
          </div>
          {mediaSrc && (
            <div className="w-full">
              <textarea
                placeholder="Add a caption..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="text-start p-2 py-1 w-full text-zinc-900"
              ></textarea>
            </div>
          )}

          <input
            type="file"
            hidden
            id="addMedia"
            onChange={handleUploadMedia}
            accept="image/*, video/*"
          />
          <div className="flex justify-evenly w-full mt-4">
            {mediaSrc && (
              <button
                className="text-zinc-900 font-bold p-2 w-full md:w-auto px-10 md:px-20 bg-zinc-50 font-poppins border rounded-full border-zinc-900 hover:bg-red-600 hover:text-zinc-200 hover:border-zinc-200 duration-300 mb-2 md:mb-0"
                onClick={resetForm}
              >
                Delete
              </button>
            )}
            {mediaSrc || caption ? (
              <button
                className="text-zinc-900 font-bold p-2 w-full md:w-auto px-10 md:px-20 bg-zinc-50 font-poppins border rounded-full border-zinc-900 hover:bg-blue-500 hover:text-zinc-200 hover:border-zinc-200 duration-300"
                onClick={handlePostMedia}
              >
                Post
              </button>
            ) : (
              <button
                className="text-zinc-900 font-bold p-2 w-full md:w-auto px-10 md:px-20 bg-zinc-50 font-poppins border rounded-full border-zinc-900 hover:bg-zinc-900 hover:text-zinc-200 hover:border-zinc-200 duration-300"
                onClick={() => document.getElementById("addMedia")?.click()}
              >
                Add media
              </button>
            )}
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default PostSpringModal;
