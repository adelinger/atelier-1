import React, { useEffect, useRef, useState } from 'react';

function ImagePreview({ showModal, setShowModal, toggleModal, imagesList, selectedIndex, setSelectedIndex }) {
    const imageTagRef = useRef(null);
    const ref = useRef();
    const [isFirst, setIsFirst] = useState(false);
    const [isLast, setIsLast] = useState(false);


    const onNextImageClick = () => {
        setSelectedIndex(selectedIndex < imagesList.length -1 ? selectedIndex+1 : selectedIndex)
    }

    const onPreviousImageClick = () => {
        setSelectedIndex(selectedIndex > 0 ? selectedIndex-1 : selectedIndex)
    }


    useEffect(() => {
        const handleEsc = (event) => {
            if (event.keyCode === 27)
                setShowModal(false);
        };

        const handleClick = (event) => {
            if (ref) {
                if (event.target.id === 'modal' && event.target.id !== 'modal-img' &&
                    event.target.id !== 'prev-btn-div' && event.target.id !== 'next-btn-div') {
                    setShowModal(false);
                }
            }
        }

        window.addEventListener('keydown', handleEsc);

        document.body.addEventListener('click', handleClick);

        return () => {
            document.body.removeEventListener('click', handleClick);
            window.removeEventListener('keydown', handleEsc);
        };
    }, []);

    return (
        <>
            {showModal &&
                <div id="modal" ref={ref}
                    class="fixed top-0 left-0 w-screen h-screen bg-black/70 flex justify-center items-center">

                    <a class="fixed z-90 top-6 right-8 text-white text-5xl font-bold" href="javascript:void(0)" onClick={toggleModal}
                    >&times;</a>


                    <img id="modal-img" ref={imageTagRef} src={imagesList[selectedIndex]} 
                    class="max-w-[1000px] max-h-[800px] object-cover px-20 py-20" />

                    <div>
                       <div id='prev-btn-div' className={`float-left left-0 h-72 w-72 fixed ${selectedIndex === 0 ? 'hidden' : ''} `}  style={{ top: '35%', bottom: '50%' }}>
                            <button onClick={onPreviousImageClick} className={`float-left left-0 fixed ml-20 ${selectedIndex === 0 ? 'hidden' : ''} `}  style={{ top: '50%', bottom: '50%' }}>
                                <div class="arrow_left_gallery rotate-45 "  >
                                    <span style={{ animation: 'animate-none' }} ></span>
                                </div>
                            </button>
                       </div>

                       <div id='next-btn-div' className={`float-right h-72 w-72 fixed right-0 ${selectedIndex < imagesList.length -1 ? '' : 'hidden' }`}  style={{ top: '35%', bottom: '50%' }}>
                            <button onClick={onNextImageClick} className={`float-right mr-20 fixed right-0 ${selectedIndex < imagesList.length -1 ? '' : 'hidden' }`}
                             style={{ top: '50%', bottom: '50%' }}>
                                <div class="arrow_right_gallery rotate-[-140deg] "  >
                                    <span style={{ animation: 'animate-none' }} ></span>
                                </div>
                            </button>
                       </div>
                    </div>
                </div>
            }

        </>);
}

export default ImagePreview;