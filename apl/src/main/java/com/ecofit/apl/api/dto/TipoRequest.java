package com.ecofit.apl.api.dto;

import com.ecofit.apl.domain.model.TipoUsuario;

public class TipoRequest {
    private TipoUsuario tipo;

    public TipoUsuario getTipo() { return tipo; }
    public void setTipo(TipoUsuario tipo) { this.tipo = tipo; }
}
