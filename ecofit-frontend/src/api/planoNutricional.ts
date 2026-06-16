import api from './client';
import type { PlanoNutricionalRequest } from '../types';

export const buscarPlanoNutricional = (usuarioId: number) =>
  api.get(`/planos-nutricionais/usuario/${usuarioId}`).then((r) => r.data);

export const criarPlanoNutricional = (data: PlanoNutricionalRequest) =>
  api.post('/planos-nutricionais', data).then((r) => r.data);
