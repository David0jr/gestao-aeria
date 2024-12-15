module.exports = (srv) => {
    srv.on("READ", "Aeroporto", async (req) => {
      try {
        return await srv.run(SELECT.from("sap.cap.aircraft.Aeroporto"));
      } catch (error) {
        req.error(500, "Erro ao consultar os aeroportos", error);
      }
    });
  };
  