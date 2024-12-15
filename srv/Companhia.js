

module.exports = (srv) => {
    srv.on("READ", "Companhia", async (req) => {
      try {
        // Retorna todas as companhias aéreas registradas no sistema
        return await srv.run(SELECT.from("sap.cap.aircraft.Competencia"));
      } catch (error) {
        req.error(500, "Erro ao consultar as companhias aéreas", error);
      }
    });
  };
  