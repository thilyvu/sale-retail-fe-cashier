interface ButtonProps {
	children: React.ReactNode;
	onClick?: () => void;
	type?: "button" | "submit" | "reset";
	className?: React.HTMLAttributes<HTMLButtonElement>["className"];
}

function Button({
	children,
	type = "button",
	className,
	onClick,
}: ButtonProps) {
	return (
		<button
			type={type}
			onClick={onClick}
			className={`border-2 border-transparent text-center select-none transition-all duration-[350ms] font-semibold ${className}`}
		>
			{children}
		</button>
	);
}

export default Button;
