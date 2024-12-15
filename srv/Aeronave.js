const cds = require('@sap/cds');

module.exports = async (srv) => {

    // Lendo todos os dados de Aeronave
    srv.on('READ', 'Aeronave', async (req) => {
        try {
            const query = SELECT.from('Aeronave'); // Certifique-se de que o nome da entidade seja correto
            const resultado = await cds.run(query); // Usando cds.run() para executar a consulta
            return resultado;
        } catch (error) {
            req.error(500, 'Erro ao consultar aeronave', error); // Retorna erro adequado se algo falhar
        }
    });

    // Lendo uma aeronave específica com base no ID
    srv.on("READ", "Aeronave", async (req) => {
        if (req.params && req.params.length > 0) {
            const idAeronave = req.params[0];  // Usando o parâmetro correto para filtrar
            try {
                const query = SELECT.from('Aeronave').where({ id_aeronave: idAeronave }); // Filtrando pelo ID
                const resultado = await cds.run(query);
                return resultado;  // Retorna a aeronave encontrada
            } catch (error) {
                req.error(500, `Erro ao consultar a aeronave com ID ${idAeronave}`, error);
            }
        } else {
            req.error(400, 'ID da aeronave não fornecido');
        }
    });
};