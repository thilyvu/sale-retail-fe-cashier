import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import Icons from "~/assets/icons";
import images from "~/assets/images";
import { Backdrop, Button, Checkbox, FormInput, Loading } from "~/components";
import routers from "~/routes/routers";
import { ISignInFormInput } from "../../../types/account";
import { useAuth } from "../hooks";

function SignInPage() {
	const navigate = useNavigate();
	const { loading, signInWithEmailPassword } = useAuth();
	const {
		control,
		formState: { errors },
		handleSubmit,
	} = useForm<ISignInFormInput>({
		resolver: yupResolver(
			Yup.object({
				email: Yup.string()
					.email("Email không hợp lệ")
					.required("Thông tin bắt buộc"),
				password: Yup.string().required("Thông tin bắt buộc"),
			})
		),
		mode: "onSubmit",
	});
	const [showPass, setShowPass] = useState(false);

	const onSubmit = handleSubmit(async (value) => {
		try {
			await signInWithEmailPassword(value);
			navigate(routers.root);
		} catch (error) {
			toast.error(error as string);
		}
	});

	return (
		<div className="flex items-center">
			<div className="items-center flex-grow-0 flex-shrink-0 hidden px-3 md:flex w-[50%]">
				<img
					src={images.farmer}
					alt="..."
					className="block object-cover w-full h-full mx-auto"
				/>
			</div>
			<div className="flex-1 md:max-w-[50%]">
				<div className="px-5 mx-auto">
					<form onSubmit={onSubmit}>
						<FormInput
							control={control}
							title="Địa chỉ Email"
							name="email"
							placeholder="Email"
							required
							type="text"
							icon={<Icons.User />}
							error={errors.email?.message}
						/>
						<FormInput
							control={control}
							title="Mật khẩu"
							name="password"
							placeholder="Mật khẩu"
							required
							type={showPass ? "text" : "password"}
							icon={<Icons.Key />}
							error={errors.password?.message}
						/>
						<div className="mb-4">
							<Checkbox
								label="Hiện thị mật khẩu"
								name="show_pass"
								value={showPass}
								onClick={() => setShowPass(!showPass)}
							/>
						</div>
						<div className="text-left">
							<Button
								type="submit"
								className="w-full px-5 py-2 uppercase rounded-lg text-white bg-primary hover:bg-opacity-85"
							>
								Đăng nhập
							</Button>
						</div>
					</form>
				</div>
			</div>
			{loading && (
				<Backdrop>
					<div className="flex flex-col items-center justify-center w-full h-full">
						<Loading />
					</div>
				</Backdrop>
			)}
		</div>
	);
}

export default SignInPage;
