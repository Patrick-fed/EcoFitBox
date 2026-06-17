package com.ecofit.apl.domain.repository;

import com.ecofit.apl.api.dto.BoxMaisPedidaResponse;
import com.ecofit.apl.domain.model.Box;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BoxRepository extends JpaRepository<Box, Integer> {
    List<Box> findByTipo(String tipo);
    List<Box> findByTipoRefeicao(String tipoRefeicao);
    List<Box> findByUsuarioId(Integer usuarioId);

    @Query("SELECT new com.ecofit.apl.api.dto.BoxMaisPedidaResponse(b.id, b.nome, b.descricao, b.preco, b.tipo, COUNT(p.id)) " +
           "FROM Box b JOIN Pedido p ON p.box.id = b.id " +
           "GROUP BY b.id " +
           "ORDER BY COUNT(p.id) DESC")
    List<BoxMaisPedidaResponse> findMaisPedidas(Pageable pageable);
}
