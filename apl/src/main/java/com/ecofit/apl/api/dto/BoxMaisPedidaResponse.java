package com.ecofit.apl.api.dto;

import java.math.BigDecimal;

public class BoxMaisPedidaResponse {
    private Integer id;
    private String nome;
    private String descricao;
    private BigDecimal preco;
    private String tipo;
    private Long totalPedidos;

    public static BoxMaisPedidaResponse from(Object[] row) {
        BoxMaisPedidaResponse r = new BoxMaisPedidaResponse();
        r.setId(((Number) row[0]).intValue());
        r.setNome((String) row[1]);
        r.setDescricao((String) row[2]);
        r.setPreco((BigDecimal) row[3]);
        r.setTipo((String) row[4]);
        r.setTotalPedidos(((Number) row[5]).longValue());
        return r;
    }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }
    public BigDecimal getPreco() { return preco; }
    public void setPreco(BigDecimal preco) { this.preco = preco; }
    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }
    public Long getTotalPedidos() { return totalPedidos; }
    public void setTotalPedidos(Long totalPedidos) { this.totalPedidos = totalPedidos; }
}
