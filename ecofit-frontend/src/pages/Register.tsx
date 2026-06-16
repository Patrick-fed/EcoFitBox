import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PresentationCover } from '../components/layout/PresentationCover';
import { LogoSection } from '../components/ui/LogoSection';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';
import { register } from '../api/auth';

export function Register() {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [endereco, setEndereco] = useState('');
  const [acompanhamento, setAcompanhamento] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await register({ nome, email, senha, endereco, acompanhamentoNutricional: acompanhamento });
      authLogin(res.token, res.usuario);
      if (acompanhamento) {
        navigate('/plano-nutricional');
      } else {
        navigate('/dashboard');
      }
    } catch {
      setError('Erro ao criar conta. Verifique os dados.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PresentationCover>
      <div className="min-h-screen flex items-center justify-center px-4 py-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 w-full max-w-md border border-[#D8D4C5]">
          <div className="mb-6">
            <LogoSection />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Nome completo" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Seu nome" required />
            <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu@email.com" required />
            <Input label="Senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Mínimo 6 caracteres" required />
            <Input label="Endereço de entrega" value={endereco} onChange={(e) => setEndereco(e.target.value)} placeholder="Rua, número, bairro" required />

            <div className="flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                id="acompanhamento"
                checked={acompanhamento}
                onChange={(e) => setAcompanhamento(e.target.checked)}
                className="w-4 h-4 accent-[#3C5A1A]"
              />
              <label htmlFor="acompanhamento" className="text-sm text-[#5B5B3A]">
                Faço acompanhamento nutricional
              </label>
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <Button type="submit" variant="primary" className="w-full" disabled={loading}>
              {loading ? 'Criando conta...' : 'Criar Conta'}
            </Button>
          </form>

          <p className="text-center text-sm text-[#5B5B3A] mt-6">
            Já tem conta?{' '}
            <Link to="/login" className="text-[#3C5A1A] font-bold hover:underline">Entrar</Link>
          </p>
        </div>
      </div>
    </PresentationCover>
  );
}
