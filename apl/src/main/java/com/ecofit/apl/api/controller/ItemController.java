package com.ecofit.apl.api.controller;

import com.ecofit.apl.api.dto.*;
import com.ecofit.apl.domain.model.Item;
import com.ecofit.apl.domain.service.ItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/itens")
public class ItemController {

    private final ItemService service;

    public ItemController(ItemService service) {
        this.service = service;
    }

    @GetMapping
    public List<ItemResponse> listar() {
        return service.listar().stream().map(ItemResponse::from).toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemResponse> buscar(@PathVariable Integer id) {
        return service.buscarPorId(id)
                .map(i -> ResponseEntity.ok(ItemResponse.from(i)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ItemResponse criar(@RequestBody ItemRequest request) {
        Item item = new Item();
        item.setItemNome(request.getItemNome());
        item.setItemDescricao(request.getItemDescricao());
        item.setItemCusto(request.getItemCusto());
        item.setItemValor(request.getItemValor());
        return ItemResponse.from(service.salvar(item));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ItemResponse> atualizar(@PathVariable Integer id, @RequestBody ItemRequest request) {
        return service.buscarPorId(id).map(item -> {
            item.setItemNome(request.getItemNome());
            item.setItemDescricao(request.getItemDescricao());
            item.setItemCusto(request.getItemCusto());
            item.setItemValor(request.getItemValor());
            return ResponseEntity.ok(ItemResponse.from(service.salvar(item)));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        if (service.buscarPorId(id).isEmpty()) return ResponseEntity.notFound().build();
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
