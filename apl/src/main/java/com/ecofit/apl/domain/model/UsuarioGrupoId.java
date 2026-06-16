package com.ecofit.apl.domain.model;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class UsuarioGrupoId implements Serializable {

    private Integer usuarioId;
    private Integer grupoId;

    public UsuarioGrupoId() {}

    public UsuarioGrupoId(Integer usuarioId, Integer grupoId) {
        this.usuarioId = usuarioId;
        this.grupoId = grupoId;
    }

    public Integer getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Integer usuarioId) { this.usuarioId = usuarioId; }
    public Integer getGrupoId() { return grupoId; }
    public void setGrupoId(Integer grupoId) { this.grupoId = grupoId; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UsuarioGrupoId that = (UsuarioGrupoId) o;
        return Objects.equals(usuarioId, that.usuarioId) && Objects.equals(grupoId, that.grupoId);
    }

    @Override
    public int hashCode() { return Objects.hash(usuarioId, grupoId); }
}
