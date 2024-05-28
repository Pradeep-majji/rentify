import React from "react";
import { Outlet, Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthProvider";
import { useAuthBuyer } from "../context/AuthProviderBuyer";

const ProtectedRoute = () => {
	const { isAuth } = useAuth();

	if (!isAuth) {
		return <Navigate to="/login" />;
	}
	return <Outlet />;
};
const ProtectedRouteBuyer = () => {
	const { isAuthBuyer } = useAuthBuyer();

	if (!isAuthBuyer) {
		return <Navigate to="/login" />;
	}
	return <Outlet />;
};


export {ProtectedRoute,ProtectedRouteBuyer};
