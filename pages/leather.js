import Footer from 'components/Footers/Footer';
import Navbar from 'components/Navbars/IndexNavbar';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { isMobile } from 'react-device-detect';
import ImagePreview from 'components/Modals/ImagePreview';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";
import { CircularProgress, LinearProgress, Skeleton } from '@mui/material';


export default function Interior() {
    const { t } = useTranslation(['leatherPage']);
    const [showModal, setShowModal] = useState(null);
    const scrollRef = useRef(null)
    const carouselRef = useRef(null);
    const [leatherName, setLeatherName] = useState('Cuire naturelle');
    const [leatherDesc, setLeatherDesc] = useState(t('leatherPage:cuir_naturelle_text'));
    const [leatherYear, setLeatherYear] = useState(t('leatherPage:cuir_naturelle_year'));
    const [leatherCar, setLeatherCar] = useState('Citroen DS');
    const [useTimer, setUseTimer] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [showlideButtons, setShowSlideButtons] = useState(false);
    const [selectedImage, setSelectedImage] = useState(0);
    const [galleryImageSelectedIndex, setGalleryImageSelectedIndex] = useState();
    const [showLoader, setShowLoader] = useState(false);
    const [isManualSlide, setIsManualSlide] = useState();
    const prefix = '/img/interior/';

    const leatherNames = ['Cuire naturelle', 'Cuir Tabac', 'Cuire Noire', 'Naturelle Foncée', 'Prestige Beige', 'Beige Claire', 'Rouge', 'Cassis', 'Tabac Blonde'];
    const leatherYears = [t('cuir_naturelle_year'), t('cuir_tabac_year'),
    t('cuir_noire_year'), t('naturelle_foncee_year'), t('prestige_beige_year', '', '', '', '')]
    const leatherDescriptions = [t('cuir_naturelle_text'), t('cuir_tabac_text'),
    t('cuir_noire_text'), t('naturelle_foncee_text'), t('prestige_beige_text'), '', '', '', '']
    const leatherCars = ['Citroen DS', 'Citroen SM, Citroen DS', 'Citroen SM, Citroen DS, Citroen CX Serie I, Citroen CX Serie II',
        'Citroen SM, Citroen DS, Citroen CX Serie I', 'Citroen CX Serie I', 'Citroen CX Serie I', 'Citroen CX Serie I',
        'Citroen CX Serie II', 'Citroen CX Serie I']

    const leather_images_srcs = ['cuire_naturelle.webp', 'cuir_tabac.webp', 'cuire_noire.webp', 'naturelle_foncee.webp', 'prestige_beige.webp',
        'sample.jpg', 'sample.jpg', 'sample.jpg', 'sample.jpg']
    const cuire_naturelle_images =
        ['/img/interior/cuire_naturelle/cuire_naturelle8.webp', '/img/interior/cuire_naturelle/cuire_naturelle10.webp', '/img/interior/cuire_naturelle/cuire_naturelle11.webp', '/img/interior/cuire_naturelle/cuire_naturelle14.webp',
            '/img/interior/cuire_naturelle/cuire_naturelle13.webp', '/img/interior/cuire_naturelle/cuire_naturelle5.webp', '/img/interior/cuire_naturelle/cuire_naturelle6.webp', '/img/interior/cuire_naturelle/cuire_naturelle15.webp'];

    const cuire_tabac_images =
        ['/img/interior/cuir_tabac/cuir_tabac1.webp', '/img/interior/cuir_tabac/cuir_tabac3.webp', '/img/interior/cuir_tabac/cuir_tabac6.webp', '/img/interior/cuir_tabac/cuir_tabac7.webp',
            '/img/interior/cuir_tabac/cuir_tabac8.webp', '/img/interior/cuir_tabac/cuir_tabac9.webp', '/img/interior/cuir_tabac/cuir_tabac10.webp', '/img/interior/cuir_tabac/cuir_tabac12.webp'];

    const cuire_noire_images =
        ['/img/interior/cuire_noire/cuire_noire10.webp', '/img/interior/cuire_noire/cuire_noire11.webp', '/img/interior/cuire_noire/cuire_noire14.webp', '/img/interior/cuire_noire/cuire_noire15.webp',
            '/img/interior/cuire_noire/cuire_noire17.webp', '/img/interior/cuire_noire/cuire_noire18.webp', '/img/interior/cuire_noire/cuire_noire19.webp', '/img/interior/cuire_noire/cuire_noire20.webp'];

    const naturelle_fonce_images =
        ['/img/interior/naturelle_foncee/naturelle_foncee2.webp', '/img/interior/naturelle_foncee/naturelle_foncee6.webp', '/img/interior/naturelle_foncee/naturelle_foncee7.webp', '/img/interior/naturelle_foncee/naturelle_foncee8.webp',
            '/img/interior/naturelle_foncee/naturelle_foncee11.webp', '/img/interior/naturelle_foncee/naturelle_foncee12.webp', '/img/interior/naturelle_foncee/naturelle_foncee13.webp', '/img/interior/naturelle_foncee/naturelle_foncee14.webp'];

    const prestige_beige_images =
        ['/img/interior/prestige_beige/prestige_beige1.webp', '/img/interior/prestige_beige/prestige_beige2.webp', '/img/interior/prestige_beige/prestige_beige3.webp', '/img/interior/prestige_beige/prestige_beige4.webp',
            '/img/interior/prestige_beige/prestige_beige5.webp', '/img/interior/prestige_beige/prestige_beige6.webp', '/img/interior/prestige_beige/prestige_beige7.webp', '/img/interior/prestige_beige/prestige_beige8.webp'];

    const beige_claire_images = ['/img/interior/sample.jpg', '/img/interior/sample.jpg', '/img/interior/sample.jpg', '/img/interior/sample.jpg',
        '/img/interior/sample.jpg', '/img/interior/sample.jpg', '/img/interior/sample.jpg', '/img/interior/sample.jpg'];

    const rouge_images = ['/img/interior/sample.jpg', '/img/interior/sample.jpg', '/img/interior/sample.jpg', '/img/interior/sample.jpg',
        '/img/interior/sample.jpg', '/img/interior/sample.jpg', '/img/interior/sample.jpg', '/img/interior/sample.jpg'];

    const cassis_images = ['/img/interior/sample.jpg', '/img/interior/sample.jpg', '/img/interior/sample.jpg', '/img/interior/sample.jpg',
        '/img/interior/sample.jpg', '/img/interior/sample.jpg', '/img/interior/sample.jpg', '/img/interior/sample.jpg'];

    const cuire_noire = ['/img/interior/sample.jpg', '/img/interior/sample.jpg', '/img/interior/sample.jpg', '/img/interior/sample.jpg',
        '/img/interior/sample.jpg', '/img/interior/sample.jpg', '/img/interior/sample.jpg', '/img/interior/sample.jpg'];

    const leather_images = [cuire_naturelle_images, cuire_tabac_images, cuire_noire_images,
        naturelle_fonce_images, prestige_beige_images, beige_claire_images, rouge_images, cassis_images, cuire_noire];

    const toggleModal = () => {
        if (!isMobile) {
            setShowModal(!showModal);
        }

        if (showModal) {
            setUseTimer(true);
        } else {
            setUseTimer(false);
        }
    }

    const onChangeThumbnail = (e) => {
        setLeatherName(leatherNames[e])
        setLeatherDesc(leatherDescriptions[e])
        setLeatherYear(leatherYears[e])
        setLeatherCar(leatherCars[e]);
        setSelectedIndex(e);
        !isManualSlide ? setUseTimer(true) : setUseTimer(false);
        setShowLoader(true);

        setTimeout(() => {
            setShowLoader(false);
        }, 200);
    }


    const executeScroll = () => {
        scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        setUseTimer(false);
    }

    const onNextImage = () => {
        setSelectedImage(selectedIndex + 1)
        setIsManualSlide(true);
    }

    const onPreviousImage = () => {
        setSelectedImage(selectedIndex - 1)
        setIsManualSlide(true);
    }


    const handleScroll = () => {
        const { offsetTop } = scrollRef.current
        const position = window.pageYOffset;

        if (position >= (offsetTop - (offsetTop * 0.4))) {
            setUseTimer(false);
            setShowSlideButtons(true);
        } else {
            setUseTimer(true);
            setShowSlideButtons(false);
        }
    };

    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = '15px';
        }
        return () => {
            document.body.style.overflow = 'unset';
            document.body.style.paddingRight = '0px';
        };
    }, [showModal]);


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
                <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
                    <div
                        className="absolute w-full h-full bg-center bg-cover"
                        style={{
                            backgroundImage:
                                "url('/img/interior/sewing2.webp')",
                        }}
                    >
                        <span
                            id="blackOverlay"
                            className="w-full h-full absolute opacity-75 bg-black"
                        ></span>
                    </div>
                    <div className="container relative mx-auto">
                        <div className="items-center flex flex-wrap">
                            <div className="w-full lg:w-6/12 mt-5 md:mt-20 md:px-4 ml-auto mr-auto text-center">
                                <div className='h-60 md:h-48 md:py-0 pt-10'>
                                    <h1 className="text-white font-semibold text-5xl">
                                        {leatherName}
                                    </h1>
                                    <small className='text-white'>{leatherYear} </small>
                                    <br></br>
                                    <small className='text-white'>{leatherCar} </small>
                                    <p className="mt-4 text-lg text-blueGray-200 px-1">
                                        {leatherDesc}
                                    </p>
                                </div>
                                <div ref={carouselRef} className='pt-14 px-3'>
                                    <Carousel
                                        interval={5000}
                                        showStatus={false}
                                        onChange={onChangeThumbnail}
                                        autoPlay={useTimer}
                                        infiniteLoop={true}
                                        onClickItem={executeScroll}
                                        selectedItem={selectedImage}
                                        className='md:cursor-pointer '>
                                        {leather_images_srcs.map((image, index) => {
                                            return <div className='h-48 duration-500'>
                                                <img 
                                                src={prefix + image} 
                                                placeholder='blur'
                                                blurDataURL='/img/blur.png'
                                                 />
                                            </div>
                                        })}
                                    </Carousel>
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
                    <div className="container mx-auto px-4 w-2/4">

                    </div>
                </section>

                <section id='third-section' ref={scrollRef} className="pb-5 relative block bg-blueGray-200">
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
                                className="text-blueGray-200 fill-current"
                                points="2560 0 2560 100 0 100"
                            ></polygon>
                        </svg>
                    </div>



                    <div className="container mx-auto px-4 lg:pt-23 lg:pb-14">
                        <div className="container mx-auto ">
                            <div className='text-center'>
                                {showLoader &&
                                    <LinearProgress color="inherit" />
                                }
                            </div>
                            <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto md:text-center mb-5">
                                <div>
                                    <h1 className="font-semibold text-3xl invisible">
                                        Gallery
                                    </h1>
                                </div>
                            </div>

                            <div class="container mx-auto space-y-2 lg:space-y-0 lg:gap-2 lg:grid lg:grid-cols-4">
                                {
                                    leather_images[selectedIndex].map((image, index) => {
                                        return <div class={` w-full rounded md:hover:opacity-50 md:cursor-pointer`}>
                                            {showLoader ?
                                                <div role="status" class="space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center">
                                                    <div class="flex justify-center items-center w-full h-60 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
                                                        <svg class="w-12 h-12 text-gray-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" /></svg>
                                                    </div>

                                                    <span class="sr-only">Loading...</span>
                                                </div>
                                                :
                                                <Image className='duration-500' src={image}
                                                    width={500}
                                                    height={400}
                                                    placeholder='blur'
                                                    blurDataURL='/img/blur.png'
                                                    alt='Citroen leather image' 
                                                    onClick={() => { toggleModal(); setGalleryImageSelectedIndex(index) }}>
                                                </Image>
                                            }

                                        </div>
                                    })
                                }
                            </div>

                            {
                    !isMobile && showlideButtons && !showModal &&
                    <div className=''>
                        <button onClick={onPreviousImage} className='float-left left-0 absolute ml-10' style={{ top: '50%', transform: 'translateY(-50%)'}}>
                            <div class="arrow_left -rotate-90"  >
                                <span style={{ animation: 'pulse 3s infinite !important' }} ></span>
                            </div>
                        </button>


                        <button onClick={onNextImage} className='float-right mr-10 absolute right-0' style={{ top: '50%', transform: 'translateY(-50%)'}}>
                            <div class="arrow_right rotate-90"  >
                                <span style={{ animation: 'pulse 3s infinite !important' }} ></span>
                            </div>
                        </button>
                    </div>
                }

                        </div>
                        {!isMobile &&
                            <ImagePreview
                                showModal={showModal}
                                setShowModal={setShowModal}
                                toggleModal={toggleModal}
                                imagesList={leather_images[selectedIndex]}
                                selectedIndex={galleryImageSelectedIndex}
                                setSelectedIndex={setGalleryImageSelectedIndex}
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
        ...await serverSideTranslations(locale, ['common', 'index', 'footer', 'leatherPage']),
    },
})