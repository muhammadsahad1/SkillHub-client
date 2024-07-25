import React, { useCallback, useState } from "react";
import Modal from "react-modal";
import Cropper from "react-easy-crop";

interface CoverImageModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onCoverImageChange: (image: string) => void;
}

const CoverImageModal: React.FC<CoverImageModalProps> = ({
  isOpen,
  onRequestClose,
  onCoverImageChange,
}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState<any>(null);

  const onCropComplete = useCallback(
    (croppedArea: any, croppedAreaPixels: any) => {
      setCroppedArea(croppedAreaPixels);
    },
    []
  );

  const handlUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleCrop = async () => {
    if(imageSrc && croppedArea){
      const cropped = await  
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={modalStyle}>
      <div style={modalContentStyle}>
        <button onClick={onRequestClose} style={closeBtnStyle}></button>
        {imageSrc && (
          <div>
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={16 / 9}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
            />
            <button onClick={handleCrop} style={cropButtonStyle}></button>
          </div>
        )}
        <input
          id="addImage"
          type="file"
          hidden
          accept="image/*"
          onChange={handlUploadImage}
        />
        <div className="flex-grow"></div> {/* This ensures the buttons are at the bottom */}
        <div className="flex justify-evenly mb-4 sm">
        <button className="text-zinc-900 font-bold p-2 w-full md:w-auto px-10 md:px-20 bg-zinc-50 font-poppins border rounded-full border-zinc-900 hover:bg-red-600 hover:text-zinc-200 hover:border-zinc-200 duration-300 mb-2 md:mb-0">
            Delete
          </button>
          <button className="text-zinc-900 font-bold p-2 w-full md:w-auto px-10 md:px-20 bg-zinc-50 font-poppins border rounded-full border-zinc-900 hover:bg-zinc-900 hover:text-zinc-200 hover:border-zinc-200 duration-300">
            Upload cover
          </button>
        </div>
      </div>
    </Modal>
  );
};

const modalStyle = {
  content: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    maxWidth: "600px",
    backgroundColor: "#F5F5F5",
    padding: "20px",
    border: "none",
    borderRadius: "8px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    height: "70vh", 
  },
  overlay: {
    background: "rgba(0,0,0,0.44)",
  },
};

const modalContentStyle = {
  display: "flex",
  flexDirection: "column",
  flexGrow: 1, 
};

const closeBtnStyle = {
  position: "absolute",
  top: "10px",
  right: "10px",
  background: "none",
  border: "none",
  cursor: "pointer",
};

const cropButtonStyle = {
  marginTop: "10px",
  padding: "10px 20px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default CoverImageModal;
