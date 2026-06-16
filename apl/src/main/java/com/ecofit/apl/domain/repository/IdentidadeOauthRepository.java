package com.ecofit.apl.domain.repository;

import com.ecofit.apl.domain.model.IdentidadeOauth;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IdentidadeOauthRepository extends JpaRepository<IdentidadeOauth, Integer> {
    Optional<IdentidadeOauth> findByProvedorAndProvedorId(String provedor, String provedorId);
    Optional<IdentidadeOauth> findByProvedorAndEmailProvedor(String provedor, String emailProvedor);
}
