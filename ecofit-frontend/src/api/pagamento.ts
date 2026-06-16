import api from './client';
import type { PagamentoRequest, PagamentoResponse } from '../types';

export const criarPagamento = (data: PagamentoRequest) =>
  api.post<PagamentoResponse>('/pagamento/criar', data).then((r) => r.data);
