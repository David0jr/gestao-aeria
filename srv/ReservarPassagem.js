module.exports = (srv) => {
    srv.on("CREATE", "ReservaPassagem", async (req) => {
      try {
        const { voo_id, passageiro_id, classe, assento, preco } = req.data;
  
        // Validação: Assento único por voo
        const assentoReservado = await srv.run(
          SELECT.from("sap.cap.aircraft.ReservaPassagem").where({ voo_id, assento })
        );
        if (assentoReservado.length > 0) {
          req.error(400, "Assento já reservado.");
        }
  
        // Validação: Voo existente
        const vooExistente = await srv.run(
          SELECT.from("sap.cap.aircraft.HorarioVoo").where({ voo_id })
        );
        if (vooExistente.length === 0) {
          req.error(400, "Voo não encontrado.");
        }
  
        // Validação: Passageiro existente
        const passageiroExistente = await srv.run(
          SELECT.from("sap.cap.aircraft.Passageiro").where({ cpf: passageiro_id })
        );
        if (passageiroExistente.length === 0) {
          req.error(400, "Passageiro não encontrado.");
        }
  
        // Validação: Preço mínimo por classe
        const precoMinimo = classe === "Econômica" ? 200 : 500;
        if (preco < precoMinimo) {
          req.error(400, `O preço mínimo para a classe ${classe} é R$ ${precoMinimo}.`);
        }
  
        return await srv.run(INSERT.into("sap.cap.aircraft.ReservaPassagem").entries(req.data));
      } catch (error) {
        req.error(500, "Erro ao criar reserva de passagem", error);
      }
    });
  };
  