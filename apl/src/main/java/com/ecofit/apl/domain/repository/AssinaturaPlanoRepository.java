package com.ecofit.apl.domain.repository;

import com.ecofit.apl.domain.model.AssinaturaPlano;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.Optional;

public interface AssinaturaPlanoRepository extends JpaRepository<AssinaturaPlano, Integer> {

    @Query("""
        SELECT a FROM AssinaturaPlano a
        WHERE a.usuario.id = ?1 AND a.ativo = true AND a.dataFim >= ?2
        """)
    Optional<AssinaturaPlano> findAtivoPorUsuario(Integer usuarioId, LocalDate hoje);
}
