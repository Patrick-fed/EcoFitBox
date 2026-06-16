import api from './client';
import type { PedidoResponse, PedidoRequest, CheckoutRequest, AvaliacaoRequest } from '../types';

export const listarPedidos = () =>
  api.get<PedidoResponse[]>('/pedidos').then((r) => r.data);

export const listarPedidosPorUsuario = (usuarioId: number) =>
  api.get<PedidoResponse[]>(`/pedidos/usuario/${usuarioId}`).then((r) => r.data);

export const buscarPedido = (id: number) =>
  api.get<PedidoResponse>(`/pedidos/${id}`).then((r) => r.data);

export const criarPedido = (data: PedidoRequest) =>
  api.post<PedidoResponse>('/pedidos', data).then((r) => r.data);

export const checkout = (data: CheckoutRequest) =>
  api.post<PedidoResponse>('/pedidos/checkout', data).then((r) => r.data);

export const avancarStatus = (id: number) =>
  api.post(`/pedidos/${id}/avancar-status`).then((r) => r.data);

export const confirmarEntrega = (id: number) =>
  api.post(`/pedidos/${id}/confirmar-entrega`).then((r) => r.data);

export const atualizarStatusPedido = (id: number, status: string) =>
  api.patch(`/pedidos/${id}/status`, { status }).then((r) => r.data);

export const avaliarPedido = (id: number, data: AvaliacaoRequest) =>
  api.post(`/pedidos/${id}/avaliar`, data).then((r) => r.data);
