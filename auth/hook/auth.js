import { useRouter } from "next/router";
import { createContext, useContext, useState } from "react";
import { useCookies } from "react-cookie";
import { AuthService } from "../service/AuthService";


const authContext = createContext();

export default function useAuth() {
	return useContext(authContext);
}

export function AuthProvider(props) {
	const [user, setUser] = useState(null);
	const [error, setError] = useState();

	const [cookies, setCookie, removeCookie] = useCookies(['auth-token']);

	const router = useRouter();
	const pathname = router.pathname;


	const logout = async () => {
		await AuthService.logout();
		removeCookie('auth-token');
		setUser(null);
	};

	const signInUserWithEmailAndPassword = async (email, password) => {
		if (email && password) {
			const { error, user } = await AuthService.signInUserWithEmailAndPassword(
				email,
				password
			);
			if (error) {
				setError({ [pathname]: error });
				return;
			}
			setUser(user ?? null);
			setCookie("auth-token", user._delegate.accessToken, {
				path: "/"
			  });
			router.push("/admin/dashboard");
		} else {
			setError({ [pathname]: "Email and password can not be empty" });
		}
	};
	const resetPassword = async (email) => {
		if (email) {
			const error = await AuthService.resetPassword(email);
			if (error) {
				setError({ [pathname]: error });
				return;
			}
			router.push(`/verify?email=${email}`);
		} else {
			setError({ [pathname]: "Email can not be empty" });
		}
	};

	const updatePassword = async (confirmPassword, password) => {
		if (confirmPassword === password) {
			const error = await AuthService.updatePassword(password);
			setError({ [pathname]: error });
		} else {
			setError({ [pathname]: "password doesn't match!" });
		}
	};

	const value = {
		user,
		error,
		logout,
		setUser,
		signInUserWithEmailAndPassword,
		resetPassword,
		updatePassword,
	};

	return <authContext.Provider value={value} {...props} />;
}