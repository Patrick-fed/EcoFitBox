package com.ecofit.apl.api.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class AvaliacaoRequest {
    @NotNull @Min(1) @Max(5)
    private Integer nota;

    public Integer getNota() { return nota; }
    public void setNota(Integer nota) { this.nota = nota; }
}
