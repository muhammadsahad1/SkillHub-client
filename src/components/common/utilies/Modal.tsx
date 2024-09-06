import React, { useState } from "react";
import { Modal, Button } from "antd";
import { Input } from "@mui/material";

interface DynamicModalProps {
  isOpen: boolean;
  isClose: () => void;
  onConfirm: (inputVal?: string) => void;
  title: string;
  content: string;
  confirmText?: string;
  cancelText?: string;
}

const PopUpModal: React.FC<DynamicModalProps> = ({
  isOpen,
  isClose,
  onConfirm,
  title,
  content,
  confirmText = "Confirm",
  cancelText = "Cancel",
}) => {

  const [inputVal , setInputVal] = useState<string | ''>('')

  const handleChangeInputVal = (e : React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value)
  }

  const handleConfirm = () => {
    if(content === "Report Post"){
      onConfirm(inputVal)
    }else{
      onConfirm()
    }
  }

  return (
    <Modal
      open={isOpen}
      title={<h2 className="text-1xl font-bold text-gray-800">{title}</h2>}
      onCancel={isClose}
  
      footer={[
        <Button
          key="cancel"
          onClick={isClose}
          className="bg-gray-300 text-gray-700 hover:bg-gray-400 cursor-pointer"
        >
          {cancelText}
        </Button>,
        <Button
          key="confirm"
          onClick={handleConfirm}
          className="bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
        >
          {confirmText}
        </Button>,
      ]}
      destroyOnClose
    >
      {content === "Report Post" ? (
        <Input placeholder="Enter you reason here" value={inputVal} onChange={handleChangeInputVal}/>
      ): (
        <p className="text-gray-700">{content}</p>

      )}
    </Modal>
  );
};

export default PopUpModal;
