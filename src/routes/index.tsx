import { createBrowserRouter, Navigate } from "react-router-dom";
import { SignIn } from "../modules/auth/pages";
import AuthLayout from "../modules/auth/layout";
import { Cashier } from "../modules/cashier/pages";
import { Orders } from "../modules/cashier/components";

const router = createBrowserRouter([
	{
		path: "/",
		children: [
			{ index: true, element: <Navigate to={"cashier"} /> },
			{
				path: "cashier",
				element: <Cashier />,
				children: [{ path: "orders", element: <Orders /> }],
			},
		],
	},
	{
		path: "/auth",
		element: <AuthLayout />,
		children: [{ path: "sign-in", element: <SignIn /> }],
	},
	{
		path: "*",
		element: <Navigate to="/" />,
	},
]);

export default router;
