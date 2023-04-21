import React, { Component } from "react";
import Router from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Error404 () {
 
const handleOnClick = () => {
  Router.push('/')
}
const { t } = useTranslation('404Page');
return (
      <>
 <div class="flex items-center justify-center w-screen h-screen">
  <div class="px-4 lg:py-12">
    <div class="lg:gap-4 lg:flex">
      <div
        class="flex flex-col items-center justify-center md:py-24 lg:py-32"
      >
        <h1 class="font-bold text-blue-600 text-9xl">404</h1>
        <p
          class="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl"
        >
          <span class="text-red-500">Oops!</span> {t('page_not_found')}
        </p>
        <p class="mb-8 text-center text-gray-500 md:text-lg">
        {t('page_not_found_text')}
        </p>
        <a
          href="#"
          class="px-6 py-2 text-sm font-semibold text-blue-800 bg-blue-100"
          onClick={handleOnClick}
          >{t('go_home')} </a
        >
      </div>
      <div class="mt-4">
        <img
          src="/img/errors/404_dog.webp"
          alt="404 not found"
          class="object-cover w-full h-full"
        />
      </div>
    </div>
  </div>
</div>
      </>
    );

};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['404Page']),
  },
})
