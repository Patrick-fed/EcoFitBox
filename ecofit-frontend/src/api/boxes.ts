import api from './client';
import type { BoxResponse, BoxMaisPedidaResponse, BoxRequest } from '../types';

export const listarBoxes = (tipo?: string, refeicao?: string) =>
  api.get<BoxResponse[]>('/boxes', { params: { tipo, refeicao } }).then((r) => r.data);

export const listarBoxesMaisPedidas = () =>
  api.get<BoxMaisPedidaResponse[]>('/boxes/mais-pedidas').then((r) => r.data);

export const buscarBox = (id: number) =>
  api.get<BoxResponse>(`/boxes/${id}`).then((r) => r.data);

export const criarBox = (data: BoxRequest) =>
  api.post<BoxResponse>('/boxes', data).then((r) => r.data);

export const adicionarItem = (boxId: number, itemId: number, quantidade: number) =>
  api.post(`/boxes/${boxId}/itens`, { itemId, quantidade }).then((r) => r.data);

export const removerItem = (boxId: number, itemId: number) =>
  api.delete(`/boxes/${boxId}/itens/${itemId}`).then((r) => r.data);
