import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import type { ReactNode } from 'react';
import type { TipoUsuario } from '../../types';

function RoleRoute({ children, roles }: { children: ReactNode; roles: TipoUsuario[] }) {
  const { isAuthenticated, usuario } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!usuario?.tipo || !roles.includes(usuario.tipo)) return <Navigate to="/" replace />;
  return <>{children}</>;
}

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export function AdminRoute({ children }: { children: ReactNode }) {
  return <RoleRoute roles={['ADMIN']}>{children}</RoleRoute>;
}

export function EntregadorRoute({ children }: { children: ReactNode }) {
  return <RoleRoute roles={['ENTREGADOR', 'ADMIN']}>{children}</RoleRoute>;
}
