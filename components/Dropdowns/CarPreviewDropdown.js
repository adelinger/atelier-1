import React, { useEffect, useRef, useState } from "react";
import { createPopper } from "@popperjs/core";
import listenForOutsideClicks from "utils/listen-for-outside-clicks";
import ConfirmDialog from "components/Alerts/ConfirmDialog";
import { Link } from "@mui/material";

function CarPreviewDropdown({onDeleteClick, onStatusUpdate, carId, carStatus}) {
  const btnRef = useRef(null);
  const [listening, setListening] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [confirmDialogMessage, setConfirmDialogMessage] = useState(null);
  const [confirmDialogButton, setConfirmDialogButton] = useState(null);
  const [isDelete, setIsDelete] = useState(false);

  const toggle = () =>{
    setIsOpen(!isOpen);
  } 

  function handleConfirm(show, confirmed){
    setShowConfirm(show);

    if(confirmed){
      if(isDelete){
        handleOnDeleteClick();
      }else{
        handleOnMarkAsSoldClick();
      }
      
    }
  }

  const handleOnDeleteClick = () => {
   onDeleteClick(selectedItem);
  }

  const handleOnMarkAsSoldClick = () => {
    onStatusUpdate(carId);
   }


  useEffect(listenForOutsideClicks(listening, setListening, btnRef, setIsOpen));


  return (
    <>
     {showConfirm&&
          <ConfirmDialog message = {confirmDialogMessage} confirmButton={confirmDialogButton} showConfirm={showConfirm} handleConfirm={handleConfirm}></ConfirmDialog>
        }
      <a
        className="text-blueGray-500 py-1 px-3"
        href="#"
        ref={btnRef}
        onClick={(e) => {
          e.preventDefault();
          toggle();
        }}
      >
        <i className="fas fa-ellipsis-v"></i>
      </a>
      <div
        className={
          (isOpen ? "block " : "hidden ") +
          "bg-white absolute right-0 text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <Link href={`/cars/${encodeURIComponent(carId)}`} style={{ textDecoration: 'none' }}>
        <a
         href={`/cars/${encodeURIComponent(carId)}`}
         target='_blank'
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
         
        >
          See on the site
        </a>
        </Link>
        <Link href={`update/${encodeURIComponent(carId)}`} style={{ textDecoration: 'none' }}>
        <a
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
         
        >
          Update
        </a>
        </Link>
        <a
          href="#"
          {...carStatus === 'Sold' ? 'Disabled' : ''} 
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => {
            e.preventDefault();
            setConfirmDialogMessage('Are you sure you want to mark this car as sold?');
            setConfirmDialogButton('Mark as sold');
            setIsDelete(false);
            setShowConfirm(true);
          }}
        >
          Mark as sold
        </a>
        <a
          href="#"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => {
            e.preventDefault();
            setShowConfirm(true);
            setConfirmDialogMessage('Are you sure you want to delete this car?');
            setConfirmDialogButton('Delete');
            setIsDelete(true)
            setSelectedItem(e.target.parentElement.parentElement.parentElement.getAttribute('data'));
          }}
        >
          Delete
        </a>
      </div>
    </>
  );
};

export default CarPreviewDropdown;

