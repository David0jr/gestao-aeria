const cds = require('@sap/cds')

module.exports = (srv) => {
    srv.on("READ", 'schema', req =>{
        try{
            let filtro = req.data
            const {Aeronave} = cds.entities //busca a tabela schema
            let dados = SELECT.from(Aeronave).where(filtro) // busca os dados da tabela schema
            return dados
        }catch(err){
            console.error("Erro ao ler os dados de Aeronaves" + err)
            throw err
        }
    })

     //busca os dados que voce guardou na variavel
     srv.after("READ", "Aeronaves", aeronaves => {
        return aeronaves.map(aeronave => { console.log(aeronave) });
    });
    
}