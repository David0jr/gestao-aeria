using { sap.cap.aviao as my } from '../db/schema';

service VooService {

    // Projeções e entidades somente leitura
    @readonly entity Companhia as projection on my.Companhia;
    @readonly entity Aeronave as projection on my.Aeronave;
    @readonly entity PropriedadeAeronave as projection on my.PropriedadeAeronave;
    @readonly entity Aeroporto as projection on my.Aeroporto;
    @readonly entity Conexao as projection on my.Conexao;

    // Entidade Passageiro - CRUD
    entity Passageiro as projection on my.Passageiro {
        key id_passageiro,   // Ajustar para o nome correto
        nome,
        telefone,
        email,
        data_de_nascimento  // Corrigir o nome da propriedade
    }

    // Entidade ReservaPassagem - CRUD
    entity ReservaPassagem as projection on my.ReservaPassagem {
        key id_reserva,     
        assento,
        classe,
        preco,
        status,
        data_reserva
    }

    // Entidade HorarioVoo - CRUD
    entity HorarioVoo as projection on my.HorarioVoo {
        key id_horario_voo, // Ajustar para o nome correto
        companhia,          // Referenciar a associação corretamente
        conexao,            
        nr_assentos_executivo,
        nr_assentos_economico,
        capacidade_total,
        partida_prevista,
        chegada_prevista,
        partida_real,
        chegada_real,
        situacao_voo,
        situacao_partida,
        situacao_chegada
    }

    // Serviço para criar reservas com validações
    action CreateReservaPassagem(assento: String, id_horario_voo: UUID, id_passageiro: UUID, classe: String, preco: Decimal) returns Integer;

    // Serviço para cancelar reserva
    action CancelReservaPassagem(id_reserva: UUID) returns String;

    // Serviço para atualizar o status do voo
    action AtualizarStatusVoo(id_horario_voo: UUID, novo_status: String, partida_real: DateTime, chegada_real: DateTime) returns String;
}