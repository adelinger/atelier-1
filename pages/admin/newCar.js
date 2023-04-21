import { withProtected } from 'auth/hook/route';
import CardAddCar from 'components/Cards/CardAddCar';
import Admin from 'layouts/Admin';
import React, { Component } from 'react';

function newCar({auth}) {
    return (
        <>
            <Admin>
                <div className="flex flex-wrap">
                    <div className="w-full ">
                        <CardAddCar auth={auth} />
                    </div>
                 
                </div>
            </Admin>
        </>

    );
}

export default withProtected(newCar);