package com.ecofit.apl.api.dto;

public class PagamentoResponse {
    private String status;
    private String paymentId;
    private String mensagem;

    public PagamentoResponse() {}

    public PagamentoResponse(String status, String paymentId, String mensagem) {
        this.status = status;
        this.paymentId = paymentId;
        this.mensagem = mensagem;
    }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getPaymentId() { return paymentId; }
    public void setPaymentId(String paymentId) { this.paymentId = paymentId; }
    public String getMensagem() { return mensagem; }
    public void setMensagem(String mensagem) { this.mensagem = mensagem; }
}
