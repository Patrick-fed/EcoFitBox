package com.ecofit.apl.domain.service;

import com.ecofit.apl.domain.model.AssinaturaPlano;
import com.ecofit.apl.domain.repository.AssinaturaPlanoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class AssinaturaPlanoService {

    private final AssinaturaPlanoRepository repository;

    public AssinaturaPlanoService(AssinaturaPlanoRepository repository) {
        this.repository = repository;
    }

    public Optional<AssinaturaPlano> buscarAtivoPorUsuario(Integer usuarioId) {
        return repository.findAtivoPorUsuario(usuarioId, LocalDate.now());
    }

    @Transactional
    public AssinaturaPlano salvar(AssinaturaPlano assinatura) {
        return repository.save(assinatura);
    }
}
