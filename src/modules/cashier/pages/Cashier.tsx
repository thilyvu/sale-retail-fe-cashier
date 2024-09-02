import { Layout } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Backdrop, Loading } from "~/components";
import { useAuth } from "~/modules/auth/hooks";
import { CashierHeader } from "../components";
import CashierContent from "../components/CashierContent";
import router from "../../../routes/routers";

export default function Cashier() {
	const navigate = useNavigate();
	const { loading, account } = useAuth();

	useEffect(() => {
		if (!loading && !account) {
			navigate(router.auth.signIn);
		}
	}, [loading, account]);

	return (
		<Layout>
			{loading && (
				<Backdrop className="backdrop-blur-sm">
					<div className="flex flex-col items-center justify-center w-full h-full">
						<Loading />
					</div>
				</Backdrop>
			)}
			<CashierHeader />
			<CashierContent />
		</Layout>
	);
}
