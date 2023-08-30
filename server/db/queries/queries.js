export const list_fila_today = `SELECT * 
  FROM tb_fila 
  LEFT JOIN tb_paciente ON tb_paciente.id = tb_fila.paciente_id 
  WHERE atendido IS false 
      AND DATE(data_entrada) = CURRENT_DATE
  ORDER BY 
      CASE WHEN prioridade = 'Preferencial' THEN 1 ELSE 2 END, data_entrada ASC;`;

export const insert_patient_queue = `INSERT INTO tb_fila(paciente_id, prioridade) VALUES ($1, $2);`;

export const insert_new_patient = `
INSERT INTO tb_paciente(criado_em, nome, sobrenome, cpf, data_nascimento, idade, estado_civil_id, genero_id, pcd, telefone, email, termo_aceite, endereco_id)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *;
`;

export const insert_medical_form = `INSERT INTO tb_ficha_medica(paciente_id, motivo_consulta, pressa_alta, pressao_baixa, tratamento_psiquiatrico, doencas_cardiacas, hipertensao, diabetes, drogas, medicamentos )
VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;
