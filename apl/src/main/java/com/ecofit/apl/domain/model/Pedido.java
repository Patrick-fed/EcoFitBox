package com.ecofit.apl.domain.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "pedido")
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "box_id")
    private Box box;

    @ManyToOne(optional = false)
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @Column(name = "data_pedido", nullable = false)
    private LocalDateTime dataPedido = LocalDateTime.now();

    @Column(nullable = false, length = 50)
    private String status = "pendente";

    @Column(name = "endereco_entrega", nullable = false)
    private String enderecoEntrega;

    @Column(name = "metodo_pagamento", nullable = false, length = 20)
    private String metodoPagamento;

    @Column(name = "taxa_entrega", precision = 10, scale = 2)
    private BigDecimal taxaEntrega;

    @Column(name = "data_confirmacao_entrega")
    private LocalDateTime dataConfirmacaoEntrega;

    @Column
    private Integer avaliacao;

    @Column(name = "payment_id")
    private String paymentId;

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public Box getBox() { return box; }
    public void setBox(Box box) { this.box = box; }
    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }
    public LocalDateTime getDataPedido() { return dataPedido; }
    public void setDataPedido(LocalDateTime dataPedido) { this.dataPedido = dataPedido; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getEnderecoEntrega() { return enderecoEntrega; }
    public void setEnderecoEntrega(String enderecoEntrega) { this.enderecoEntrega = enderecoEntrega; }
    public String getMetodoPagamento() { return metodoPagamento; }
    public void setMetodoPagamento(String metodoPagamento) { this.metodoPagamento = metodoPagamento; }
    public BigDecimal getTaxaEntrega() { return taxaEntrega; }
    public void setTaxaEntrega(BigDecimal taxaEntrega) { this.taxaEntrega = taxaEntrega; }
    public LocalDateTime getDataConfirmacaoEntrega() { return dataConfirmacaoEntrega; }
    public void setDataConfirmacaoEntrega(LocalDateTime dataConfirmacaoEntrega) { this.dataConfirmacaoEntrega = dataConfirmacaoEntrega; }
    public Integer getAvaliacao() { return avaliacao; }
    public void setAvaliacao(Integer avaliacao) { this.avaliacao = avaliacao; }
    public String getPaymentId() { return paymentId; }
    public void setPaymentId(String paymentId) { this.paymentId = paymentId; }
}
