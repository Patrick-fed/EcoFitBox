package com.ecofit.apl.api.dto;

import com.ecofit.apl.domain.model.Pedido;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class PedidoResponse {
    private Integer id;
    private Integer boxId;
    private Integer usuarioId;
    private LocalDateTime dataPedido;
    private String status;
    private String enderecoEntrega;
    private String metodoPagamento;
    private BigDecimal taxaEntrega;
    private LocalDateTime dataConfirmacaoEntrega;
    private Integer avaliacao;
    private String paymentId;

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public Integer getBoxId() { return boxId; }
    public void setBoxId(Integer boxId) { this.boxId = boxId; }
    public Integer getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Integer usuarioId) { this.usuarioId = usuarioId; }
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

    public static PedidoResponse from(Pedido p) {
        PedidoResponse r = new PedidoResponse();
        r.setId(p.getId());
        r.setBoxId(p.getBox().getId());
        r.setUsuarioId(p.getUsuario().getId());
        r.setDataPedido(p.getDataPedido());
        r.setStatus(p.getStatus());
        r.setEnderecoEntrega(p.getEnderecoEntrega());
        r.setMetodoPagamento(p.getMetodoPagamento());
        r.setTaxaEntrega(p.getTaxaEntrega());
        r.setDataConfirmacaoEntrega(p.getDataConfirmacaoEntrega());
        r.setAvaliacao(p.getAvaliacao());
        r.setPaymentId(p.getPaymentId());
        return r;
    }
}
