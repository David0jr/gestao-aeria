module.exports = (srv) => {
    srv.on("READ", "Passageiro", async (req) => {
      try {
        return await srv.run(SELECT.from("sap.cap.aircraft.Passageiro"));
      } catch (error) {
        req.error(500, "Erro ao consultar passageiros", error);
      }
    });
  
    srv.on("CREATE", "Passageiro", async (req) => {
      try {
        const { cpf, telefone, email, data_nascimento } = req.data;
  
        // Validação: CPF único
        const cpfExistente = await srv.run(
          SELECT.from("sap.cap.aircraft.Passageiro").where({ cpf })
        );
        if (cpfExistente.length > 0) {
          req.error(400, "CPF já cadastrado.");
        }
  
        // Validação: telefone único
        const telefoneExistente = await srv.run(
          SELECT.from("sap.cap.aircraft.Passageiro").where({ telefone })
        );
        if (telefoneExistente.length > 0) {
          req.error(400, "Telefone já cadastrado.");
        }
  
        // Validação: e-mail único
        const emailExistente = await srv.run(
          SELECT.from("sap.cap.aircraft.Passageiro").where({ email })
        );
        if (emailExistente.length > 0) {
          req.error(400, "E-mail já cadastrado.");
        }
  
        // Validação de idade mínima
        const idadeMinima = 3;
        const dataAtual = new Date();
        const nascimento = new Date(data_nascimento);
        const idade = dataAtual.getFullYear() - nascimento.getFullYear();
        if (idade < idadeMinima) {
          req.error(400, "Idade mínima para cadastro é de 3 anos.");
        }
  
        // Validação de CPF
        // Implementação de validação de CPF aqui...
  
        return await srv.run(INSERT.into("sap.cap.aircraft.Passageiro").entries(req.data));
      } catch (error) {
        req.error(500, "Erro ao criar passageiro", error);
      }
    });
  };
  