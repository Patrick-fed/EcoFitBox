package com.ecofit.apl.api.controller;

import com.ecofit.apl.api.dto.*;
import com.ecofit.apl.domain.model.*;
import com.ecofit.apl.domain.repository.*;
import com.ecofit.apl.domain.service.BoxService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/boxes")
public class BoxController {

    private final BoxService boxService;

    public BoxController(BoxService boxService) {
        this.boxService = boxService;
    }

    @GetMapping
    public List<BoxResponse> listar(@RequestParam(required = false) String tipo,
                                    @RequestParam(name = "refeicao", required = false) String tipoRefeicao) {
        List<Box> boxes;
        if (tipoRefeicao != null) {
            boxes = boxService.listarPorRefeicao(tipoRefeicao);
        } else if (tipo != null) {
            boxes = boxService.listarPorTipo(tipo);
        } else {
            boxes = boxService.listar();
        }
        return boxes.stream().map(BoxResponse::from).toList();
    }

    @GetMapping("/mais-pedidas")
    public List<BoxMaisPedidaResponse> maisPedidas() {
        return boxService.listarMaisPedidas().stream()
                .map(BoxMaisPedidaResponse::from).toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<BoxResponse> buscar(@PathVariable Integer id) {
        return boxService.buscarPorId(id)
                .map(b -> ResponseEntity.ok(BoxResponse.from(b)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<BoxResponse> criar(@RequestBody BoxRequest request) {
        Box box = new Box();
        box.setNome(request.getNome());
        box.setDescricao(request.getDescricao());
        box.setPreco(request.getPreco());
        box.setTipo(request.getTipo() != null ? request.getTipo() : "padrao");
        box.setTipoRefeicao(request.getTipoRefeicao());
        if (request.getUsuarioId() != null) {
            Usuario usuario = new Usuario();
            usuario.setId(request.getUsuarioId());
            box.setUsuario(usuario);
        }
        Box salva = boxService.salvar(box);

        if (request.getItens() != null) {
            for (BoxRequest.ItemQuantidade iq : request.getItens()) {
                boxService.adicionarItem(salva.getId(), iq.getItemId(), iq.getQuantidade());
            }
        }
        return ResponseEntity.ok(BoxResponse.from(salva));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        if (boxService.buscarPorId(id).isEmpty()) return ResponseEntity.notFound().build();
        boxService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{boxId}/itens")
    public ResponseEntity<Void> adicionarItem(@PathVariable Integer boxId, @RequestBody BoxRequest.ItemQuantidade item) {
        boxService.adicionarItem(boxId, item.getItemId(), item.getQuantidade());
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{boxId}/itens/{itemId}")
    public ResponseEntity<Void> removerItem(@PathVariable Integer boxId, @PathVariable Integer itemId) {
        boxService.removerItem(boxId, itemId);
        return ResponseEntity.noContent().build();
    }
}
