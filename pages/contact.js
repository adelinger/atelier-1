import Footer from "components/Footers/Footer";
import Navbar from "components/Navbars/IndexNavbar";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";

function Contact() {
  const { t } = useTranslation (['footer', 'common', 'contact']);
  const [showLoadImage, setShowLoadImage] = useState(true);
  const [screenshotSrc, setSchreenshotSrc] = useState('/img/contact/gmap_screenshot.webp');

  useEffect(() => {
    setTimeout(() => {
      setShowLoadImage(false);
  }, 400);
}, []);

useEffect(() => {
 isMobile ? setSchreenshotSrc('/img/contact/gmap_screenshot_mobile.webp') 
 : setSchreenshotSrc('/img/contact/gmap_screenshot.webp');
}, [isMobile]);

  return (
    <>
      <Navbar transparent></Navbar>
      <main>
        <div className="relative pt-16 pb-0 md:pb-16 flex content-center items-center justify-center min-h-screen-75">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('/img/light-grey-19.webp')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div className="container relative mx-auto ">
            <div className="container mx-auto py-10 md:py-24">
              <div className="items-center flex flex-wrap ">
                <div className="w-full md:w-6/12 mr-auto px-4 order-2 mt-5 md:mt-0 ">
                <div  className={`${showLoadImage ? 'visibile' : 'hidden'}`}>
                  <Image
                      width={610}
                      height={!isMobile ? '350px' : '596px'}
                      className='transform duration-500'
                      loading='lazy'  
                      placeholder='blur'
                      blurDataURL='/img/blur.png'
                      src={screenshotSrc}
                     style={{height:'350px'}}
                      ></Image>
                </div>
                <div className={`${!showLoadImage ? 'visible' : 'hidden'}`}>
                    <iframe className="w-full " 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2747.043428777947!2d11.349270715443705!3d46.4874524791264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47829d237ca09b07%3A0x27e4b5c51d4a05e3!2sAtelier%20Ds!5e0!3m2!1shr!2shr!4v1658485833256!5m2!1shr!2shr" 
                     width="600"
                     height="350" 
                     allowfullscreen="" 
                     loading="eager"
                     referrerpolicy="no-referrer-when-downgrade">
                     </iframe>
                 </div>
                </div>
                <div className="w-full px-3 mt-5 order-1 md:w-5/12 ml-auto md:-mt-10" >
                  <h1 className="text-white text-3x1" style={{ fontSize: 30 }}>Atelier DS</h1>
                  <div className="md:pr-12">
                    <ul className="list-none mt-2">
                      <li className="py-2 mt-2">
                        <div className="flex items-center">
                          <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-blueGray-100 mr-3">
                              <i class="fas fa-map-marker-alt"></i>
                            </span>
                          </div>
                          <div>
                            <h4 className="text-white">
                              <a target="_blank" className="hover:underline" and rel="noopener noreferrer" href="https://goo.gl/maps/X7fC51eWrJwaedux5">Via Aurelio Nicolodi, 28/65, 39100,
                                Bolzano BZ, Italy
                              </a>
                            </h4>
                          </div>
                        </div>
                      </li>
                      <li className="py-2 mt-2">
                        <div className="flex items-center">
                          <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-100 mr-3 ">
                              <i class="fas fa-phone"></i>
                            </span>
                          </div>
                          <div>
                            <h4 className="text-white">
                              <a className="hover:underline" href="tel:(39) 3472408435">+39 347 240 8435</a>
                            </h4>
                          </div>
                        </div>
                      </li>
                      <li className="py-2 mt-2">
                        <div className="flex items-center">
                          <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-100 mr-3">
                              <i class="fa fa-envelope"></i>
                            </span>
                          </div>
                          <div>
                            <h4 className="text-white">
                              <a className="hover:underline" href="mailto:info@atelierds.net"> info@atelierds.net</a>
                            </h4>
                          </div>

                        </div>
                      </li>
                      <li className="py-2 mt-2">
                        <div className="flex items-center">
                          <p className="text-white">{t('contact:contact_text')}</p>
                        </div>
                      </li>
                      <li className="py-2 md:mt-2">
                        <div className="flex items-center">
                          <div class="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
                            <a href="https://www.facebook.com/Atelier-DS-2049109098648782/" target="_blank" class="text-white hover:text-gray-500 dark:hover:text-white">
                              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd"></path></svg>
                            </a>
                            <a href="#" class="text-white hover:text-gray-500">
                              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd"></path></svg>
                            </a>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer></Footer>
    </>
  );
}

export default Contact;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'footer', 'contact']),
  },
})