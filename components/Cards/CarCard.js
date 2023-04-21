import { Link } from "@mui/material";
import { auto } from "@popperjs/core";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import React from "react";
import { height } from "tailwindcss/defaultTheme";

// components

export default function CarCard({ car, serverUrl }) {

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  const { t } = useTranslation('index', 'common', 'carsPage');
  const src = serverUrl + car.carPhotosPath + '/' + car.carProfilePhotoPath;


  return (
    <>
      <main>
        <div className="w-full px-4 mr-auto ml-auto mr-auto" >
          <div className="break-words bg-white w-full shadow-lg rounded-lg bg-blueGray-700  mx-auto" style={{ minHeight: 530 }}>
            <div className="min-h-48" style={{ minHeight: 230 }}>
              <a href={`cars/${encodeURIComponent(car.atelierCarID)}`}  >
                <Image 
                width={370} 
                height={270} 
                class="rounded-t-lg mr-auto transform duration-500" 
                loader={() => src} src={src}  
                loading="lazy"
                placeholder='blur'
                blurDataURL='/img/blur.png'
                 />
              </a>
            </div>
            <blockquote className="relative p-8 mb-4">
              <svg
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 583 95"
                className="absolute left-0 w-full block h-95-px -top-94-px"
              >
                <polygon
                  points="-30,95 583,95 583,65"
                  className="text-blueGray-700 fill-current"
                ></polygon>
              </svg>
              <div class="p-1">
                  <div className="h-15"><h5 class="h-16 mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">{car.carMake + ' ' + car.carModel}</h5></div>
                <div>
                  <p class="mb-3 font-normal text-blueGray-400 dark:text-white-400">
                    {t('carsPage:year')}: {car.carYear}
                    <br>
                    </br>
                    Km: {numberWithCommas(car.carKilometers)}
                  </p>

                  <Link href={`cars/${encodeURIComponent(car.atelierCarID)}`} class="mt-3 btn-primary-indigo-slim">
                    {t('carsPage:read_more')}
                    <svg class="ml-2 mt-1 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" 
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" 
                      clip-rule="evenodd"></path></svg>
                  </Link>
                  <p className={`float-right text-3x1 font-bold mt-5 text-blueGray-400 w-28 ${car.carPrice == 0 && 'mt-1.5'}`} >
                    {car.carPrice != 0 ? numberWithCommas(car.carPrice) + ',00' + ' €' : t('common:price_on_enquiry')}
                  </p>
                </div>
              </div>
            </blockquote>
          </div>
        </div>
      </main>
    </>
  );
}
