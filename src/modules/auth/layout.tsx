import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "./hooks";
import { Backdrop, Loading } from "../../components";
import { useEffect } from "react";

export default function AuthLayout() {
	const navigate = useNavigate();
	const { loading, account } = useAuth();

	useEffect(() => {
		if (!loading && account) {
			navigate("/");
		}
	}, [loading, account]);

	return (
		<div className="min-h-screen app-wrapper">
			{loading && (
				<Backdrop className="backdrop-blur-sm">
					<div className="flex flex-col items-center justify-center w-full h-full">
						<Loading />
					</div>
				</Backdrop>
			)}
			<div className="app-main font-landing">
				<div className="app-content">
					<div className="items-center app-content--inner">
						<div className="flex items-center flex-grow w-full">
							<div className="relative z-10 w-full">
								<div className="w-full px-[20px] mx-auto md:max-w-[1140px]">
									<Outlet />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
