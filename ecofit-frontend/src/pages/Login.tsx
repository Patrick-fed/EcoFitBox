import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PresentationCover } from '../components/layout/PresentationCover';
import { LogoSection } from '../components/ui/LogoSection';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../context/useAuth';
import { login, oauthLogin } from '../api/auth';
import { Globe, Mail } from 'lucide-react';
import { signInWithGoogle } from '../services/firebase';

export function Login() {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setError('');
      const { token } = await signInWithGoogle();
      const res = await oauthLogin({ token });
      authLogin(res.token, res.usuario);
      navigate('/dashboard');
    } catch {
      setError('Erro ao entrar com Google');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await login({ email, senha });
      authLogin(res.token, res.usuario);
      navigate('/dashboard');
    } catch {
      setError('Email ou senha inválidos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PresentationCover>
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 w-full max-w-md border border-[#D8D4C5]">
          <div className="mb-6">
            <LogoSection />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu@email.com" required />
            <Input label="Senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="••••••••" required />

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <Button type="submit" variant="primary" className="w-full flex items-center justify-center gap-2" disabled={loading}>
              <Mail className="w-4 h-4" />
              {loading ? 'Entrando...' : 'Entrar com Email'}
            </Button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-[#D8D4C5]" />
            <span className="text-sm text-[#8FA86A] font-medium">ou</span>
            <div className="flex-1 h-px bg-[#D8D4C5]" />
          </div>

          <Button
            variant="secondary"
            className="w-full flex items-center justify-center gap-2"
            onClick={handleGoogleLogin}
          >
            <Globe className="w-4 h-4" />
            Entrar com Google
          </Button>

          <p className="text-center text-sm text-[#5B5B3A] mt-6">
            Não tem conta?{' '}
            <Link to="/register" className="text-[#3C5A1A] font-bold hover:underline">Criar conta</Link>
          </p>
        </div>
      </div>
    </PresentationCover>
  );
}
