package com.ecofit.apl.domain.model;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class GrupoPermissaoId implements Serializable {

    private Integer grupoId;
    private Integer permissaoId;

    public GrupoPermissaoId() {}

    public GrupoPermissaoId(Integer grupoId, Integer permissaoId) {
        this.grupoId = grupoId;
        this.permissaoId = permissaoId;
    }

    public Integer getGrupoId() { return grupoId; }
    public void setGrupoId(Integer grupoId) { this.grupoId = grupoId; }
    public Integer getPermissaoId() { return permissaoId; }
    public void setPermissaoId(Integer permissaoId) { this.permissaoId = permissaoId; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        GrupoPermissaoId that = (GrupoPermissaoId) o;
        return Objects.equals(grupoId, that.grupoId) && Objects.equals(permissaoId, that.permissaoId);
    }

    @Override
    public int hashCode() { return Objects.hash(grupoId, permissaoId); }
}
