export type TipoUsuario = 'CLIENTE' | 'ENTREGADOR' | 'ADMIN';

export interface Usuario {
  id: number;
  nome: string;
  idade?: number;
  email: string;
  endereco: string;
  acompanhamentoNutricional: boolean;
  tipo?: TipoUsuario;
}

export interface AuthResponse {
  token: string;
  usuario: Usuario;
}

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface RegisterRequest {
  nome: string;
  email: string;
  senha: string;
  endereco: string;
  acompanhamentoNutricional: boolean;
}

export interface OauthLoginRequest {
  token: string;
}

export interface BoxResponse {
  id: number;
  nome: string;
  descricao?: string;
  preco: number;
  tipo: string;
  tipoRefeicao?: string;
  usuarioId?: number;
}

export interface BoxMaisPedidaResponse {
  id: number;
  nome: string;
  descricao?: string;
  preco: number;
  tipo: string;
  totalPedidos: number;
}

export interface BoxRequest {
  nome: string;
  descricao?: string;
  preco: number;
  tipo: string;
  tipoRefeicao?: string;
  usuarioId?: number;
  itens?: { itemId: number; quantidade: number }[];
}

export interface ItemResponse {
  id: number;
  itemNome: string;
  itemDescricao?: string;
  itemCusto: number;
  itemValor: number;
}

export interface ItemRequest {
  itemNome: string;
  itemDescricao?: string;
  itemCusto: number;
  itemValor: number;
}

export interface PedidoResponse {
  id: number;
  boxId: number;
  usuarioId: number;
  dataPedido: string;
  status: string;
  enderecoEntrega: string;
  metodoPagamento: string;
  taxaEntrega: number;
  desconto: number;
  total: number;
  dataConfirmacaoEntrega?: string;
  avaliacao?: number;
  paymentId?: string;
}

export interface PedidoRequest {
  boxId: number;
  usuarioId: number;
  enderecoEntrega: string;
  metodoPagamento: string;
}

export interface CheckoutRequest {
  boxId: number;
  usuarioId: number;
  metodoPagamento: string;
  enderecoEntrega: string;
}

export interface PagamentoRequest {
  pedidoId: number;
  metodoPagamento: string;
  parcelas?: number;
}

export interface PagamentoResponse {
  status: string;
  paymentId: string;
  mensagem: string;
}

export interface AssinaturaPlanoRequest {
  usuarioId: number;
  plano: string;
  dataInicio: string;
  dataFim: string;
}

export interface AssinaturaPlanoResponse {
  id: number;
  usuarioId: number;
  plano: string;
  ativo: boolean;
  dataInicio: string;
  dataFim: string;
}

export interface PlanoNutricionalRequest {
  usuarioId: number;
  objetivo: string;
  restricoes: string;
  caloriasDiarias: number;
  proteinas: number;
  carboidratos: number;
  gorduras: number;
  observacoes: string;
  arquivoPlano?: string;
}

export interface PlanoNutricionalResponse {
  id: number;
  usuarioId: number;
  objetivo: string;
  restricoes: string;
  caloriasDiarias: number;
  proteinas: number;
  carboidratos: number;
  gorduras: number;
  observacoes: string;
  arquivoPlano?: string;
}

export interface AvaliacaoRequest {
  nota: number;
}

export interface StatusRequest {
  status: string;
}
