import React from "react";
import { createPortal } from "react-dom";

interface BackdropProps {
	children: React.ReactNode;
	theme?: "dark" | "light";
	className?: string;
}

function Backdrop({ children, className, theme = "light" }: BackdropProps) {
	return createPortal(
		<div
			className={`fixed inset-0 z-50 w-full h-full ${
				theme === "dark" ? "bg-black" : "bg-white"
			} bg-opacity-30 ${className}`}
		>
			{children}
		</div>,
		document.querySelector("body") as HTMLElement
	);
}

export default Backdrop;
