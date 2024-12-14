
using { sap.cap.aviao as my } from '../db/schema';

service VooService  {
    @readonly entity Aeronaves as projection on my.Aeronave;
    @readonly entity Aeroportos as projection on my.Aeroporto;
    @readonly entity Companhias as projection on my.Companhia;
    @readonly entity Conexoes as projection on my.Conexao;
    entity Passageiros as projection on my.Passageiro;
    entity Reservas as projection on my.ReservaPassagem;
    entity HorariosVoos as projection on my.HorarioVoo;
}


