import React, { useEffect, useRef, useState } from "react";
import { createPopper } from "@popperjs/core";
import { withProtected } from "auth/hook/route";
import listenForOutsideClicks from "utils/listen-for-outside-clicks";

const UserDropdown = ({auth}) => {
  // dropdown props
  const { logout, user, error } = auth;
  const popoverDropdownRef = React.createRef();
  const btnRef = useRef(null);
  const [listening, setListening] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () =>{
    createPopper(btnRef.current, popoverDropdownRef.current, {
      placement: "left-start",
    }); 
    setIsOpen(!isOpen);
  } 

  useEffect(listenForOutsideClicks(listening, setListening, btnRef, setIsOpen));

  
  return (
    <>
      <a
        className="text-blueGray-500 block"
        href="#"
        ref={btnRef}
        onClick={(e) => {
          e.preventDefault();
          toggle();
        }}
      >
        <div className="items-center flex">
          <span  className={
             "text-white text-sm hidden lg:inline-block font-semibold"
          }>{user.email}  
            
          </span>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (isOpen ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <div className="h-0 my-2 border border-solid border-blueGray-100" />
        <a
          href="#"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={logout}
        >
          Log out
        </a>
      </div>
    </>
  );
};

export default withProtected(UserDropdown);
