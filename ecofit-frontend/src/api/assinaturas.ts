import api from './client';
import type { AssinaturaPlanoResponse, AssinaturaPlanoRequest } from '../types';

export const buscarAssinaturaAtiva = (usuarioId: number) =>
  api.get<AssinaturaPlanoResponse | null>(`/assinaturas/usuario/${usuarioId}`).then((r) => r.data ?? null);

export const criarAssinatura = (data: AssinaturaPlanoRequest) =>
  api.post<AssinaturaPlanoResponse>('/assinaturas', data).then((r) => r.data);
