import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";

// components

import Navbar from "components/Navbars/IndexNavbar";
import Footer from "components/Footers/Footer.js";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CardEmail from "components/Cards/CardEmail";
import Image from "next/image";

export default function Landing() {
  const { t } = useTranslation(['index', 'footer', 'common']);
  const [showUpBtn, setShowUpBtn] = useState();
  const scrollRef = useRef(); 
  const baseRef = useRef();

  const handleButtonUpClick = () => {
    baseRef.current.scrollIntoView({ behavior: 'smooth' });
    setShowUpBtn(false);
    //setShowUpBtn(false);
  }

  const handleScroll = () => {
    const { offsetTop } = scrollRef.current
    const position = window.pageYOffset;

    if (position >= (offsetTop - (offsetTop * 0.1))) {
        setShowUpBtn(true)
        return;
    } 

    setShowUpBtn(false);
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
}, []);



  return (
    <>
      <Navbar transparent />
      <main>
        <div ref={baseRef} className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('/img/image_ds.webp')",
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
                <div>
                  <h1 className="text-white font-semibold text-5xl">
                    {t('AtelierDS')}
                  </h1>
                  <p className="mt-4 text-lg text-blueGray-200 px-1">
                    {t('welcome_text')}
                  </p>

                  <Link href="cars">
                    <a className=" mt-5 py-2 px-6 btn-primary-indigo ">
                      {t('check_our_cars')}
                    </a>
                  </Link>

                </div>
              </div>
            </div>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-16"
            style={{ transform: "translateZ(0)" }}
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

        <section className="pb-20 bg-blueGray-200 -mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-blueGray-700">
                      <i class="fas fa-couch"></i>
                    </div>
                    <h6 className="text-xl font-semibold">{t('leather')}</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">{t('leather_text')}</p>
                    <Link href="/leather">
                      <a
                        href="/leather"
                        className="btn-primary-indigo"
                      >
                        <span>{t('see_more')}</span>
                      </a>
                    </Link>

                  </div>
                </div>
              </div>

              <div className="w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-blueGray-700">
                      <i class="fas fa-hard-hat"></i>
                    </div>
                    <h6 className="text-xl font-semibold">{t('chrome_parts')}</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                      {t('chrome_parts_text')}
                    </p>
                    <Link href="chrome">

                      <a
                        href="/chrome"
                        className="btn-primary-indigo"
                      >
                        <span>{t('see_more')}</span>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-blueGray-700">
                      <i class="fas fa-car"></i>
                    </div>
                    <h6 className="text-xl font-semibold">{t('body_restauration')}</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                      {t('body_restauration_text')}
                    </p>
                    <Link href="bodywork">
                      <a
                        href="bodywork"
                        className="btn-primary-indigo"
                      >
                        <span>{t('see_more')}</span>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center mt-15 md:mt-32">
              <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white mr-5">
                  <i class="fas fa-box-open"></i>
                </div>
                <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white mr-5">
                  <i class="fas fa-wrench"></i>
                </div>
                <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                  <i class="fas fa-shipping-fast"></i>
                </div>
                <h3 className="text-3xl mb-2 font-semibold leading-normal">
                  {t('working_with_us')}
                </h3>
                <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                  {t('working_with_us_text1')}
                </p>
                <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-600">
                  {t('working_with_us_text2')}
                </p>
              </div>

              <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-blueGray-700">
                  <Image
                    alt="Citroen Garrage"
                    src="/img/citroen_ds_garrage.webp"
                    width={385}
                    height={255}
                    className="w-full align-middle rounded-t-lg transform duration-500"
                    loading="lazy"
                  ></Image>
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
                    <h4 className="text-xl font-bold text-white">
                      {t('quality_service')}
                    </h4>
                    <p className="text-md font-light mt-2 text-white">
                      {t('quality_service_text')}
                    </p>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section ref={scrollRef}  className="relative py-20">
          <div
            className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
            style={{ transform: "translateZ(0)" }}
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
                className="text-white fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>

          <div className="container mx-auto px-4">
            <div className="items-center flex flex-wrap">
              <div className="w-full md:w-6/12 mr-auto px-4">
                <div class="aspect-w-16 aspect-h-9">
                  <iframe src="https://www.youtube.com/embed/pubCOysznOE" title="Modà - Vittima - Videoclip Ufficiale" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
              </div>
              <div className="w-full md:w-5/12 ml-auto px-4">
                <div className="md:pr-12">
                  <h3 className="text-3xl font-semibold md:mt-0 mt-5">{t('a_growing_company')}</h3>
                  <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                    {t('a_growing_company_text')}
                  </p>
                  <ul className="list-none mt-6">
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-100 mr-3">
                            <i className="fas fa-fingerprint"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-blueGray-500">
                            {t('personal_touch')}
                          </h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-100 mr-3">
                            <i class="fas fa-paint-brush"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-blueGray-500">
                            {t('perfect_blend')}
                          </h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-100 mr-3">
                            <i class="fab fa-gratipay"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-blueGray-500">
                            {t('crafted_with_love')}
                          </h4>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pt-15 md:pt-20 pb-48">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center text-center mb-24">
              <div className="w-full lg:w-6/12 px-4">
                <h2 className="text-4xl font-semibold">{t('people_working_on_a_project')}</h2>
                <p className="text-lg leading-relaxed m-4 text-blueGray-500">
                  {t('people_working_on_a_project_text')}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                <div className="px-6">
                  <img
                    alt="Company member picture"
                    src="/img/landing/ceo.png"
                    className="shadow-lg rounded-full mx-auto max-w-120-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">{t('enzo')}</h5>
                    <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                      {t('enzo_text')}
                    </p>

                  </div>
                </div>
              </div>
              <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                <div className="px-6">
                  <img
                    alt="Company member picture"
                    src="/img/landing/sofa.png"
                    className="shadow-lg rounded-full mx-auto max-w-120-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">{t('luki')}</h5>
                    <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                      {t('luki_text')}
                    </p>

                  </div>
                </div>
              </div>
              <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                <div className="px-6">
                  <img
                    alt="Company member picture"
                    src="/img/landing/transport.png"
                    className="shadow-lg rounded-full mx-auto max-w-120-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">{t('christian')}</h5>
                    <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                      {t('christian_text')}
                    </p>

                  </div>
                </div>
              </div>
              <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 px-4">
                <div className="px-6">
                  <img
                    alt="Company member picture"
                    src="/img/landing/car.png"
                    className="shadow-lg rounded-full mx-auto max-w-120-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">{t('antun')}</h5>
                    <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                      {t('antun_text')}
                    </p>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-20 relative block bg-blueGray-800">
          <div
            className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
            style={{ transform: "translateZ(0)" }}
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
                className="text-blueGray-800 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>

          <div className="container mx-auto px-4 lg:pt-23 lg:pb-64">
            <div className="flex flex-wrap justify-center">
              <div className="w-full lg:w-3/12 px-4 text-center">
                <div className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                  <i className="fas fa-medal text-xl"></i>
                </div>
                <h6 className="text-xl mt-5 font-semibold text-white">
                  {t('excellent_services')}
                </h6>
                <p className="mt-2 mb-4 text-blueGray-400">
                  {t('excellent_services_text')}
                </p>
              </div>
              <div className="w-full lg:w-3/12 px-4 text-center">
                <div className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                  <i className="fas fa-poll text-xl"></i>
                </div>
                <h5 className="text-xl mt-5 font-semibold text-white">
                  {t('we_growing')}
                </h5>
                <p className="mt-2 mb-4 text-blueGray-400">
                  {t('we_growing_text')}
                </p>
              </div>
              <div className="w-full mb-5 lg:-mb-5 lg:w-3/12 px-4 text-center">
                <div className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                  <i className="fas fa-lightbulb text-xl"></i>
                </div>
                <h5 className="text-xl mt-5 font-semibold text-white">
                  {t('like')}
                </h5>
                <p className="mt-2 mb-4 text-blueGray-400">
                  {t('like_text')}
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="relative block py-24 lg:pt-0 bg-blueGray-800">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center lg:-mt-64 -mt-48">
              <CardEmail t={t}></CardEmail>
            </div>
          </div>
        </section>
        {showUpBtn &&
          <button className='float-right mr-5 fixed bottom-10 right-10 mb-30' onClick={handleButtonUpClick}>
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

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'index', 'footer']),
  },
})