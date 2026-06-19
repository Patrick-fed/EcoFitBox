package com.ecofit.apl.api.dto;

import com.ecofit.apl.domain.model.AssinaturaPlano;

public class AssinaturaPlanoResponse {
    private Integer id;
    private Integer usuarioId;
    private String plano;
    private Boolean ativo;
    private String dataInicio;
    private String dataFim;

    public static AssinaturaPlanoResponse from(AssinaturaPlano a) {
        AssinaturaPlanoResponse r = new AssinaturaPlanoResponse();
        r.setId(a.getId());
        r.setUsuarioId(a.getUsuario().getId());
        r.setPlano(a.getPlano());
        r.setAtivo(a.getAtivo());
        r.setDataInicio(a.getDataInicio().toString());
        r.setDataFim(a.getDataFim().toString());
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
    public String getDataInicio() { return dataInicio; }
    public void setDataInicio(String dataInicio) { this.dataInicio = dataInicio; }
    public String getDataFim() { return dataFim; }
    public void setDataFim(String dataFim) { this.dataFim = dataFim; }
}
