namespace sap.cap.aviao;

entity Aeronave {
    key id_aeronave        : UUID; 
    marca              : String(100); 
    ds_modelo          : String(100); 
    nr_serie           : String(100); 
    cd_categoria       : String(50); 
    cd_tipo            : String(50); 
    nm_fabricante      : String(100); 
    cd_cls             : String(50); 
    nr_pmd             : Decimal(10,2); 
    cd_tipo_icao       : String(10); 
    nr_assentos_executivo : Integer; 
    nr_assentos_economico : Integer; 
    nr_assentos_max    : Integer; 
    nr_ano_fabricacao  : Integer; 
    tp_motor           : String(50); 
    qt_motor           : Integer; 
    tp_pouso           : String(50); 

}

entity Aeroporto {
    key id_aeroporto : UUID;          
    ICAO         : String(4);     
    nome         : String(150);   
    cidade       : String(100);   
    estado       : String(2);     
    pais         : String(50);    
}

entity Companhia { 
   key id_companhia          : UUID;            
   key ICAO                  : String(4);    
   key CNPJ                  : String(14);   
   key IATA                  : String(3);      
    razao_social          : String(150);         
    representante_legal   : String(100);     
    pais_sede             : String(50);      
    endereco              : String(200);     
    cidade                : String(100);     
    UF                    : String(2);       
    CEP                   : String(8);       
    telefone              : String(15);      
    email                 : String(100);     
    decisao_operacional   : String(200);     
    atividades_areas      : String(200);     
    data_decisao_operacao : Date;            
    validade_operacional  : Date;            
}

entity Conexao { 
    key id_conexao          : UUID;         
    aeroporto_origem    : Association to Aeroporto; 
    aeroporto_destino   : Association to Aeroporto; 
}

entity HorarioVoo {
   key id_horario_voo       : UUID; 
    companhia            : Association to Companhia; 
    conexao              : Association to Conexao; 
    aeronave             : Association to Aeronave; 
    nr_assentos_executivo : Integer; 
    nr_assentos_economico: Integer; 
    capacidade_total     : Integer; 
    data                 : Date; 
    partida_prevista     : DateTime; 
    chegada_prevista     : DateTime; 
    partida_real         : DateTime; 
    chegada_real         : DateTime; 
    situacao_voo         : String(50); 
    situacao_partida     : String(50); 
    situacao_chegada     : String(50); 
}

entity PropriedadeAeronave {
    key id_propriedade_aeronave : UUID;
    id_companhia               : Association to Companhia;
    id_aeronave                : Association to Aeronave;
    proprietario               : String(150);
    sg_uf                      : String(2);
    cpf_cnpj                   : String(14);
    nm_operador                : String(150);
    nr_cert_matricula          : String(100);
    dt_validade_cva            : Date;
    dt_validade_ca             : Date;
    dt_canc                    : Date;
    cd_interdicao              : String(50);
    ds_gravame                 : String(200);
    dt_matricula               : Date;
}

entity ReservaPassagem{
    key id_reserva       : UUID;
    id_passageiro        : Association to Passageiro;
    id_horario_voo       : Association to HorarioVoo;
    assento              : String(10);
    classe               : String(20);
    status               : String(20);
    data_reserva         : Date;
    preco                : Decimal(10,2);
}

entity Passageiro {
    key id_passageiro        : UUID;
    cpf                      : String(11);
    nome                     : String(100);
    email                    : String(100);
    telefone                 : String(15);
    data_de_nascimento       : Date;
    endereco                 : String(200);
}