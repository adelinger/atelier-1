import Footer from 'components/Footers/Footer';
import Navbar from 'components/Navbars/IndexNavbar';
import React, { useState } from 'react';
import Image from 'next/image';
import { isMobile } from 'react-device-detect';
import ImagePreview from 'components/Modals/ImagePreview';

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from 'next-i18next';


export default function Bodywork() {
  const [showModal, setShowModal] = useState(false);
  const [src, setSrc] = useState('/img/bodywork/body_work_place.webp');
  const { t } = useTranslation('bodyworkPage');
  const [selectedIndex, setSelectedIndex] = useState();

  const chromeImages = ['/img/bodywork/slika1.webp', '/img/bodywork/slika2.webp', '/img/bodywork/slika3.webp', '/img/bodywork/slika4.webp',
    '/img/bodywork/slika5.webp', '/img/bodywork/slika6.webp', '/img/bodywork/slika7.webp', '/img/bodywork/slika8.webp',
    '/img/bodywork/slika9.webp', '/img/bodywork/slika10.webp']
  const chromeImagesTitles = ['DS', 'DS', 'DS', 'DS', 'CX', 'CX', 'DS Convertible', 'DS Convertible', 'DS Convertible', 'DS Break']

  const toggleModal = () => {
    if (!isMobile) {
      setShowModal(!showModal);
    }
  }


  return (
    <>
      <Navbar transparent></Navbar>
      <main>
        <div className="relative pt-32  pb-32  flex content-center items-center justify-center min-h-screen-75">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('/img/light-grey-19.webp')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-75 bg-black"
            ></span>
          </div>
          <div className="container relative mx-auto collapse">
            <div className="items-center flex flex-wrap">
              <div className="container mx-auto">

                <div class="grid grid-cols-1 md:grid-cols-6 gap-4">

                  <div class="col-span-3 px-5 md:ml-10">
                    <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                      <h1 className="text-white font-semibold text-3xl">
                        {t('main_title')}
                      </h1>
                    </div>

                    <div class="items-center justify-center">
                      <p class="text-lg font-light leading-relaxed mt-4 text-white"><div dangerouslySetInnerHTML={
                        { __html: t('text_1', { interpolation: { escapeValue: false } }) }
                      } />
                        <div dangerouslySetInnerHTML={
                          { __html: t('text_2', { interpolation: { escapeValue: false } }) }
                        } />
                        <br></br>
                        <div dangerouslySetInnerHTML={
                          { __html: t('text_3', { interpolation: { escapeValue: false } }) }
                        } />
                      </p>
                    </div>

                    <ul className="list-none mt-6">
                      <li className="py-1">
                        <div className="flex items-center">
                          <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-100 mr-3">
                              <i className="fas fa-comment"></i>
                            </span>
                          </div>
                          <div>
                            <h4 className="text-gray-300">
                              {t('direct')}
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
                            <h4 className="text-gray-300">
                              {t('top')}
                            </h4>
                          </div>
                        </div>
                      </li>
                      <li className="py-2">
                        <div className="flex items-center">
                          <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-100 mr-3">
                              <i class="fas fa-hammer"></i>
                            </span>
                          </div>
                          <div>
                            <h4 className="text-gray-300">
                              {t('toughest')}
                            </h4>
                          </div>
                        </div>
                      </li>
                      <li className="py-2">
                        <div className="flex items-center">
                          <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-100 mr-3">
                              <i class="fas fa-wrench"></i>
                            </span>
                          </div>
                          <div>
                            <h4 className="text-gray-300">
                              {t('expert')}
                            </h4>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div class="col-span-3 px-5 transform duration-500">
                    <Image src={src} alt='bodywork place' width={700} height={500}
                      placeholder='blur'
                      blurDataURL='/img/blur.png'
                      loading='lazy'
                     onMouseOver={e => (setSrc('/img/bodywork/body_work2.webp'))}
                     onMouseOut={e => (setSrc('/img/bodywork/body_work_place.webp'))} />
                  </div>

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

        <section className="pb-20 -mb-10 bg-blueGray-200 -mt-24 px-3">
          <div className="container mx-auto px-4 pt-20">
            <div className='container'>

              <div id="portfolio" class="section relative z-0 py-12 md:py-8 ">
                <div class="flex flex-wrap flex-row">
                  {
                    chromeImages.map((image, index) => {
                      return <figure class="flex-shrink max-w-full px-3 w-full sm:w-1/2 lg:w-1/5 group wow fadeInUp" data-wow-duration="1s">
                        <div class="relative overflow-hidden cursor-pointer mb-6">
                          <a role='button' data-gallery="gallery1" data-glightbox="title: My title; description: This is a wider card with supporting text below as a natural lead-in to additional content" class="glightbox3">
                            <Image 
                            width={500} 
                            height={350}
                             class="block w-full h-auto transform duration-500 hover:scale-125" 
                             onClick={() => { toggleModal(); setSelectedIndex(index) }} src={image} alt="Citroen DS"
                             placeholder='blur'
                             blurDataURL='/img/blur.png'
                             >
                             </Image>
                            <div onClick={() => { toggleModal(); setSelectedIndex(index) }} class="absolute inset-x-0 bottom-0 h-20 transition-opacity duration-500 ease-in opacity-0 group-hover:opacity-100 overflow-hidden px-4 py-2 text-gray-100 bg-black text-center">
                              <h3 class="text-base leading-normal font-semibold my-1 text-white">Citroen</h3>
                              <small class="d-block">{chromeImagesTitles[index]}</small>
                            </div>
                          </a>
                        </div>
                      </figure>
                    })
                  }

                </div>
              </div>
            </div>
            {!isMobile &&
              <ImagePreview
                showModal={showModal}
                setShowModal={setShowModal}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
                imagesList={chromeImages}
                toggleModal={toggleModal}
              ></ImagePreview>
            }
          </div>


        </section>

      </main>
      <Footer></Footer>
    </>
  );
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'bodyworkPage', 'footer']),
  },
})