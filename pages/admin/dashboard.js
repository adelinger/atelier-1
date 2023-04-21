import React from "react";
import { withProtected } from "auth/hook/route";

import Admin from "layouts/Admin.js";

import CarsOverview from "components/Cars/CarsOverview";

function Dashboard({ auth, pathname }) {
  const { logout, user, error } = auth;
  return (
    <Admin auth={auth}>
      <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CarsOverview  auth={auth} />
        </div>
      </div>
    </>
    </Admin>

    
   
  );
}



export default withProtected(Dashboard);
