import { StatusCode } from ".";
export type ProductUnit = {
	id: string;
	name: string;
	sku: string;
	is_standard: boolean;
	price: number;
	multiplier: number;
	product_id: string;
	status: StatusCode;
};
export type ESProductDocument = {
	id: string;
	sku: string;
	product_name: string;
	price: number;
	stock: number;
	capital_price: number;
	unit_id: string;
	unit_name: string;
	unit_standard: boolean;
	unit_multiplier: number;
	keywords: string;
	units: ProductUnit[];
	image: string;
};

export interface CashierCartItem extends ESProductDocument {
	quantity: number;
}
