package com.ecofit.apl.domain.service;

import com.ecofit.apl.domain.model.Item;
import com.ecofit.apl.domain.repository.ItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemService {

    private final ItemRepository repository;

    public ItemService(ItemRepository repository) {
        this.repository = repository;
    }

    public List<Item> listar() { return repository.findAll(); }

    public Optional<Item> buscarPorId(Integer id) { return repository.findById(id); }

    public Item salvar(Item item) { return repository.save(item); }

    public void deletar(Integer id) { repository.deleteById(id); }
}
