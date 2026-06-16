package com.ecofit.apl.domain.repository;

import com.ecofit.apl.domain.model.Permissao;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PermissaoRepository extends JpaRepository<Permissao, Integer> {
    Optional<Permissao> findByNome(String nome);
}
