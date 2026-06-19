import { useEffect, useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { listarItens, criarItem, atualizarItem, deletarItem } from '../api/itens';
import { listarBoxes, criarBox } from '../api/boxes';
import { listarUsuarios, atualizarTipoUsuario } from '../api/usuarios';
import type { ItemResponse, ItemRequest, BoxResponse, Usuario } from '../types';
import { Plus, Pencil, Trash2, X, Check, Package, AlertCircle, Users, Box } from 'lucide-react';

type Tab = 'itens' | 'usuarios' | 'boxes';

export function Admin() {
  const [tab, setTab] = useState<Tab>('itens');

  return (
    <div className="min-h-screen bg-[#EDE7DF]">
      <Navbar />
      <div className="pt-20 px-6 pb-10 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-[#3C5A1A] mb-6">Administração</h1>

        <div className="flex gap-2 mb-6">
          <button onClick={() => setTab('itens')} className={`px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer ${tab === 'itens' ? 'bg-[#3C5A1A] text-white' : 'bg-[#D8D4C5] text-[#3C5A1A]'}`}>Itens</button>
          <button onClick={() => setTab('usuarios')} className={`px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer ${tab === 'usuarios' ? 'bg-[#3C5A1A] text-white' : 'bg-[#D8D4C5] text-[#3C5A1A]'}`}>Usuários</button>
          <button onClick={() => setTab('boxes')} className={`px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer ${tab === 'boxes' ? 'bg-[#3C5A1A] text-white' : 'bg-[#D8D4C5] text-[#3C5A1A]'}`}>Boxes</button>
        </div>

        {tab === 'itens' && <ItensTab />}
        {tab === 'usuarios' && <UsuariosTab />}
        {tab === 'boxes' && <BoxesTab />}
      </div>
    </div>
  );
}

function ItensTab() {
  const [itens, setItens] = useState<ItemResponse[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [itemNome, setItemNome] = useState('');
  const [itemDescricao, setItemDescricao] = useState('');
  const [itemCusto, setItemCusto] = useState('');
  const [itemValor, setItemValor] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const carregarItens = async () => {
    try { setItens(await listarItens()); }
    catch { setError('Erro ao carregar itens'); }
  };

  useEffect(() => { carregarItens(); }, []); // eslint-disable-line react-hooks/set-state-in-effect

  const resetForm = () => {
    setItemNome(''); setItemDescricao(''); setItemCusto(''); setItemValor('');
    setEditId(null); setShowForm(false); setError('');
  };

  const openEdit = (item: ItemResponse) => {
    setItemNome(item.itemNome); setItemDescricao(item.itemDescricao || '');
    setItemCusto(item.itemCusto.toString()); setItemValor(item.itemValor.toString());
    setEditId(item.id); setShowForm(true); setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemNome || !itemCusto || !itemValor) { setError('Preencha todos os campos obrigatórios'); return; }
    setLoading(true); setError('');
    try {
      const payload: ItemRequest = { itemNome, itemDescricao, itemCusto: parseFloat(itemCusto), itemValor: parseFloat(itemValor) };
      if (editId) { await atualizarItem(editId, payload); } else { await criarItem(payload); }
      resetForm(); await carregarItens();
    } catch { setError(editId ? 'Erro ao atualizar item' : 'Erro ao criar item'); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja remover este item?')) return;
    try { await deletarItem(id); await carregarItens(); }
    catch { setError('Erro ao deletar item'); }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-[#3C5A1A] flex items-center gap-2"><Package className="w-5 h-5" />Itens</h2>
          <p className="text-sm text-[#5B5B3A] mt-1">Gerencie o catálogo de itens</p>
        </div>
        {!showForm && <Button variant="primary" onClick={() => { resetForm(); setShowForm(true); }} className="flex items-center gap-2"><Plus className="w-4 h-4" />Novo Item</Button>}
      </div>

      {error && <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm"><AlertCircle className="w-4 h-4 shrink-0" />{error}</div>}

      {showForm && (
        <Card className="mb-6 border-[#A3B27A]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-[#3C5A1A]">{editId ? 'Editar Item' : 'Novo Item'}</h2>
            <button onClick={resetForm} className="p-1 hover:bg-[#D8D4C5] rounded-full cursor-pointer"><X className="w-5 h-5 text-[#5B5B3A]" /></button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Nome do item" value={itemNome} onChange={(e) => setItemNome(e.target.value)} placeholder="Ex: Frango Grelhado" required />
              <Input label="Descrição" value={itemDescricao} onChange={(e) => setItemDescricao(e.target.value)} placeholder="Descrição opcional" />
              <Input label="Custo (R$)" type="number" step="0.01" value={itemCusto} onChange={(e) => setItemCusto(e.target.value)} placeholder="10.00" required />
              <Input label="Preço de venda (R$)" type="number" step="0.01" value={itemValor} onChange={(e) => setItemValor(e.target.value)} placeholder="15.00" required />
            </div>
            <div className="flex gap-3 pt-2">
              <Button type="submit" variant="primary" disabled={loading} className="flex items-center gap-2"><Check className="w-4 h-4" />{loading ? 'Salvando...' : editId ? 'Atualizar' : 'Criar'}</Button>
              <Button type="button" variant="outline" onClick={resetForm}>Cancelar</Button>
            </div>
          </form>
        </Card>
      )}

      {/* Desktop table */}
      <div className="hidden md:block bg-white rounded-xl shadow-md border border-[#D8D4C5] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#F5F2EB] text-[#3C5A1A] text-left">
              <th className="px-4 py-3 font-semibold">ID</th>
              <th className="px-4 py-3 font-semibold">Nome</th>
              <th className="px-4 py-3 font-semibold hidden md:table-cell">Descrição</th>
              <th className="px-4 py-3 font-semibold">Custo</th>
              <th className="px-4 py-3 font-semibold">Preço</th>
              <th className="px-4 py-3 font-semibold text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D8D4C5]">
            {itens.map((item) => (
              <tr key={item.id} className="hover:bg-[#FAF8F4] transition-colors">
                <td className="px-4 py-3 text-[#8FA86A] font-mono text-xs">#{item.id}</td>
                <td className="px-4 py-3 font-medium text-[#1a1a2e]">{item.itemNome}</td>
                <td className="px-4 py-3 text-[#5B5B3A] hidden md:table-cell max-w-xs truncate">{item.itemDescricao || '-'}</td>
                <td className="px-4 py-3 text-[#5B5B3A]">R$ {item.itemCusto.toFixed(2)}</td>
                <td className="px-4 py-3 font-bold text-[#3C5A1A]">R$ {item.itemValor.toFixed(2)}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => openEdit(item)} className="p-2 text-[#5B7B3A] hover:bg-[#E8F0DA] rounded-lg transition cursor-pointer" title="Editar"><Pencil className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition cursor-pointer" title="Remover"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {itens.length === 0 && <div className="text-center py-12 text-[#8FA86A]"><Package className="w-12 h-12 mx-auto mb-3 opacity-50" /><p>Nenhum item cadastrado</p></div>}
      </div>
      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {itens.length === 0 ? (
          <div className="text-center py-12 text-[#8FA86A]"><Package className="w-12 h-12 mx-auto mb-3 opacity-50" /><p>Nenhum item cadastrado</p></div>
        ) : (
          itens.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-md border border-[#D8D4C5] p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[#8FA86A] font-mono text-xs">#{item.id}</span>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(item)} className="p-2 text-[#5B7B3A] hover:bg-[#E8F0DA] rounded-lg transition cursor-pointer" title="Editar"><Pencil className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition cursor-pointer" title="Remover"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
              <h3 className="font-bold text-[#1a1a2e] text-base">{item.itemNome}</h3>
              <p className="text-sm text-[#5B5B3A] mt-0.5">{item.itemDescricao || '-'}</p>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#D8D4C5]">
                <div>
                  <span className="text-xs text-[#5B5B3A]">Custo</span>
                  <p className="text-sm font-semibold">R$ {item.itemCusto.toFixed(2)}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-[#5B5B3A]">Preço</span>
                  <p className="text-sm font-bold text-[#3C5A1A]">R$ {item.itemValor.toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

function UsuariosTab() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const carregarUsuarios = async () => {
    try { setUsuarios(await listarUsuarios()); }
    catch { setError('Erro ao carregar usuários'); }
  };

  useEffect(() => { carregarUsuarios(); }, []); // eslint-disable-line react-hooks/set-state-in-effect

  const alterarTipo = async (id: number, tipo: string) => {
    setLoading(true);
    try {
      await atualizarTipoUsuario(id, tipo);
      await carregarUsuarios();
    } catch { setError('Erro ao alterar tipo'); }
    finally { setLoading(false); }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-[#3C5A1A] flex items-center gap-2"><Users className="w-5 h-5" />Usuários</h2>
          <p className="text-sm text-[#5B5B3A] mt-1">Gerencie os tipos de conta</p>
        </div>
      </div>

      {error && <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm"><AlertCircle className="w-4 h-4 shrink-0" />{error}</div>}

      {/* Desktop table */}
      <div className="hidden md:block bg-white rounded-xl shadow-md border border-[#D8D4C5] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#F5F2EB] text-[#3C5A1A] text-left">
              <th className="px-4 py-3 font-semibold">ID</th>
              <th className="px-4 py-3 font-semibold">Nome</th>
              <th className="px-4 py-3 font-semibold">Email</th>
              <th className="px-4 py-3 font-semibold">Tipo</th>
              <th className="px-4 py-3 font-semibold">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D8D4C5]">
            {usuarios.map((u) => (
              <tr key={u.id} className="hover:bg-[#FAF8F4] transition-colors">
                <td className="px-4 py-3 text-[#8FA86A] font-mono text-xs">#{u.id}</td>
                <td className="px-4 py-3 font-medium text-[#1a1a2e]">{u.nome}</td>
                <td className="px-4 py-3 text-[#5B5B3A]">{u.email}</td>
                <td className="px-4 py-3">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${u.tipo === 'ADMIN' ? 'bg-purple-100 text-purple-700' : u.tipo === 'ENTREGADOR' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>{u.tipo || 'CLIENTE'}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    {u.tipo !== 'ADMIN' && (
                      <>
                        <button onClick={() => alterarTipo(u.id, 'ENTREGADOR')} disabled={loading} className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 cursor-pointer disabled:opacity-50">Tornar Entregador</button>
                        <button onClick={() => alterarTipo(u.id, 'ADMIN')} disabled={loading} className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200 cursor-pointer disabled:opacity-50">Tornar Admin</button>
                      </>
                    )}
                    {u.tipo === 'ADMIN' && (
                      <button onClick={() => alterarTipo(u.id, 'CLIENTE')} disabled={loading} className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 cursor-pointer disabled:opacity-50">Rebaixar</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {usuarios.length === 0 && <div className="text-center py-12 text-[#8FA86A]"><Users className="w-12 h-12 mx-auto mb-3 opacity-50" /><p>Nenhum usuário encontrado</p></div>}
      </div>
      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {usuarios.length === 0 ? (
          <div className="text-center py-12 text-[#8FA86A]"><Users className="w-12 h-12 mx-auto mb-3 opacity-50" /><p>Nenhum usuário encontrado</p></div>
        ) : (
          usuarios.map((u) => (
            <div key={u.id} className="bg-white rounded-xl shadow-md border border-[#D8D4C5] p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[#8FA86A] font-mono text-xs">#{u.id}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${u.tipo === 'ADMIN' ? 'bg-purple-100 text-purple-700' : u.tipo === 'ENTREGADOR' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>{u.tipo || 'CLIENTE'}</span>
              </div>
              <h3 className="font-bold text-[#1a1a2e] text-base">{u.nome}</h3>
              <p className="text-sm text-[#5B5B3A]">{u.email}</p>
              <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-[#D8D4C5]">
                {u.tipo !== 'ADMIN' && (
                  <>
                    <button onClick={() => alterarTipo(u.id, 'ENTREGADOR')} disabled={loading} className="px-3 py-1.5 text-xs bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 cursor-pointer disabled:opacity-50">Tornar Entregador</button>
                    <button onClick={() => alterarTipo(u.id, 'ADMIN')} disabled={loading} className="px-3 py-1.5 text-xs bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 cursor-pointer disabled:opacity-50">Tornar Admin</button>
                  </>
                )}
                {u.tipo === 'ADMIN' && (
                  <button onClick={() => alterarTipo(u.id, 'CLIENTE')} disabled={loading} className="px-3 py-1.5 text-xs bg-green-100 text-green-700 rounded-lg hover:bg-green-200 cursor-pointer disabled:opacity-50">Rebaixar</button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

function BoxesTab() {
  const [boxes, setBoxes] = useState<BoxResponse[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [tipo, setTipo] = useState('padrao');
  const [tipoRefeicao, setTipoRefeicao] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const carregarBoxes = async () => {
    try { setBoxes(await listarBoxes()); }
    catch { setError('Erro ao carregar boxes'); }
  };

  useEffect(() => { carregarBoxes(); }, []); // eslint-disable-line react-hooks/set-state-in-effect

  const resetForm = () => {
    setNome(''); setDescricao(''); setPreco(''); setTipo('padrao'); setTipoRefeicao(''); setShowForm(false); setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || !preco) { setError('Preencha nome e preço'); return; }
    setLoading(true);
    try {
      await criarBox({ nome, descricao, preco: parseFloat(preco), tipo, tipoRefeicao, itens: [] });
      resetForm(); await carregarBoxes();
    } catch { setError('Erro ao criar box'); }
    finally { setLoading(false); }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-[#3C5A1A] flex items-center gap-2"><Box className="w-5 h-5" />Boxes</h2>
          <p className="text-sm text-[#5B5B3A] mt-1">Crie e gerencie boxes de marmitas</p>
        </div>
        {!showForm && <Button variant="primary" onClick={() => setShowForm(true)} className="flex items-center gap-2"><Plus className="w-4 h-4" />Nova Box</Button>}
      </div>

      {error && <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm"><AlertCircle className="w-4 h-4 shrink-0" />{error}</div>}

      {showForm && (
        <Card className="mb-6 border-[#A3B27A]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-[#3C5A1A]">Nova Box</h2>
            <button onClick={resetForm} className="p-1 hover:bg-[#D8D4C5] rounded-full cursor-pointer"><X className="w-5 h-5 text-[#5B5B3A]" /></button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Nome" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Ex: Box Fit" required />
              <Input label="Preço (R$)" type="number" step="0.01" value={preco} onChange={(e) => setPreco(e.target.value)} placeholder="39.90" required />
              <Input label="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Descrição da box" />
              <Select
                label="Tipo de Refeição"
                value={tipoRefeicao}
                onChange={(e) => setTipoRefeicao(e.target.value)}
                placeholder="Selecione..."
                options={[
                  { value: 'cafe', label: 'Café da Manhã' },
                  { value: 'almoco', label: 'Almoço' },
                  { value: 'jantar', label: 'Jantar' },
                ]}
              />
            </div>
            <div className="flex gap-3 pt-2">
              <Button type="submit" variant="primary" disabled={loading} className="flex items-center gap-2"><Check className="w-4 h-4" />{loading ? 'Salvando...' : 'Criar'}</Button>
              <Button type="button" variant="outline" onClick={resetForm}>Cancelar</Button>
            </div>
          </form>
        </Card>
      )}

      {/* Desktop table */}
      <div className="hidden md:block bg-white rounded-xl shadow-md border border-[#D8D4C5] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#F5F2EB] text-[#3C5A1A] text-left">
              <th className="px-4 py-3 font-semibold">ID</th>
              <th className="px-4 py-3 font-semibold">Nome</th>
              <th className="px-4 py-3 font-semibold hidden md:table-cell">Descrição</th>
              <th className="px-4 py-3 font-semibold">Tipo</th>
              <th className="px-4 py-3 font-semibold">Preço</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D8D4C5]">
            {boxes.map((box) => (
              <tr key={box.id} className="hover:bg-[#FAF8F4] transition-colors">
                <td className="px-4 py-3 text-[#8FA86A] font-mono text-xs">#{box.id}</td>
                <td className="px-4 py-3 font-medium text-[#1a1a2e]">{box.nome}</td>
                <td className="px-4 py-3 text-[#5B5B3A] hidden md:table-cell max-w-xs truncate">{box.descricao || '-'}</td>
                <td className="px-4 py-3"><span className="px-2 py-0.5 rounded-full text-xs bg-[#E8F0DA] text-[#3C5A1A]">{box.tipo}</span></td>
                <td className="px-4 py-3 font-bold text-[#3C5A1A]">R$ {box.preco.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {boxes.length === 0 && <div className="text-center py-12 text-[#8FA86A]"><Box className="w-12 h-12 mx-auto mb-3 opacity-50" /><p>Nenhuma box cadastrada</p></div>}
      </div>
      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {boxes.length === 0 ? (
          <div className="text-center py-12 text-[#8FA86A]"><Box className="w-12 h-12 mx-auto mb-3 opacity-50" /><p>Nenhuma box cadastrada</p></div>
        ) : (
          boxes.map((box) => (
            <div key={box.id} className="bg-white rounded-xl shadow-md border border-[#D8D4C5] p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[#8FA86A] font-mono text-xs">#{box.id}</span>
                <span className="px-2 py-0.5 rounded-full text-xs bg-[#E8F0DA] text-[#3C5A1A]">{box.tipo}</span>
              </div>
              <h3 className="font-bold text-[#1a1a2e] text-base">{box.nome}</h3>
              <p className="text-sm text-[#5B5B3A] mt-0.5">{box.descricao || '-'}</p>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#D8D4C5]">
                <span className="text-xs text-[#5B5B3A]">Preço</span>
                <span className="font-bold text-[#3C5A1A]">R$ {box.preco.toFixed(2)}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
