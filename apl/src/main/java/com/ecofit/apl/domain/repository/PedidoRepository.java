package com.ecofit.apl.domain.repository;

import com.ecofit.apl.domain.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PedidoRepository extends JpaRepository<Pedido, Integer> {
    List<Pedido> findByUsuarioId(Integer usuarioId);
    List<Pedido> findByStatus(String status);
}
