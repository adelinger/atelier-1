import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "next-i18next";
import { useRouter } from 'next/router'

// components
import LanguagesDropdown from 'components/Dropdowns/languagesDropdown.js';
import listenForOutsideClicks from "utils/listen-for-outside-clicks";

export default function Navbar(props) {
  const menuRef = useRef(null);
  const [listening, setListening] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const locale = router.locale;
  const [imgSrc, setImgSrc] = useState('../../img/logo/logo_white.webp');

  const { t } = useTranslation('index');

  const toggle = () => setIsOpen(!isOpen);

  useEffect(listenForOutsideClicks(
    listening,
    setListening,
    menuRef,
    setIsOpen,
  ));

  return (
    <>
      <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between" ref={menuRef}>
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start mt-2">
            <Link href="/">
              <a href={`/${router.locale}/`} class="flex items-center">
                <img src={imgSrc} class="image_back" alt="AtelierDS Logo"
                  onMouseOver={e => (setImgSrc('../../img/logo/logo_gray.webp'))}
                  onMouseOut={e => (setImgSrc('../../img/logo/logo_white.webp'))}
                  style={{ height: 70, width: 120 }}></img>

                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
              </a>
            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={toggle}
            >
              <i className="text-white fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none overflow-auto" +
              (isOpen ? " block" : " hidden")
            }
          >
            <ul className="flex flex-col lg:flex-row list-none mr-auto">
              <li className="flex items-center">
                <Link href="/">
                  <a
                    href={`/${router.locale}/`}
                    className={
                      "lg:text-white lg:hover:text-gray-500 text-gray-500 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                    }
                  >
                    {t('common:homepage')}
                  </a>
                </Link>

              </li>
              <li className="flex items-center">
                <Link href="/cars">
                  <a
                    href={`/${router.locale}/cars`}
                    className={
                      "lg:text-white lg:hover:text-gray-500 text-gray-500 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                    }
                  >
                    {t('common:cars_for_sale')}
                  </a>
                </Link>

              </li>
              <li className="flex items-center">
                <Link href="/leather">
                  <a
                    href={`/${router.locale}/leather`}
                    className={
                      "lg:text-white lg:hover:text-gray-500 text-gray-500 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                    }
                  >
                    {t('common:leather_navbar')}
                  </a>
                </Link>

              </li>
              <li className="flex items-center">
                <Link href="/chrome">
                  <a
                    href={`/${router.locale}/chrome`}
                    className={
                      "lg:text-white lg:hover:text-gray-500 text-gray-500 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                    }
                  >
                    {t('common:chrome_parts')}
                  </a>
                </Link>

              </li>
              <li className="flex items-center">
                <Link href='/bodywork' locale={router.locale}>
                  <a
                    href={`/${router.locale}/bodywork`}
                    className={
                      "lg:text-white lg:hover:text-gray-500 text-gray-500 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                    }
                  >
                    {t('common:body_restoration')}
                  </a>
                </Link>
              </li>
              <li className="flex items-center">
                <Link href="/contact">
                  <a
                    href="/contact"
                    className={
                      "lg:text-white lg:hover:text-gray-500 text-gray-500 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                    }
                  >
                    {t('common:contact')}
                  </a>
                </Link>

              </li>
            </ul>
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="flex items-center">
              </li>
              <li className="flex items-center">
                <a
                  className="lg:text-white lg:hover:text-gray-500 text-gray-500 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="https://www.facebook.com/Atelier-DS-2049109098648782/"
                  target="_blank"
                >
                  <i className="lg:text-blueGray-200 text-blueGray-400 fab fa-facebook text-lg leading-lg hover:text-gray-500" />
                  <span className="lg:hidden inline-block ml-2" >Check our Facebook</span>
                </a>
              </li>

              <li className="flex items-center">
                <a
                  className="lg:text-white lg:hover:text-gray-500 text-gray-500 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold "
                  href=""
                  target="_blank"
                >
                  <i className="lg:text-blueGray-200 text-blueGray-400 fab fa-instagram text-lg leading-lg hover:text-gray-500" />
                  <span className="lg:hidden inline-block ml-2">Check our instagram</span>
                </a>
              </li>
              <li className="flex items-center">
                <LanguagesDropdown />
              </li>

            </ul>
          </div>

        </div>
      </nav>
    </>
  );
}
