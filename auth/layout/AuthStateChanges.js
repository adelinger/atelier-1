import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import React, { useEffect, useState } from "react";
import useAuth from "../hook/auth";
import { init } from "auth/config/firebase.config";
import PageChange from "components/PageChange/PageChange";

export default function AuthStateChanged({ children }) {
	const { setUser } = useAuth();
	const [loading, setLoading] = useState(true);
    
    

	useEffect(() => {
		firebase.auth().onAuthStateChanged((user) => {
			setUser(user);
			setLoading(false);
		});
		
	}, []);

	if (loading) {
		return <PageChange></PageChange>
	}

	return children;
}