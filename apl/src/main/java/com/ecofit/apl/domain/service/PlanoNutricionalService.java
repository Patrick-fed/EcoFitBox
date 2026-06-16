package com.ecofit.apl.domain.service;

import com.ecofit.apl.domain.model.PlanoNutricional;
import com.ecofit.apl.domain.repository.PlanoNutricionalRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class PlanoNutricionalService {

    private final PlanoNutricionalRepository repository;

    public PlanoNutricionalService(PlanoNutricionalRepository repository) {
        this.repository = repository;
    }

    public Optional<PlanoNutricional> buscarPorUsuario(Integer usuarioId) {
        return repository.findByUsuarioId(usuarioId);
    }

    @Transactional
    public PlanoNutricional salvar(PlanoNutricional plano) { return repository.save(plano); }

    @Transactional
    public void deletar(Integer id) { repository.deleteById(id); }
}
