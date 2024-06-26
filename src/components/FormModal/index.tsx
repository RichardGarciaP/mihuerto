import FeatherIconCom from "CommonElements/Icons/FeatherIconCom";
import CommonModal from "CommonElements/Ui-kits/CommonModal";
import { LargeModalData } from "Data/Ui-kits/ModalData";
import React, { Fragment, useState } from "react";
import { Button } from "reactstrap";
import { Large_Modal, Startyourgoals } from "utils/Constant";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

interface FormModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: ReactJSXElement;
}

const FormModal = ({ isOpen, setIsOpen, children }: FormModalProps) => {
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const ModalData = {
    isOpen: isOpen,
    header: false,
    onClose: () => {},
    class: "modal-lg",
    toggler: toggle,
    title: "Large modal",
    size: "fullscreen",
  };
  return (
    <CommonModal modalData={ModalData}>
      <>
        <Fragment>
          <div className="large-modal-body">{children}</div>
        </Fragment>
      </>
    </CommonModal>
  );
};

export default FormModal;
