import React from "react";
import { Modal, Button } from "antd";

interface DynamicModalProps {
  isOpen: boolean;
  isClose: () => void;
  onConfirm: () => void;
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
  return (
    <Modal
      open={isOpen}
      title={<h2 className="text-2xl font-bold text-gray-800">{title}</h2>}
      onCancel={isClose}
      footer={[
        <Button
          key="cancel"
          onClick={isClose}
          className="bg-gray-300 text-gray-700 hover:bg-gray-400"
        >
          {cancelText}
        </Button>,
        <Button
          key="confirm"
          onClick={onConfirm}
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          {confirmText}
        </Button>,
      ]}
      destroyOnClose
    
    >
      <p className="text-gray-700">{content}</p>
    </Modal>
  );
};

export default PopUpModal;
