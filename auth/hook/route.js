import PageChange from "components/PageChange/PageChange";
import { useRouter } from "next/router";
import React from "react";
import useAuth from "./auth";

export function withPublic(Component) {
	return function WithPublic(props) {
		const auth = useAuth();
		const router = useRouter();
		const pathname = router.pathname;

		if (auth.user) {
			router.replace("/admin/dashboard");
			return PageChange
		}
		return <Component auth={auth} pathname={pathname} {...props} />;
	};
}

export function withProtected(Component) {
	return function WithProtected(props) {
		const auth = useAuth();
		const router = useRouter();
		const pathname = router.pathname;

		if (!auth.user) {
			router.replace("/admin/login");
			return PageChange
		}
		return <Component auth={auth} pathname={pathname} {...props} />;
	};
}