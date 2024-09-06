import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import router from "~/routes";
import "react-toastify/dist/ReactToastify.css";

import "./index.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<>
		<RouterProvider router={router} />
		<ToastContainer
			position="top-right"
			autoClose={3000}
			hideProgressBar
			newestOnTop={false}
			closeOnClick
			rtl={false}
			pauseOnFocusLoss={false}
			draggable={false}
			pauseOnHover
			theme="colored"
		/>
	</>
);
