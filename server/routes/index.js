const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('../db/database');
const { insert_patient_queue, insert_medical_form, insert_new_patient } = require('../db/queries/queries');

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// EXECUTE QUERY
app.get('/execute-query', async (req, res) => {
  const { query } = req.query;
  try {
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// INSERT || RETRIEVE ADRESS FROM BD
const insertOrRetrieveAddress = async (pool, address) => {
  const addressQuery = `INSERT INTO tb_endereco(cep, estado, bairro, logradouro, cidade)
  VALUES($1, $2, $3, $4, $5) ON CONFLICT (cep) DO NOTHING
  RETURNING id;`;

  const addressValues = [address.cep, address.estado, address.bairro, address.logradouro, address.cidade];

  try {
    const addressResult = await pool.query(addressQuery, addressValues);
    if (addressResult.rows.length > 0) {
      return addressResult.rows[0].id;
    } else {
      const existingAddressQuery = `SELECT id FROM tb_endereco WHERE cep = $1`;
      const existingAddressValues = [address.cep];

      const existingAddressResult = await pool.query(existingAddressQuery, existingAddressValues);
      return existingAddressResult.rows[0].id;
    }
  } catch (error) {
    console.error({ error: error.message });
  }
};

// INSERT || RETRIEVE MEDICAL FORM FROM BD
const insertMedicalForm = async (pool, medicalForm, pacienteID) => {
  const medicalFormQuery = insert_medical_form;
  const medicalFormValues = [
    pacienteID,
    medicalForm.motivo,
    medicalForm.pressaoAlta,
    medicalForm.pressaoBaixa,
    medicalForm.tratamentoPsiquiatrico,
    medicalForm.doencasCardiacas,
    medicalForm.hipertensao,
    medicalForm.diabetes,
    medicalForm.drogas,
    medicalForm.medicamentos,
  ];
  try {
    await pool.query(medicalFormQuery, medicalFormValues);
  } catch (error) {
    console.error({ error: error.message });
  }
};

// INSERIR PACIENTE NA FILA
const insertQueue = async patientID => {
  try {
    const insertQuery = insert_patient_queue;
    const values = [patientID, 'Preferencial'];
    await pool.query(insertQuery, values);
  } catch (error) {
    console.error({ error: error.message });
  }
};

// GET DATA BY TABLE
app.post('/insert', async (req, res) => {
  const { patient } = req.body;

  try {
    const addressId = await insertOrRetrieveAddress(pool, patient.endereco);
    const insertQuery = insert_new_patient;

    const values = [
      new Date(),
      patient.nome,
      patient.sobrenome,
      patient.cpf,
      patient.dataNascimento,
      patient.idade,
      patient.estadoCivil,
      patient.genero,
      patient.pcd,
      patient.telefone,
      patient.email,
      patient.termoAceito,
      addressId,
    ];
    const result = await pool.query(insertQuery, values);
    const patientID = result.rows[0].id;

    insertMedicalForm(pool, patient.fichaMedica, patientID);
    insertQueue(patientID);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => console.log('Server has started on port 5000'));
