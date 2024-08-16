import { IAccountAttributes } from '~/types/account';
import axiosClient from './AxiosClient';

export const getMe: () => Promise<IAccountAttributes> = async () => await axiosClient.get('/user/me');
