import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

// components
import CarPreviewDropdown from "components/Dropdowns/CarPreviewDropdown";
import ApiService from "auth/service/ApiService";
import Alert from "components/Alerts/Alert";
import { CircularProgress, Link } from "@mui/material";

export default function CarsTable({ color, auth }) {
  const { logout } = auth;
  const [cars, setCars] = useState()
  const [isSuccess, setIsSuccess] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showloader, setShowLoader] = useState(false);


  function handleApiResponse(Success) {
    window.scrollTo(0, 0)
    setIsSuccess(Success);
    setShowAlert(true);
    setShowLoader(false);
  }


  const api = new ApiService();
  const fetchCars = () => {
    setShowLoader(true);
    api
      .getCars()
      .then(response => response.data)
      .then(data => {
        setCars(data)
        setShowLoader(false);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          logout();
        }
        setShowLoader(false);
      });
  };

  function onChangeStatusClick(id) {
    setShowLoader(true);
    api
      .updateCarStatus(id, 2)
      .then(data => {
        handleApiResponse(true);
        fetchCars();
      })
      .catch((error) => {
        handleApiResponse(false);
      });
  }

  function onDeleteClick(id) {
    setShowLoader(true);
    api
      .deleteCar(id)
      .then(data => {
        handleApiResponse(true);
        fetchCars();
      })
      .catch((error) => {
        handleApiResponse(false);
      });
  }

  useEffect(() => {
    fetchCars();
  }, [])

  function colorDot(car) {

    if (car.atelierCarStatus.atelierCarStatusID === 1) {
      return <i className='fas fa-circle mr-2 text-blue-600'>Available</i>
    }
    if (car.atelierCarStatus.atelierCarStatusID === 3) {
      return <i className='fas fa-circle mr-2 text-orange-500'>Reservered</i>
    }
    if (car.atelierCarStatus.atelierCarStatusID === 2) {
      return <i className='fas fa-circle mr-2 text-gray-500'>Sold</i>
    }

    return <i className='fas fa-circle mr-2 text-blue-600'>Available</i>
  }


  return (

    <>

      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-blueGray-700 text-white")
        }
      >
        {showAlert &&
          <Alert message={'There was an error. Please try again.'} color={isSuccess ? 'emerald' : 'red'}></Alert>
        }



        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                Added Cars overview
              </h3>
              {showloader &&
                <div className=" mx-auto max-w-sm text-center relative">
                  <CircularProgress />

                </div>
              }

            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">

          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Car
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Price
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Status
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Added by user
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Views
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                ></th>
              </tr>
            </thead>
            <tbody>
              {
                !cars ?
                  <div className="text-3xl m-5">
                    <p>Currently there are no added cars.</p>
                  </div>
                  :
                  cars.map(car =>
                    <tr data={car.atelierCarID}>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                        <Link href={`update/${encodeURIComponent(car.atelierCarID)}`}>
                          <img
                            src={process.env.NEXT_PUBLIC_STATIC_FILES_URL + car.carPhotosPath + '/' + car.carProfilePhotoPath}
                            className="h-12 w-12 bg-white rounded-full border"
                            alt="..."
                          ></img>{" "}
                        </Link>

                        <Link href={`update/${encodeURIComponent(car.atelierCarID)}`}>
                          <a className={
                            "ml-3 font-bold " +
                            +(color === "light" ? "text-blueGray-600" : "text-white")
                          }></a>

                          {car.carMake + ' ' + car.carModel}
                        </Link>
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        { car.carPrice === 0 ? 'On inquiry' : car.carPrice +'€'}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {colorDot(car)}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <div className="flex">
                          <i className="fas fa-user text-bluegray-500 mr-2"></i> {car.addedByUser}

                        </div>
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <div className="flex items-center">
                          <i className="fas fa-table text-bluegray-500 mr-2"></i> Not implemented
                        </div>
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                        <CarPreviewDropdown onDeleteClick={onDeleteClick} onStatusUpdate={onChangeStatusClick} carId={car.atelierCarID} carStatus={car.atelierCarStatus.carStatus} />
                      </td>
                    </tr>
                  )
              }

            </tbody>
          </table>
        </div>
      </div>

    </>
  );
}

CarsTable.defaultProps = {
  color: "light",
};

CarsTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
