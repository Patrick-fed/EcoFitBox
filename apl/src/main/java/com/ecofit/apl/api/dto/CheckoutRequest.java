package com.ecofit.apl.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class CheckoutRequest {
    @NotNull
    private Integer boxId;

    @NotNull
    private Integer usuarioId;

    @NotBlank
    private String metodoPagamento;

    private String enderecoEntrega;

    public Integer getBoxId() { return boxId; }
    public void setBoxId(Integer boxId) { this.boxId = boxId; }
    public Integer getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Integer usuarioId) { this.usuarioId = usuarioId; }
    public String getMetodoPagamento() { return metodoPagamento; }
    public void setMetodoPagamento(String metodoPagamento) { this.metodoPagamento = metodoPagamento; }
    public String getEnderecoEntrega() { return enderecoEntrega; }
    public void setEnderecoEntrega(String enderecoEntrega) { this.enderecoEntrega = enderecoEntrega; }
}
