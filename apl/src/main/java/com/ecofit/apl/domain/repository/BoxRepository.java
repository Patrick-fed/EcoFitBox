package com.ecofit.apl.domain.repository;

import com.ecofit.apl.domain.model.Box;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BoxRepository extends JpaRepository<Box, Integer> {
    List<Box> findByTipo(String tipo);
    List<Box> findByTipoRefeicao(String tipoRefeicao);
    List<Box> findByUsuarioId(Integer usuarioId);

    @Query(value = """
        SELECT b.id, b.nome, b.descricao, b.preco, b.tipo, COUNT(p.id) AS total_pedidos
        FROM box b
        JOIN pedido p ON p.box_id = b.id
        GROUP BY b.id
        ORDER BY total_pedidos DESC
        LIMIT 10
        """, nativeQuery = true)
    List<Object[]> findMaisPedidas();
}
