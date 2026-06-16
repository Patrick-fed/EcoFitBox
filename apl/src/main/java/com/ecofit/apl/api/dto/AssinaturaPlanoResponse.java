package com.ecofit.apl.api.dto;

import com.ecofit.apl.domain.model.AssinaturaPlano;

import java.time.LocalDate;

public class AssinaturaPlanoResponse {
    private Integer id;
    private Integer usuarioId;
    private String plano;
    private Boolean ativo;
    private LocalDate dataInicio;
    private LocalDate dataFim;

    public static AssinaturaPlanoResponse from(AssinaturaPlano a) {
        AssinaturaPlanoResponse r = new AssinaturaPlanoResponse();
        r.setId(a.getId());
        r.setUsuarioId(a.getUsuario().getId());
        r.setPlano(a.getPlano());
        r.setAtivo(a.getAtivo());
        r.setDataInicio(a.getDataInicio());
        r.setDataFim(a.getDataFim());
        return r;
    }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public Integer getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Integer usuarioId) { this.usuarioId = usuarioId; }
    public String getPlano() { return plano; }
    public void setPlano(String plano) { this.plano = plano; }
    public Boolean getAtivo() { return ativo; }
    public void setAtivo(Boolean ativo) { this.ativo = ativo; }
    public LocalDate getDataInicio() { return dataInicio; }
    public void setDataInicio(LocalDate dataInicio) { this.dataInicio = dataInicio; }
    public LocalDate getDataFim() { return dataFim; }
    public void setDataFim(LocalDate dataFim) { this.dataFim = dataFim; }
}
