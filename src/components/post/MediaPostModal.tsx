import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import noIgmg from "../../assets/no img.png";
import { showToastError, showToastSuccess } from "../common/utilies/toast";
import { BarLoader } from "react-spinners";
import { useUploadPost } from "../../hook/usePosts";
import { Ipost, setPost } from "../../redux/features/postSlices";
import { useDispatch, UseDispatch } from "react-redux";
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
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [caption, setCaption] = useState<string>("");
  const uploadPostMutation = useUploadPost();

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePostMedia = async () => {
    setLoading(true);
    const fileInput = document.getElementById("addImage") as HTMLInputElement;
    const file = fileInput.files?.[0];

    if (file) {
      let postType: PostType;
      if (file?.type.startsWith("image/")) {
        postType = PostType.IMAGE;
      } else if (file?.type.startsWith("video/")) {
        postType = PostType.VIDEO;
      } else {
        postType = PostType.THOUGHTS;
      }

      const formData = new FormData();
      formData.append("postImage", file);
      formData.append("caption", caption);
      formData.append("type", postType);

      try {
        // using reactQuery ====> for effciency
        const result = await uploadPostMutation.mutateAsync(formData);
        if (result.success) {
          setImageSrc("");
          setLoading(false);
          showToastSuccess(result.message);
          onClose();
        } else {
          setLoading(false);
          showToastError(result.message);
        }
      } catch (error) {
        setLoading(false);
        showToastError("An error occurred while uploading the post.");
      }
    } else {
      setLoading(false);
      showToastError("Please provide an image or caption.");
    }
  };

  const handlClose = () => {
    setImageSrc("");
    setCaption("");
    onClose();
  };


  return (
    <Modal
      className="min-w-2xl"
      open={isOpen}
      onClose={handlClose}
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
            <img
              src={imageSrc || noIgmg}
              alt="Uploaded content or placeholder"
              className={`${
                imageSrc
                  ? "max-w-full max-h-full object-contain"
                  : "max-w-32 max-h-full object-contain"
              }`}
            />
          </div>

          {imageSrc && (
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
            id="addImage"
            onChange={handleUploadImage}
          />
          <div className="flex justify-evenly w-full mt-4">
            {imageSrc && (
              <button
                className="text-zinc-900 font-bold p-2 w-full md:w-auto px-10 md:px-20 bg-zinc-50 font-poppins border rounded-full border-zinc-900 hover:bg-red-600 hover:text-zinc-200 hover:border-zinc-200 duration-300 mb-2 md:mb-0"
                onClick={() => setImageSrc("")}
              >
                Delete
              </button>
            )}
            {imageSrc ? (
              <button
                className="text-zinc-900 font-bold p-2 w-full md:w-auto px-10 md:px-20 bg-zinc-50 font-poppins border rounded-full border-zinc-900 hover:bg-blue-500 hover:text-zinc-200 hover:border-zinc-200 duration-300"
                onClick={handlePostMedia}
              >
                Post
              </button>
            ) : (
              <button
                className="text-zinc-900 font-bold p-2 w-full md:w-auto px-10 md:px-20 bg-zinc-50 font-poppins border rounded-full border-zinc-900 hover:bg-zinc-900 hover:text-zinc-200 hover:border-zinc-200 duration-300"
                onClick={() => document.getElementById("addImage")?.click()}
              >
                Add image
              </button>
            )}
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default PostSpringModal;
