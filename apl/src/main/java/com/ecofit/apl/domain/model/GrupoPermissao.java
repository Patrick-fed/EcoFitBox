package com.ecofit.apl.domain.model;

import jakarta.persistence.*;

@Entity
@Table(name = "grupo_permissao")
public class GrupoPermissao {

    @EmbeddedId
    private GrupoPermissaoId id;

    @ManyToOne
    @MapsId("grupoId")
    @JoinColumn(name = "grupo_id")
    private Grupo grupo;

    @ManyToOne
    @MapsId("permissaoId")
    @JoinColumn(name = "permissao_id")
    private Permissao permissao;

    public GrupoPermissaoId getId() { return id; }
    public void setId(GrupoPermissaoId id) { this.id = id; }
    public Grupo getGrupo() { return grupo; }
    public void setGrupo(Grupo grupo) { this.grupo = grupo; }
    public Permissao getPermissao() { return permissao; }
    public void setPermissao(Permissao permissao) { this.permissao = permissao; }
}
