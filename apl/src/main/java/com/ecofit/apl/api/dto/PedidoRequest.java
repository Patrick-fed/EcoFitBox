package com.ecofit.apl.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class PedidoRequest {
    @NotNull
    private Integer boxId;

    @NotNull
    private Integer usuarioId;

    @NotBlank
    private String enderecoEntrega;

    @NotBlank
    private String metodoPagamento;

    public Integer getBoxId() { return boxId; }
    public void setBoxId(Integer boxId) { this.boxId = boxId; }
    public Integer getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Integer usuarioId) { this.usuarioId = usuarioId; }
    public String getEnderecoEntrega() { return enderecoEntrega; }
    public void setEnderecoEntrega(String enderecoEntrega) { this.enderecoEntrega = enderecoEntrega; }
    public String getMetodoPagamento() { return metodoPagamento; }
    public void setMetodoPagamento(String metodoPagamento) { this.metodoPagamento = metodoPagamento; }
}
