import { createBrowserRouter, Navigate } from "react-router-dom";
import { SignIn } from "../modules/auth/pages";
import AuthLayout from "../modules/auth/layout";
import { Cashier } from "../modules/cashier/pages";

const router = createBrowserRouter([
	{
		path: "/",
		children: [
			{
				index: true,
				element: <Navigate to={"cashier"} />,
			},
			{
				path: "cashier",
				element: <Cashier />,
			},
		],
	},
	{
		path: "/auth",
		element: <AuthLayout />,
		children: [
			{
				path: "sign-in",
				element: <SignIn />,
			},
		],
	},
]);

export default router;
