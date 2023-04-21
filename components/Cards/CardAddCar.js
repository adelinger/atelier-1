

import ApiService from "auth/service/ApiService";
import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import Alert from "components/Alerts/Alert";
import { uploadeImages } from "lib/apiCalls";
import { useRouter } from 'next/router'
import Image from "next/image";

export default function CardSettings({ auth, carData }) {
    const { user } = auth;
    const { logout } = auth;
    const router = useRouter()

    const [images, setImages] = useState(carData?.listOfImages ?? []);
    const [uploadImages, setUploadImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(carData?.carProfilePhotoPath);
    const [imageKey, setImageKey] = useState(Math.random());

    const [alertMessage, setAlertMessage] = useState('Error. Something went wrong.');

    const [carModel, setCarModel] = useState(carData?.carModel);
    const [carMake, setCarMake] = useState(carData?.carMake);
    const [carYear, setCarYear] = useState(carData?.carYear);
    const [carColor, setCarColor] = useState(carData?.carColor);
    const [carEnginePower, setCarEnginePower] = useState(carData?.carEnginePower);
    const [carEngineType, setCarEngineType] = useState(carData?.carEngineType ?? 'Diesel');
    const [carDescription, setCarDescription] = useState(carData?.carDescription);
    const [carPrice, setCarPrice] = useState(carData?.carPrice);
    const [isSuccess, setIsSuccess] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [showloader, setShowLoader] = useState(false);
    const [carKilometers, setCarkilometers] = useState(carData?.carKilometers);
    const [carStatus, setCarStatus] = useState(carData?.atelierCarStatus?.atelierCarStatusID ?? 1)
    const [inquiryChecked, setIsInquiryChecked] = useState();

    const [isUpdate, setIsUpdate] = useState(false);
    let uploadErrorMessage = 'Images are not uploaded';

    useEffect(() => {
        checkAuth();

        if (carData) {
            setImages(carData?.listOfImages)
            setIsUpdate(true)
            carData.carPrice === 0 && setIsInquiryChecked(true);
        } else {
            setIsUpdate(false);
        }

    }, [])

    function onlyNumbers(num) {
        let value = num;
        if (/[^0-9]+/.test(num.value)) {
            value = num.replace(/[^0-9]*/g, "")
        }
        return value;
    }

    const checkAuth = () => {
        api
            .checkAuth()
            .then(data => {
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    logout();
                }
            });
    }

    const carObject = {
        "atelierCarStatus": {
            "atelierCarStatusID": carStatus
        },
        "carModel": carModel,
        "carMake": carMake,
        "carYear": parseInt(carYear),
        "carColor": carColor,
        "carEnginePower": carEnginePower,
        "carEngineType": carEngineType,
        "carDescription": carDescription,
        "carPrice": parseFloat(carPrice),
        "addedByUser": user.email,
        "carProfilePhotoPath": selectedImage ?? '',
        "carPhotosPath": carData?.carPhotosPath ?? '',
        "carKilometers": parseInt(carKilometers),
        "atelierCarID": carData?.atelierCarID ?? 0
    }

    const api = new ApiService();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowLoader(true);
        setShowAlert(false);

        //when adding new car, uploading at least one picture is mandatory
        if (!isUpdate && uploadImages.length === 0) {
            handleApiResponse(false, 'You have to upload at least one picture.');
            return;
        }

        //in cases of update, user deletes all the pictures, uploadImages will be 0. Check total 
        //amount of images for this car, if zero, throw error
        if (images.length === 0) {
            handleApiResponse(false, 'You have to upload at least one picture.');
            return;
        }

        if (uploadImages.length > 0) {
            const upload = await uploadToServer();

            if (!upload) {
                handleApiResponse(false, uploadErrorMessage);
                return;
            }
        }



        if (isUpdate) {
            api
                .updateCar(carObject)
                .then(data => {
                    handleApiResponse(true, 'Changes saved successfuly.');
                })
                .catch((error) => {
                    handleApiResponse(false);
                });
        } else {
            api
                .addNewCar(carObject)
                .then(data => {
                    handleApiResponse(true, 'You added car successfuly.');
                    router.push('/admin/dashboard')
                })
                .catch((error) => {
                    handleApiResponse(false);
                });
        }



    }

    function handleApiResponse(Success, message = 'Something went wrong.') {
        setAlertMessage(message);
        setIsSuccess(Success);
        setShowLoader(false);
        setShowAlert(true);
    }

    const uploadToClient = (event) => {
        if (event.target.files && event.target.files[0]) {
            for (let file of event.target.files) {

                let url = (URL.createObjectURL(file));
                let index = images.findIndex(x => x === url);
                /* eslint-disable no-unused-expressions */
                index === -1 ? images.push(url) : null;

                index = -1;
                if (uploadImages.length > 0) {
                    index = uploadImages.findIndex(x => x.name == file.name);
                }
                /* eslint-disable no-unused-expressions */
                (index === -1 && URL.createObjectURL(file).includes('blob')) ? uploadImages.push(file) : null;
            }
            if (images.length > 1 && uploadImages.length > 1) {
                setSelectedImage(uploadImages[0].name);
            }

            setImageKey(Math.random());
        }
    };

    const uploadToServer = async () => {
        if (uploadImages.length === 0) {
            handleApiResponse(false, 'You have to upload at least one image.')
        }
        const body = new FormData();
        let timestamp = new Date().getTime();
        if (!isUpdate) {
            carObject.carPhotosPath = carMake + "_" + carModel + "_" + timestamp;
        }

        var filesLength = uploadImages.length;
        for (var i = 0; i < filesLength; i++) {
            body.append("uploadedImages", uploadImages[i]);
        }

        body.append("folderName", carObject.carPhotosPath);

        carObject.carProfilePhotoPath = selectedImage;

        try {
            const upload = await uploadeImages(body)

            if (!upload.isUploadSuccessful) {
                uploadErrorMessage = upload.uploadMessage;
                return false;
            }

            return true;

        } catch (error) {

            return false;
        }

    };

    const handleImageOnClick = (event) => {
        event.preventDefault();
    }

    const handleImageDeleteClick = (event) => {
        event.preventDefault();

        if (images.length === 1) {
            handleApiResponse(false, "You can't delete last photo.");
            return;
        }

        if (isUpdate && !images[event.target.value].includes('blob')) {
            setShowLoader(true);
            api
                .deleteFile(carData.carPhotosPath + '/' + images[event.target.value])
                .then(response => handleApiResponse(true, 'Successfully deleted image.'))
                .catch((error) => {
                    handleApiResponse(false);
                });
        }

        setImages(images.filter(item => item !== images[event.target.value]));
        setUploadImages(uploadImages.filter(item => item !== uploadImages[event.target.value]))
        if (selectedImage === uploadImages[event.target.value]) {
            setSelectedImage(uploadImages[0].name);
        }

    }

    const handleSelectedImageClick = (event) => {
        let imageName = event.target.value;

        setSelectedImage(imageName);
    }

    const onCheckboxClicked = () => {
        setIsInquiryChecked(!inquiryChecked);
        setCarPrice(0);
    }

    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                        <h6 className="text-blueGray-700 text-xl font-bold">{isUpdate ? 'Update data' : 'Add new car'}</h6>
                    </div>

                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <form onSubmit={handleSubmit}>
                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                            Car information
                        </h6>

                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Car make
                                    </label>
                                    <input
                                        value={carMake}
                                        type="text"
                                        required
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Type car make here"
                                        onChange={e => setCarMake(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Car Model
                                    </label>
                                    <input
                                        value={carModel}
                                        required
                                        type="text"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Type car model here"
                                        onChange={e => setCarModel(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Car year
                                    </label>
                                    <input
                                        value={carYear}
                                        required
                                        type="number"
                                        min="1800"
                                        max="2050"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Type car year here"
                                        onChange={e => setCarYear(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Car color
                                    </label>
                                    <input
                                        value={carColor}
                                        type="text"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Type car color here"
                                        onChange={e => setCarColor(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Engine power (ps)
                                    </label>
                                    <input
                                        value={carEnginePower}
                                        type="text"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Type car engine power here"
                                        onChange={e => setCarEnginePower(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    >
                                        Engine type
                                    </label>
                                    <select value={carEngineType} onChange={e => setCarEngineType(e.target.value)}
                                        class="form-select appearance-noneblock w-full px-3 py-1.5 text-base font-normal text-gray-700
                                         bg-white bg-clip-padding bg-no-repeat
                                         border border-solid border-gray-300
                                         rounded
                                         transition
                                         ease-in-out
                                         m-0
                                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        aria-label="select-engine-type">
                                        <option value="Diesel">Diesel</option>
                                        <option value="Bensin">Bensin</option>
                                        <option value="Electric">Electric</option>
                                        <option value="Hybrid">Hybrid</option>
                                    </select>
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    >
                                        Price (€)

                                    </label>
                                    <input
                                        value={carPrice}
                                        required
                                        type="number"
                                        min="1"
                                        step="1"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        disabled={inquiryChecked}
                                        onChange={e => setCarPrice(onlyNumbers(e.target.value))}
                                    />
                                    <div class="flex items-center mt-2 pl-4 rounded border border-gray-200 dark:border-gray-700">
                                        <input id="bordered-checkbox-1" checked={inquiryChecked} type="checkbox" value="" name="bordered-checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 
                                        dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={onCheckboxClicked}>

                                        </input>
                                        <label for="bordered-checkbox-1" class="py-4 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">Price on inquiry</label>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    >
                                        Kilometers

                                    </label>
                                    <input
                                        value={carKilometers}
                                        required
                                        type="number"
                                        min="1"
                                        step="1"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Type the kilometers here"

                                        onChange={e => setCarkilometers(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="ml-4">

                            <div>
                                <div>
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="text"
                                    >Car status</label>
                                    <select value={carStatus} onChange={e => setCarStatus(parseInt(e.target.value))}
                                        class="form-select appearance-noneblock w-full px-3 py-1.5 text-base font-normal text-gray-700
                                         bg-white bg-clip-padding bg-no-repeat
                                         border border-solid border-gray-300
                                         rounded
                                         transition
                                         ease-in-out
                                         m-0
                                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        aria-label="select-engine-type">
                                        <option value="1">Available</option>
                                        <option value="2">Sold</option>
                                        <option value="3">Reserved</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="ml-4 mt-5">
                            <div className="container">
                                <div class="grid sm:grid-cols-1 md:grid-cols-5 xl:grid-cols-7 md:gap-5 ">
                                    {images.map((item, key) => {

                                        const mySrc = (isUpdate && !item.includes('blob')) ? process.env.NEXT_PUBLIC_STATIC_FILES_URL + carData.carPhotosPath + '/' + item : item
                                        return <div className="mt-5 mb-5" style={{ width: "200px", height: "200px" }} >
                                            <a href="#" onClick={handleImageOnClick}>
                                                <Image
                                                    loader={() => mySrc} mySrc={(isUpdate && !item.includes('blob')) ? process.env.NEXT_PUBLIC_STATIC_FILES_URL + carData.carPhotosPath + '/' + item : item}
                                                    width={200}
                                                    height={150}
                                                    src={mySrc}
                                                    class="h-48 w-96 mb-1" style={{ width: "100%", height: "85%" }}></Image>
                                            </a>
                                            <div className="w-max">
                                                <button class="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 
                                                rounded shadow hover:shadow-md outline-none 
                                                focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
                                                    onClick={handleImageDeleteClick} value={key}
                                                >
                                                    <i class="fa-solid fa-x"></i> Delete
                                                </button>
                                                {/* Unexplainable disaster.  */}
                                                <button class={`font-bold ${(images[key] === selectedImage || (key >= images.length - uploadImages.length && uploadImages[(uploadImages.length - (images.length - key))]?.name === selectedImage))
                                                    ? 'bg-blueGray-800 text-white black active:bg-blueGray-800' : 'bg-blueGray-200 text-gray black active:bg-blueGray-800'}  uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`} type="button"
                                                    value={images[key].includes('blob') ? uploadImages[uploadImages.length - (images.length - key)]?.name : images[key]} key={imageKey} onClick={handleSelectedImageClick}

                                                >
                                                    <i class="fa-solid fa-x"></i> Set as main
                                                </button>
                                            </div>
                                        </div>
                                    }
                                    )}

                                </div>

                            </div>

                            <div>
                                <div>
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="text"
                                    >Add pictures for car</label>
                                    <input name="myImage" id="imageInput" onChange={uploadToClient}
                                        class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border
                                         border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none 
                                         dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                        type="file" multiple {...isUpdate ? '' : 'required'} ></input>
                                </div>
                            </div>
                        </div>

                        <hr className="mt-6 border-b-1 border-blueGray-300" />

                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                            Description
                        </h6>
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-12/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Car description
                                    </label>
                                    <textarea
                                        value={carDescription}
                                        required
                                        type="text"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        rows="4"
                                        placeholder="Enter the car description here."
                                        onChange={e => setCarDescription(e.target.value)}
                                    ></textarea>
                                </div>
                            </div>
                        </div>


                        <div class="flex justify-between mt-5">
                            <div class="flex px-2"></div>
                            <div class="flex px-2 ">
                                <button
                                    className="content-between bg-lightBlue-500 active:bg-lightBlue-700 hover:shadow-lg text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                    type="submit    "
                                >
                                    {isUpdate ? 'Save changes' : 'Add new car'}
                                </button></div>
                            <div class="flex px-2 "></div>

                        </div>
                        {showloader &&
                            <div className=" mx-auto max-w-sm text-center relative mt-5">
                                <CircularProgress />

                            </div>
                        }
                        {showAlert &&
                            <div className="mt-5">
                                <Alert color={isSuccess ? 'emerald' : 'red'} message={alertMessage}></Alert>
                            </div>

                        }
                    </form>
                </div>
            </div>
        </>
    );
}
