import { useEffect, useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { listarItens, criarItem, atualizarItem, deletarItem } from '../api/itens';
import type { ItemResponse, ItemRequest } from '../types';
import { Plus, Pencil, Trash2, X, Check, Package, AlertCircle } from 'lucide-react';

export function Admin() {
  const [itens, setItens] = useState<ItemResponse[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [itemNome, setItemNome] = useState('');
  const [itemDescricao, setItemDescricao] = useState('');
  const [itemCusto, setItemCusto] = useState('');
  const [itemValor, setItemValor] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    carregarItens();
  }, []);

  const carregarItens = async () => {
    try {
      const data = await listarItens();
      setItens(data);
    } catch {
      setError('Erro ao carregar itens');
    }
  };

  const resetForm = () => {
    setItemNome('');
    setItemDescricao('');
    setItemCusto('');
    setItemValor('');
    setEditId(null);
    setShowForm(false);
    setError('');
  };

  const openEdit = (item: ItemResponse) => {
    setItemNome(item.itemNome);
    setItemDescricao(item.itemDescricao || '');
    setItemCusto(item.itemCusto.toString());
    setItemValor(item.itemValor.toString());
    setEditId(item.id);
    setShowForm(true);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemNome || !itemCusto || !itemValor) {
      setError('Preencha todos os campos obrigatórios');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const payload: ItemRequest = {
        itemNome,
        itemDescricao,
        itemCusto: parseFloat(itemCusto),
        itemValor: parseFloat(itemValor),
      };
      if (editId) {
        await atualizarItem(editId, payload);
      } else {
        await criarItem(payload);
      }
      resetForm();
      await carregarItens();
    } catch {
      setError(editId ? 'Erro ao atualizar item' : 'Erro ao criar item');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja remover este item?')) return;
    try {
      await deletarItem(id);
      await carregarItens();
    } catch {
      setError('Erro ao deletar item');
    }
  };

  return (
    <div className="min-h-screen bg-[#EDE7DF]">
      <Navbar />

      <div className="pt-20 px-6 pb-10 max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#3C5A1A] flex items-center gap-2">
              <Package className="w-6 h-6" />
              Administração de Itens
            </h1>
            <p className="text-sm text-[#5B5B3A] mt-1">Gerencie o catálogo de itens do sistema</p>
          </div>
          {!showForm && (
            <Button variant="primary" onClick={() => { resetForm(); setShowForm(true); }} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Novo Item
            </Button>
          )}
        </div>

        {error && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        {showForm && (
          <Card className="mb-6 border-[#A3B27A]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-[#3C5A1A]">{editId ? 'Editar Item' : 'Novo Item'}</h2>
              <button onClick={resetForm} className="p-1 hover:bg-[#D8D4C5] rounded-full cursor-pointer">
                <X className="w-5 h-5 text-[#5B5B3A]" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Nome do item" value={itemNome} onChange={(e) => setItemNome(e.target.value)} placeholder="Ex: Frango Grelhado" required />
                <Input label="Descrição" value={itemDescricao} onChange={(e) => setItemDescricao(e.target.value)} placeholder="Descrição opcional" />
                <Input label="Custo (R$)" type="number" step="0.01" value={itemCusto} onChange={(e) => setItemCusto(e.target.value)} placeholder="10.00" required />
                <Input label="Preço de venda (R$)" type="number" step="0.01" value={itemValor} onChange={(e) => setItemValor(e.target.value)} placeholder="15.00" required />
              </div>
              <div className="flex gap-3 pt-2">
                <Button type="submit" variant="primary" disabled={loading} className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  {loading ? 'Salvando...' : editId ? 'Atualizar' : 'Criar'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>Cancelar</Button>
              </div>
            </form>
          </Card>
        )}

        <div className="bg-white rounded-xl shadow-md border border-[#D8D4C5] overflow-hidden">
          <div className="overflow-x-auto">
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
                        <button
                          onClick={() => openEdit(item)}
                          className="p-2 text-[#5B7B3A] hover:bg-[#E8F0DA] rounded-lg transition cursor-pointer"
                          title="Editar"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition cursor-pointer"
                          title="Remover"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {itens.length === 0 && (
              <div className="text-center py-12 text-[#8FA86A]">
                <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Nenhum item cadastrado</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 text-xs text-[#8FA86A] text-right">
          Total: {itens.length} {itens.length === 1 ? 'item' : 'itens'}
        </div>
      </div>
    </div>
  );
}
