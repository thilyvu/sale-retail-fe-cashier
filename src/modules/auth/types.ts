export enum Gender {
	FEMALE = "female",
	MALE = "male",
}

export enum Role {
	ADMIN = "admin",
	USER = "user",
}

export interface IAccountAttributes {
	id?: string;
	full_name: string;
	email: string;
	phone_number?: string;
	password: string;
	gender: Gender;
	avatar_url?: string;
	address?: string;
	firebase_id: string;
	role_id: string;
}

export interface ISignInFormInput {
	email: string;
	password: string;
}
