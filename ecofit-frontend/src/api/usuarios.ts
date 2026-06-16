import api from './client';
import type { Usuario } from '../types';

export const listarUsuarios = () =>
  api.get<Usuario[]>('/usuarios').then((r) => r.data);

export const atualizarTipoUsuario = (id: number, tipo: string) =>
  api.patch(`/usuarios/${id}/tipo`, { tipo }).then((r) => r.data);
