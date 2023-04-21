import React, { useEffect, useState } from "react";
import { createPopper } from "@popperjs/core";
import { useRouter } from "next/router";

import listenForOutsideClicks from "utils/listen-for-outside-clicks";

const LanguagesDropdown = () => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const menuRef = React.createRef();

  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  const closeOnOutsideClick = (e) => {
    if(e.target.id !== 'languageDropdownHolder' && e.target.id !== 'languageButton'){
      closeDropdownPopover();
    }
  }

  useEffect(() => {
    document.body.addEventListener('click', closeOnOutsideClick);
},
);

  const handleLocaleChange = (value) => (event) => {
    router.push(router.route, router.asPath, {
      locale: value,
    });
  };
  return (
    <>
      <a
      id="languageButton"
        className="lg:text-white lg:hover:text-gray-700 text-gray-500 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
        href="#"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
         {router.locale === 'en' && ( <> <img class='md:hidden mr-2' src={'/img/flags/' + 'de' + '.svg'}  height="20px" width="20px" title="Language-flag"/> English </> )}
         {router.locale === 'de' && ( <> <img class='md:hidden mr-2' src={'/img/flags/' + 'de' + '.svg'}  height="20px" width="20px" title="Language-flag"/> Deutsch </> )}
         {router.locale === 'fr'&& ( <> <img class='md:hidden mr-2' src={'/img/flags/' + 'de' + '.svg'}  height="20px" width="20px" title="Language-flag"/> Francais </> )}
         {router.locale === 'it' && ( <> <img class='md:hidden mr-2' src={'/img/flags/' + 'de' + '.svg'}  height="20px" width="20px" title="Language-flag"/> Italiano </> )}

      </a>
      
      <div
      id="languageDropdownHolder"
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
           {router.locales.map(element=>{
            <span
            className={
              "text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-blueGray-400"
            }
          >
            {router.locale}
          </span>
       })}
           
         {router.locales.map((element) => {  
              if(router.locale !== element){
                return(
                    
                    <button  className="{py-2 px-4  bg-transparent text-blueGray-700 left}" onClick={handleLocaleChange(element)} >
                    <a 
                      className={
                        "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                      }
                    >   
                        <img src={'/img/flags/' + element + '.svg'}  height="20px" width="20px" title="Language-flag"/> 
                        
                    </a>
                   
                  </button>);

              }  
       })}
      </div>
    </>
  );
};

export default LanguagesDropdown;
