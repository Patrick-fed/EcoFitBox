package com.ecofit.apl.api.dto;

import java.time.LocalDate;

public class AssinaturaPlanoRequest {
    private Integer usuarioId;
    private String plano;
    private LocalDate dataInicio;
    private LocalDate dataFim;

    public Integer getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Integer usuarioId) { this.usuarioId = usuarioId; }
    public String getPlano() { return plano; }
    public void setPlano(String plano) { this.plano = plano; }
    public LocalDate getDataInicio() { return dataInicio; }
    public void setDataInicio(LocalDate dataInicio) { this.dataInicio = dataInicio; }
    public LocalDate getDataFim() { return dataFim; }
    public void setDataFim(LocalDate dataFim) { this.dataFim = dataFim; }
}
