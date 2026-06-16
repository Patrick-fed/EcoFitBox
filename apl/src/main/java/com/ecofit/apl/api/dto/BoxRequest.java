package com.ecofit.apl.api.dto;

import java.math.BigDecimal;
import java.util.List;

public class BoxRequest {
    private String nome;
    private String descricao;
    private BigDecimal preco;
    private String tipo;
    private String tipoRefeicao;
    private Integer usuarioId;
    private List<ItemQuantidade> itens;

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }
    public BigDecimal getPreco() { return preco; }
    public void setPreco(BigDecimal preco) { this.preco = preco; }
    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }
    public String getTipoRefeicao() { return tipoRefeicao; }
    public void setTipoRefeicao(String tipoRefeicao) { this.tipoRefeicao = tipoRefeicao; }
    public Integer getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Integer usuarioId) { this.usuarioId = usuarioId; }
    public List<ItemQuantidade> getItens() { return itens; }
    public void setItens(List<ItemQuantidade> itens) { this.itens = itens; }

    public static class ItemQuantidade {
        private Integer itemId;
        private Integer quantidade;

        public Integer getItemId() { return itemId; }
        public void setItemId(Integer itemId) { this.itemId = itemId; }
        public Integer getQuantidade() { return quantidade; }
        public void setQuantidade(Integer quantidade) { this.quantidade = quantidade; }
    }
}
