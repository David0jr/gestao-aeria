module.exports = (srv) => {
    srv.on("CREATE", "PropriedadeAeronave", async (req) => {
      try {
        const { aeronave_id, companhia_icao } = req.data;
        const existing = await srv.run(
          SELECT.from("sap.cap.aircraft.PropriedadeAeronave").where({
            aeronave_id,
            companhia_icao,
          })
        );
        if (existing.length > 0) {
          req.error(400, "A aeronave já está associada a essa companhia.");
        }
        return await srv.run(INSERT.into("sap.cap.aircraft.PropriedadeAeronave").entries(req.data));
      } catch (error) {
        req.error(500, "Erro ao associar a aeronave à companhia", error);
      }
    });
  };
  