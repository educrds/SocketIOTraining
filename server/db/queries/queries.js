const insert_patient_queue = `INSERT INTO tb_fila(paciente_id, prioridade) VALUES ($1, $2);`;

const insert_new_patient = `
INSERT INTO tb_paciente(criado_em, nome, sobrenome, cpf, data_nascimento, idade, estado_civil_id, genero_id, pcd, telefone, email, termo_aceite, endereco_id)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *;
`;

const insert_medical_form = `INSERT INTO tb_ficha_medica(paciente_id, motivo_consulta, pressa_alta, pressao_baixa, tratamento_psiquiatrico, doencas_cardiacas, hipertensao, diabetes, drogas, medicamentos )
VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;

module.exports = { insert_medical_form, insert_patient_queue, insert_new_patient };
