package com.ecofit.apl.domain.repository;

import com.ecofit.apl.domain.model.PlanoNutricional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PlanoNutricionalRepository extends JpaRepository<PlanoNutricional, Integer> {
    Optional<PlanoNutricional> findByUsuarioId(Integer usuarioId);
}
