import { ExceptionResponse } from '@/interfaces';
import { Service } from './service.interface';

export type CreateServiceResponse = Service | ExceptionResponse;
export type GetServiceResponse = Service | ExceptionResponse;
export type GetServicesResponse = Service[] | ExceptionResponse;
export type UpdateServiceResponse = Service | ExceptionResponse;
export type DeleteServiceResponse = Service | ExceptionResponse;
