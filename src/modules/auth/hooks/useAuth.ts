import {
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut as signOutFirebase,
} from "firebase/auth";
import { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getMe } from "~/api";
import { authentication } from "~/libs/firebase";
import routers from "~/routes/routers";
import { useAccountStore } from "../stores/accountStore";
import { ISignInFormInput } from "../types";

export function useAuth() {
	const navigate = useNavigate();
	const { account, setUser } = useAccountStore((state) => state);
	const [loading, setLoading] = useState(true);

	useLayoutEffect(() => {
		setLoading(true);
		const unregisterAuthObserver = onAuthStateChanged(
			authentication,
			async (credential) => {
				if (credential) {
					const idToken = await credential.getIdTokenResult();
					localStorage.setItem("access_token", idToken.token);
					return await getMe()
						.then((res) => setUser(res))
						.catch(() => localStorage.removeItem("access_token"))
						.finally(() => setLoading(false));
				}
				localStorage.removeItem("access_token");
				setLoading(false);
			}
		);

		return () => unregisterAuthObserver();
	}, []);

	const signInWithEmailPassword = async ({
		email,
		password,
	}: ISignInFormInput) => {
		setLoading(true);
		return await signInWithEmailAndPassword(authentication, email, password)
			.then(async ({ user }) => {
				const idToken = await user.getIdTokenResult();
				localStorage.setItem("access_token", idToken.token);
				await getMe()
					.then((res) => setUser(res))
					.catch(async () => {
						await signOutFirebase(authentication);
						localStorage.removeItem("access_token");
						return Promise.reject("Thông tin đăng nhập không chính xác");
					})
					.finally(() => setLoading(false));
			})
			.catch(() => {
				return Promise.reject("Thông tin đăng nhập không chính xác");
			})
			.finally(() => setLoading(false));
	};

	const signOut = () => {
		signOutFirebase(authentication)
			.then(() => {
				setUser(null);
				localStorage.removeItem("access_token");
				navigate(routers.auth.signIn);
			})
			.catch((error) => {
				toast.error(error.message, { toastId: "firebase_sign_out" });
			});
	};

	return {
		account,
		loading,
		signInWithEmailPassword,
		signOut,
	};
}
