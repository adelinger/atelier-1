import Admin from "layouts/Admin";
import CardAddCar from 'components/Cards/CardAddCar';
import { getSingleCar, loadCars } from "lib/apiCalls";
import { withProtected } from 'auth/hook/route';
import { useRouter } from "next/router";
import ApiService from "auth/service/ApiService";
import { useEffect } from "react";

function UpdateCar({carData, auth}) {
  const {logout} = auth;

    const api = new ApiService();

    useEffect(() => {
      checkAuth();
    }, [])

     const checkAuth = () => {
       api
         .checkAuth()
         .then(data => {     
         })
         .catch((error) => {
           if(error.response.status === 401){
             logout();
           }
         });
      }

    return ( 
        <Admin>
        <div className="flex flex-wrap">
            <div className="w-full ">
                <CardAddCar auth={auth} carData={carData} />
            </div>
         
        </div>
    </Admin>
     );
}

export default withProtected(UpdateCar);


export async function getStaticProps({ params }) {
    const carData = await getSingleCar(params.updateCar);

    return {
      props: {
        carData
      },
    };
  }

  export async function getStaticPaths() {
    const cars = await loadCars('', 'newest');
    const paths = cars.map(car => ({
      params: { updateCar: car.atelierCarID.toString() }
    })
    );
  
    return {
      paths,
      fallback: true,
    }
  }


