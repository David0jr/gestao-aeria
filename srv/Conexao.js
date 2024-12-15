module.exports = (srv) => {
    srv.on("READ", "Conexao", async (req) => {
      try {
        return await srv.run(SELECT.from("sap.cap.aircraft.Conexao"));
      } catch (error) {
        req.error(500, "Erro ao consultar conexões", error);
      }
    });
  };
  