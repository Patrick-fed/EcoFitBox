import api from './client';
import type { ItemResponse, ItemRequest } from '../types';

export const listarItens = () =>
  api.get<ItemResponse[]>('/itens').then((r) => r.data);

export const criarItem = (data: ItemRequest) =>
  api.post<ItemResponse>('/itens', data).then((r) => r.data);

export const atualizarItem = (id: number, data: ItemRequest) =>
  api.put<ItemResponse>(`/itens/${id}`, data).then((r) => r.data);

export const deletarItem = (id: number) =>
  api.delete(`/itens/${id}`).then((r) => r.data);
