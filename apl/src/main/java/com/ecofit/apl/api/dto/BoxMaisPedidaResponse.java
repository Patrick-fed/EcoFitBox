package com.ecofit.apl.api.dto;

import java.math.BigDecimal;

public class BoxMaisPedidaResponse {
    private Integer id;
    private String nome;
    private String descricao;
    private BigDecimal preco;
    private String tipo;
    private Long totalPedidos;

    public BoxMaisPedidaResponse() {}

    public BoxMaisPedidaResponse(Integer id, String nome, String descricao, BigDecimal preco, String tipo, Long totalPedidos) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
        this.tipo = tipo;
        this.totalPedidos = totalPedidos;
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
