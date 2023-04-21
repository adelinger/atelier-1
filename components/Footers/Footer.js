import React from "react";
import { useTranslation } from "next-i18next";
import { useState } from "react";

export default function Footer() {
    const { t } = useTranslation();
    const [src, setSrc] = useState('../../img/logo/logo.webp');

    return (
        <>

            <footer class="bg-white sm:p-6 dark:bg-gray-800 p-4 md:px-4">
                <div class="md:flex md:justify-between">
                    <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div className="md:mr-5">
                            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">{t('footer:office_title')}</h2>
                            <ul class="text-gray-600 dark:text-gray-400 text-sm">
                                <li><i class="fa fa-user"></i> Enzo Forgione </li>
                                <li class="hover:underline mt-2"><i class="fa fa-map-marker"></i><a target="_blank" rel="noopener noreferrer" href="https://goo.gl/maps/kkYBJw6h1TzhvsUKA"> I-39100 Bolzano</a></li>
                                <li class="hover:underline mt-2"><i class="fa fa-mobile"></i> <a href="tel:(39) 3472408435">+39/347/2408435</a> </li>
                                <li class="hover:underline mt-2"><i class="fa fa-envelope"></i><a href="mailto:info@atelierds.net"> info@atelierds.net</a></li>

                            </ul>
                        </div>
                        <div className="ml-5">
                            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">{t('footer:our_work')}</h2>
                            <ul class="text-gray-600 dark:text-gray-400 ml-5">
                                <li className="list-disc">
                                    <a href="/leather" class="hover:underline">{t('common:interior')}</a>
                                </li>
                                <li class="mt-2 list-disc">
                                    <a href="/chrome" class="hover:underline">{t('common:chrome')}</a>
                                </li>
                                <li className="mt-2 list-disc">
                                    <a href="/bodywork" class="hover:underline">{t('common:bodywork')}</a>
                                </li>
                            </ul>
                        </div>
                        <div className="md:ml-5">
                            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">{t('footer:about_us')}</h2>
                            <ul class="text-gray-600 dark:text-gray-400 ml-5">
                                <li className="list-disc" >
                                    <a href="/contact" class="hover:underline">{t('footer:contact')}</a>
                                </li>
                                <li class="mt-2 list-disc">
                                    <a href="https://autotoni.hr" target={'_blank'} class="hover:underline">{t('footer:our_partner')}</a>
                                </li>
                            </ul>
                        </div>

                        <div class="mb-6 md:mb-0  md:hidden">
                            <a href="/" class="flex items-center">
                                <img src={src} class="mr-3 h-8 mt-5 md:mt-0" alt="AtelierDS Logo"
                                    style={{ height: 70, width: 120 }}></img>
                                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
                            </a>
                        </div>

                    </div>
                    <div class="mb-6 md:mb-0 hidden md:block">
                        <a href="/" class="flex items-center">
                            <img src={src} class="mr-3 h-8 mt-5 md:mt-0" alt="AtelierDS Logo" style={{ height: 70, width: 120 }}
                                onMouseOver={e => (setSrc('../../img/logo/logo_black.webp'))}
                                onMouseOut={e => (setSrc('../../img/logo/logo.webp'))}></img>

                            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
                        </a>
                    </div>
                </div>

                <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4"></hr>
                <div class="sm:items-center sm:justify-between ">
                    <span class="text-sm text-gray-500 flex justify-center dark:text-gray-400">© {new Date().getFullYear("")}<a href="#" class="hover:underline"></a>&nbsp;{t('footer:copyright')}
                    </span>
                </div>
            </footer>

        </>
    );
}

