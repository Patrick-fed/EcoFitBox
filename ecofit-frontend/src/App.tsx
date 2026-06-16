import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute, AdminRoute, EntregadorRoute } from './components/layout/ProtectedRoute';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { PlanoNutricional } from './pages/PlanoNutricional';
import { Dashboard } from './pages/Dashboard';
import { PersonalizarBox } from './pages/PersonalizarBox';
import { CheckoutPage } from './pages/Checkout';
import { Confirmacao } from './pages/Confirmacao';
import { Historico } from './pages/Historico';
import { Admin } from './pages/Admin';
import { EntregadorPedidos } from './pages/EntregadorPedidos';
import { NotFound } from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/plano-nutricional" element={<ProtectedRoute><PlanoNutricional /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/personalizar" element={<ProtectedRoute><PersonalizarBox /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
          <Route path="/confirmacao/:id" element={<ProtectedRoute><Confirmacao /></ProtectedRoute>} />
          <Route path="/historico" element={<ProtectedRoute><Historico /></ProtectedRoute>} />
          <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
          <Route path="/entregador" element={<EntregadorRoute><EntregadorPedidos /></EntregadorRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
