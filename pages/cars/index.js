import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";

// components

import Navbar from "components/Navbars/IndexNavbar";
import Footer from "components/Footers/Footer.js";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getSingleCar, loadCars } from "lib/apiCalls";
import CarCard from "components/Cards/CarCard";
import Image from "next/image";
import ApiService from "auth/service/ApiService";
import { LinearProgress } from "@mui/material";

export default function CarsForSale({ cars, serverUrl }) {
  const { t } = useTranslation('carsPage');
  const dropdownMenuRef = useRef();
  const [isDropdownVisible, setIsDropdownVisible] = useState();
  const [carsList, setCarsList] = useState(cars);
  const [sortButtonTitle, setSortButtonTitle] = useState(t('sort_cars_by'))
  const [sortOrder, setSortOrder] = useState('newest');
  const [showUpButton, setShowUpButton] = useState();
  const [showMoreLoader, setShowMoreLoader] = useState();
  const [showSortLoader, setShowSortLoader] = useState();
  const scrollUpRef = useRef();

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.addEventListener('click', handleClick);
    return () => {
      document.body.removeEventListener('click', handleClick);
    };
  }, []);

  const goUp = () => {
    scrollUpRef.current.scrollIntoView({ behavior: 'smooth' });
    setShowUpButton(false);
  }

  const handleScroll = () => {
    const half = window.innerHeight;
    const position = window.pageYOffset;

    if (position >= half) {
      setShowUpButton(true)
      return;
    }

    setShowUpButton(false);
  }


  const api = new ApiService();

  function getAllCars(pageSize, sortParam) {
    api
      .getCarsPublic(pageSize, sortParam)
      .then(response => response.data)
      .then(data => {
        setCarsList(data);
        setShowMoreLoader(false)
        setShowSortLoader(false);
      })
      .catch((error) => {
        setShowMoreLoader(false);
      });
  }

  const onShowMoreButtonClick = () => {
    setShowMoreLoader(true);
    getAllCars(0, sortOrder);
  }

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  }

  const onRadioButtonChange = (event) => {
    setShowSortLoader(true);
    setSortOrder(event.target.value);
    getAllCars(9, event.target.value);
  }

  const handleClick = (event) => {
    if (dropdownMenuRef) {
      if (event.target.id !== 'dropdownRadioBgHover' && event.target.id !== 'dropdownRadioBgHoverButton') {
        setIsDropdownVisible(false);
        return;
      }
    }
  }

  return (
    <>
      <Navbar />
      <main>
        <div ref={scrollUpRef} className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('/img/cars/citroen_ds_garrage_cover.webp')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-75 bg-black"
            ></span>
          </div>
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 mt-5 md:mt-0 md:px-4 ml-auto mr-auto text-center">
                <div className="md:-mt-15">
                  <h1 className="text-white font-semibold text-5xl">
                    {t('cars_for_sale')}
                  </h1>
                  <p className="mt-4 text-lg text-blueGray-200">
                    {cars.length === 0 ?
                      <p className="text-gray-100 mt-10 mb-10">{t('no_cars_message')}</p>
                      :
                      t('title_message')
                    }
                  </p>
                  <div className="relative" >
                    <button id="dropdownRadioBgHoverButton" onClick={toggleDropdown} data-dropdown-toggle="dropdownRadioBgHover"
                      class="mt-5 py-2 px-6 btn-primary-indigo"
                      type="button">{sortButtonTitle}<svg class="ml-3 w-4 h-4 mt-2 " aria-hidden="true" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round"
                          stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>
                    <div id="dropdownRadioBgHover" ref={dropdownMenuRef}
                      class={`${isDropdownVisible ? '' : 'hidden'} absolute left-0 right-0 ml-auto mr-auto mt-1 z-10 w-52 bg-white rounded divide-y divide-gray-100 
                        shadow dark:bg-gray-700 dark:divide-gray-600`}>
                      <ul class="content-start p-2 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownRadioBgHoverButton">
                        <li>
                          <div class="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                            <label for="default-radio-1" class="text-left mr-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
                              <input onClick={() => { setSortButtonTitle((t('sort_cars_by_year'))) }} onChange={onRadioButtonChange} id="default-radio-1" type="radio" value="carYearDesc" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 
                              focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"></input>
                              &nbsp; {t('year_younger')}
                            </label>
                          </div>
                        </li>
                        <li>
                          <div class="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                            <label for="default-radio-2" class="text-left text-sm font-medium text-gray-900 rounded dark:text-gray-300">
                              <input onClick={() => { setSortButtonTitle((t('sort_cars_by_year'))) }} onChange={onRadioButtonChange} id="default-radio-2" type="radio" value="carYearAsc" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300
                               focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"></input>
                              &nbsp; {t('year_older')}</label>
                          </div>
                        </li>
                        <li>
                          <div class="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                            <label for="default-radio-3" class="text-left text-sm font-medium text-gray-900 rounded dark:text-gray-300">
                              <input onClick={() => { setSortButtonTitle((t('sort_cars_by_price'))) }} onChange={onRadioButtonChange} id="default-radio-3" type="radio" value="carPriceAsc" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 
                              focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"></input>
                              &nbsp; {t('price_lower')}</label>
                          </div>
                        </li>
                        <li>
                          <div class="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                            <label for="default-radio-4" class="text-left text-sm font-medium text-gray-900 rounded dark:text-gray-300">
                              <input onClick={() => { setSortButtonTitle((t('sort_cars_by_price'))) }} onChange={onRadioButtonChange} id="default-radio-4" type="radio" value="carPriceDesc" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 
                              focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"></input>
                              &nbsp; {t('price_higher')}</label>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-16" style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </div>

        <section className="pb-20 bg-blueGray-200">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-8 rounded-lg">
                {showSortLoader &&
                  <div className="mt-10 mb-5">
                    <LinearProgress color="inherit"></LinearProgress>
                  </div>
                }

                {
                  carsList.length === 0 ?
                    <div className="text-center">
                      <Image
                        alt="No results"
                        src="/img/errors/no-results.webp"
                        width={300}
                        height={300}
                      ></Image>
                    </div>
                    :
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-3 flex-auto">
                      {carsList.map(car =>
                        <div className="mt-5 mb-5 ml-auto mr-auto" >
                          <CarCard car={car} serverUrl={serverUrl}></CarCard>
                        </div>
                      )}

                    </div>
                }
              </div>
            </div>

            {showMoreLoader &&
              <div className="mt-1 mb-5">
                <LinearProgress color="inherit"></LinearProgress>
              </div>
            }

            {carsList.length === 9 &&
              <div className="w-full text-center">
                <button className="mt-5 btn-primary-gray" onClick={onShowMoreButtonClick}>{t('show_more')}</button>
              </div>
            }

          </div>
        </section>
        {showUpButton &&
          <button onClick={goUp} className='float-right mr-5 fixed bottom-10 right-10 mb-30' >
            <div class="arrow"  >
              <span></span>
            </div>
          </button>
        }
      </main>
      <Footer />
    </>
  );
}




export async function getStaticProps({ locale }) {
  const cars = await loadCars(9, 'newest');
  const { STATIC_FILES_URL } = process.env;
  return {
    props: {
      cars: cars,
      serverUrl: STATIC_FILES_URL,
      ...await serverSideTranslations(locale, ['common', 'carsPage', 'footer']),
    },
    revalidate: 10,
  }
}


export async function getCarData(id) {
  const car = await getSingleCar(id);

  return {
    id,
    ...car,
  };
}
