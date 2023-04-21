import CarsTable from "components/Cards/CarsTable";
import React from "react";


export default function CarsOverview({auth}) {
  return (
    <>
    <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CarsTable auth={auth} />
        </div>
        
      </div>
  
    </>
  );
}

