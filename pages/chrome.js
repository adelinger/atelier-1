import Footer from 'components/Footers/Footer';
import Navbar from 'components/Navbars/IndexNavbar';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ImagePreview from 'components/Modals/ImagePreview';
import { isMobile } from 'react-device-detect';
import { useTranslation } from 'next-i18next';


export default function Chrome() {
  const { t } = useTranslation('chromePage');
  const scrollRef = useRef(null)
  const scrollUpRef = useRef(null)
  const [showModal, setShowModal] = useState(false);
  const [showUpButton, setShowUpButton] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState();

  const chrome_images = ['/img/chrome/chrome_page_1.webp', '/img/chrome/chrome_page_2.webp',
    '/img/chrome/chrome_page_3.webp', '/img/chrome/chrome_page_4.webp', '/img/chrome/chrome_page_5.webp',
    '/img/chrome/chrome_page_6.webp', '/img/chrome/chrome_page_7.webp', '/img/chrome/chrome_page_8.webp',
    '/img/chrome/chrome_page_9.webp']

  const toggleModal = () => {
    if (!isMobile) {
      setShowModal(!showModal);
    }
  }

  const executeScroll = () => {
    scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    setShowUpButton(true);
  }

  const goUp = () => {
    scrollUpRef.current.scrollIntoView({ behavior: 'smooth' });
    setShowUpButton(false);
  }

  const handleScroll = () => {
    const { offsetTop } = scrollRef.current;
    const position = window.pageYOffset;

    if (position >= (offsetTop - (offsetTop * 0.1))) {
        setShowUpButton(true)
        return;
    } 

    setShowUpButton(false);
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
}, []); 

  return (
    <>
      <Navbar transparent></Navbar>
      <main>
      <div ref={scrollUpRef}  className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover" style={{
              backgroundImage:
                "url('/img/chrome/chrome_cover2.jpeg')",
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
                  {t('our_work_title')}
                  </h1>
                  <p className="mt-4 text-lg text-blueGray-200 px-1">
                  {t('our_work_text_1')}
                  </p>
                  <button onClick={executeScroll} type="button" class="py-2 px-6 btn-primary-indigo mt-7">
                      {t('see_gallery_btn')}
                     
                    </button>
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
        <section className="pb-20 -mb-10 bg-blueGray-200 -mt-24 px-3">
          <div className="container mx-auto px-4 pt-20">
            <div className="container mx-auto mt-5">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto md:text-center">
                <div className="md:mt-8">
                  <h1 className="text-blueGray-500 font-semibold text-3xl">
                    {t('what_do_we_fix_title')}
                  </h1>

                </div>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3 place-items-center mt-5">
                <div >
                  <h3 className="text-1xl mb-2 leading-normal font-bold text-blueGray-500">{t('fix_type_1')}</h3>
                  <ul className='list-disc font-light text-blueGray-500'>
                    <li>{t('fix_1_1')}</li>
                    <li>{t('fix_1_2')}</li>
                    <li>{t('fix_1_3')}</li>
                    <li>{t('fix_1_4')}</li>
                    <li>{t('fix_1_5')}</li>
                    <li>{t('fix_1_6')}</li>
                    <li>{t('fix_1_7')}</li>
                    <li>{t('fix_1_8')}</li>
                    <li>{t('fix_1_9')}</li>
                    <li>{t('fix_1_10')}</li>
                    <li>{t('fix_1_11')}</li>
                    <li>{t('fix_1_12')}</li>
                    <li>{t('fix_1_13')}</li>
                    <li>{t('fix_1_14')}</li>
                    <li>{t('fix_1_15')}</li>
                    <li>{t('fix_1_16')}</li>
                    <li>{t('fix_1_17')}</li>
                  </ul>
                </div>
                < div className="md:mt-5 md:mb-5" >
                  <h3 className="text-1xl mb-2 font-bold leading-normal text-blueGray-500">{t('fix_type_2')}</h3>
                  <ul className='list-disc font-light text-blueGray-500'>
                    <li>{t('fix_2_1')}</li>
                    <li>{t('fix_2_2')}</li>
                    <li>{t('fix_2_3')}</li>
                    <li>{t('fix_2_4')}</li>
                    <li>{t('fix_2_5')}</li>
                    <li>{t('fix_2_6')}</li>
                    <li>{t('fix_2_7')}</li>
                    <li>{t('fix_2_8')}</li>
                    <li>{t('fix_2_9')}</li>
                    <li>{t('fix_2_10')}</li>
                    <li>{t('fix_2_11')}</li>
                    <li>{t('fix_2_12')}</li>
                    <li>{t('fix_2_13')}</li>
                    <li>{t('fix_2_14')}</li>
                    {!isMobile && <li className='md:invisible'></li>}
                    {!isMobile && <li className='md:invisible'></li>}
                    {!isMobile && <li className='md:invisible'></li>}
                    {!isMobile && <li className='md:invisible'></li>}
                  </ul>
                </div>
                < div className="md:mt-5 md:mb-5" >
                  <h3 className="text-1xl mb-2 font-bold leading-normal text-blueGray-500">{t('fix_type_3')}</h3>
                  <ul className='list-disc font-light text-blueGray-500'>
                    <li>{t('fix_3_1')}</li>
                    <li>{t('fix_3_2')}</li>
                    <li>{t('fix_3_3')}</li>
                    <li>{t('fix_3_4')}</li>
                    <li>{t('fix_3_5')}</li>
                    <li>{t('fix_3_6')}</li>
                    <li>{t('fix_3_7')}</li>
                    <li>{t('fix_3_8')}</li>
                    <li>{t('fix_3_9')}</li>
                    <li>{t('fix_3_10')}</li>
                    <li>{t('fix_3_11')}</li>
                    <li>{t('fix_3_12')}</li>
                    {!isMobile && <li className='md:invisible'></li>}
                    {!isMobile && <li className='md:invisible'></li>}
                    {!isMobile && <li className='md:invisible'></li>}
                    {!isMobile && <li className='md:invisible'></li>}
                    {!isMobile && <li className='md:invisible'></li>}
                    {!isMobile && <li className='md:invisible'></li>}
                  </ul>
                </div>

              </div>
            </div>
          </div>
        </section>

        <section id='third-section' ref={scrollRef} className="pb-5 relative block bg-blueGray-100">
          <div
            className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20" style={{ transform: "translateZ(0)" }}
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
                className="text-blueGray-100 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>

          <div className="container mx-auto px-4 lg:pt-23 lg:pb-32">
            <div className="container mx-auto ">

              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto md:text-center mb-5">
                <div>
                  <h1 className="text-white font-semibold text-3xl invisible">
                    {t('gallery_title')}
                  </h1>
                </div>
              </div>

              <div className="">
                <div class="container mx-auto space-y-2 lg:space-y-0 lg:gap-2 lg:grid lg:grid-cols-3">
                  {chrome_images.map((image, index) => {
                    return <div class="w-full rounded md:hover:opacity-50 md:cursor-pointer">
                      <Image
                       src={image}
                       className='transform duration-500'
                       width={400}
                       height={300}
                       alt="chrome restoration image" 
                       loading='lazy'
                       placeholder='blur'
                       blurDataURL='/img/blue_blur.png'
                       onClick={() => { toggleModal(); setSelectedIndex(index)}}>
                      </Image>
                    </div>
                  })}
                </div>
              </div>
            </div>
            {!isMobile &&
              <ImagePreview
                showModal={showModal}
                setShowModal={setShowModal}
                imagesList={chrome_images}
                toggleModal={toggleModal}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
              ></ImagePreview>
            }

            {showUpButton &&
              <button onClick={goUp} className='float-right mr-5 fixed bottom-10 right-10 mb-30' >
                <div class="arrow"  >
                  <span></span>
                </div>
              </button>
            }


          </div>
        </section>



      </main>
      <Footer></Footer>
    </>
  );
}

export async function getStaticProps({ params, locale }) {
  return {
    props: {
      ...await serverSideTranslations(locale, ['common', 'chromePage', 'footer']),
    },
  };
}