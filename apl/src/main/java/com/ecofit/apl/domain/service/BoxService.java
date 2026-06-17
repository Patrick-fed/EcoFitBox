package com.ecofit.apl.domain.service;

import com.ecofit.apl.domain.model.Box;
import com.ecofit.apl.domain.model.BoxItem;
import com.ecofit.apl.domain.model.BoxItemId;
import com.ecofit.apl.domain.model.Item;
import com.ecofit.apl.domain.repository.BoxItemRepository;
import com.ecofit.apl.domain.repository.BoxRepository;
import com.ecofit.apl.domain.repository.ItemRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ecofit.apl.api.dto.BoxMaisPedidaResponse;
import org.springframework.data.domain.PageRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BoxService {

    private final BoxRepository boxRepository;
    private final BoxItemRepository boxItemRepository;
    private final ItemRepository itemRepository;

    public BoxService(BoxRepository boxRepository, BoxItemRepository boxItemRepository, ItemRepository itemRepository) {
        this.boxRepository = boxRepository;
        this.boxItemRepository = boxItemRepository;
        this.itemRepository = itemRepository;
    }

    public List<Box> listar() { return boxRepository.findAll(); }

    public List<Box> listarPorTipo(String tipo) { return boxRepository.findByTipo(tipo); }

    public List<Box> listarPorRefeicao(String tipoRefeicao) { return boxRepository.findByTipoRefeicao(tipoRefeicao); }

    public Optional<Box> buscarPorId(Integer id) { return boxRepository.findById(id); }

    @Transactional
    public Box salvar(Box box) { return boxRepository.save(box); }

    @Transactional
    public void deletar(Integer id) { boxRepository.deleteById(id); }

    public List<BoxItem> listarItensDaBox(Integer boxId) { return boxItemRepository.findByBoxId(boxId); }

    public List<BoxMaisPedidaResponse> listarMaisPedidas() { return boxRepository.findMaisPedidas(PageRequest.of(0, 10)); }

    @Transactional
    public BoxItem adicionarItem(Integer boxId, Integer itemId, Integer quantidade) {
        Box box = boxRepository.findById(boxId).orElseThrow();
        Item item = itemRepository.findById(itemId).orElseThrow();

        BoxItem boxItem = new BoxItem();
        boxItem.setId(new BoxItemId(boxId, itemId));
        boxItem.setBox(box);
        boxItem.setItem(item);
        boxItem.setQuantidade(quantidade);
        return boxItemRepository.save(boxItem);
    }

    @Transactional
    public void removerItem(Integer boxId, Integer itemId) {
        boxItemRepository.deleteById(new BoxItemId(boxId, itemId));
    }
}
