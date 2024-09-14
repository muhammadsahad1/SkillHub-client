// import React, { useCallback, useState } from "react";
// import Modal from "react-modal";
// import Cropper from "react-easy-crop";
// import { getCroppedImg } from "./getCroppedImg";
// import noCover from '../../../assets/no cover image1.jpg';
// import { DotLoader } from "react-spinners";

// interface CoverImageModalProps {
//   isOpen: boolean;
//   onRequestClose: () => void;
//   onCoverImageChange: (image: File) => void;
// }

// const CoverImageModal: React.FC<CoverImageModalProps> = ({
//   isOpen,
//   onRequestClose,
//   onCoverImageChange,
// }) => {
//   const [imageSrc, setImageSrc] = useState<string | null>(null);
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   // const [croppedArea, setCroppedArea] = useState<any>(null);
//   const [isLoading, setLoading] = useState<boolean>(false);
//   const [isCropping, setIsCropping] = useState<boolean>(true);



//   const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     const reader = new FileReader();
//     reader.onload = () => {
//       setImageSrc(reader.result as string);
//     };
//     if (file) {
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleCrop = async () => {
//     if (imageSrc && croppedArea) {
//       setLoading(true);
//       const croppedBlob = await getCroppedImg(imageSrc, croppedArea);
//       const file = new File([croppedBlob], "cropped-cover-image.jpg", { type: 'image/jpg' });
//       onCoverImageChange(file);
//       onRequestClose();
//       setLoading(false);
//     }
//   };

//   const handleSave = async () => {
//     if (imageSrc) {
//       setLoading(true);
//       const response = await fetch(imageSrc);
//       const blob = await response.blob();
//       const file = new File([blob], "cover-image.jpg", { type: 'image/jpg' });
//       onCoverImageChange(file);
//       onRequestClose();
//       setLoading(false);
//     }
//   };

//   return (
//     <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={modalStyle} ariaHideApp={false}>
//       <div style={modalContentStyle}>
//         {imageSrc ? (
//           <div style={{ position: "relative", height: "100%", width: "100%" }}>
//             {isCropping ? (
//               <>
//                 <Cropper
//                   image={imageSrc}
//                   crop={crop}
//                   zoom={zoom}
//                   aspect={16 / 9}
//                   onCropChange={setCrop}
//                   onCropComplete={onCropComplete}
//                   onZoomChange={setZoom}
//                   cropShape="rect"
//                   showGrid={false}
//                   objectFit="cover"
//                 />
//                 <button onClick={handleCrop} style={cropButtonStyle}>
//                   Save Crop
//                 </button>
//                 <button onClick={() => setIsCropping(false)} style={cropButtonStyle}>
//                   Skip Cropping
//                 </button>
//               </>
//             ) : (
//               <>
//                 <img src={imageSrc} alt="Selected" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
//                 <button onClick={handleSave} style={cropButtonStyle}>
//                   Save Image
//                 </button>
//               </>
//             )}
//           </div>
//         ) : (
//           <div className="flex justify-center items-center">
//             <img src={noCover} alt="cover image" className="mt-20 w-1/2"/>
//           </div>
//         )}
//         <div className="flex-grow"></div>
//         <div className="flex justify-evenly mb-4 sm mt-4">
//           <button className="text-zinc-900 font-bold p-2 w-full md:w-auto px-10 md:px-20 bg-zinc-50 font-poppins border rounded-full border-zinc-900 hover:bg-red-600 hover:text-zinc-200 hover:border-zinc-200 duration-300 mb-2 md:mb-0"
//             onClick={() => setImageSrc('')}>
//             Delete
//           </button>
//           <input type="file" hidden id="addImage" onChange={handleUploadImage} />
//           <button
//             className="text-zinc-900 font-bold p-2 w-full md:w-auto px-10 md:px-20 bg-zinc-50 font-poppins border rounded-full border-zinc-900 hover:bg-zinc-900 hover:text-zinc-200 hover:border-zinc-200 duration-300"
//             onClick={() => document.getElementById("addImage")?.click()}>
//             Add Image
//           </button>
//         </div>
//         {isLoading && <DotLoader />}
//       </div>
//     </Modal>
//   );
// };

// const modalStyle = {
//   content: {
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     width: "80%",
//     maxWidth: "600px",
//     backgroundColor: "#F5F5F5",
//     padding: "20px",
//     border: "none",
//     borderRadius: "8px",
//     overflow: "hidden",
//     display: "flex",
//     flexDirection: "column",
//     marginBottom: "5px",
//     height: "70vh",
//   },
//   overlay: {
//     background: "rgba(0,0,0,0.44)",
//   },
// };

// const modalContentStyle: React.CSSProperties = {
//   display: "flex",
//   flexDirection: "column",
//   flexGrow: 1,
// };

// const cropButtonStyle: React.CSSProperties = {
//   position: "absolute",
//   bottom: "10px",
//   left: "50%",
//   color: "black",
//   transform: "translateX(-50%)",
//   padding: "10px 20px",
//   backgroundColor: "white",
//   font: "bold",
//   border: "none",
//   borderRadius: "5px",
//   cursor: "pointer",
// };

// export default CoverImageModal;
