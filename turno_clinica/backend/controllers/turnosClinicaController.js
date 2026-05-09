const db = require('../db');


const getAll = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM turnos_clinica');
        res.json(rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const getById = async (req, res) => {
    try {
        var id = req.params.id;
        const query = 'SELECT * FROM turnos_clinica where id = ?'
        const [rows] = await db.query(query, [id]);
        res.json(rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const create = async (req, res) => {
    const { paciente_nombre, especialidad, medico_nombre, consultorio, estado } = req.body;

    if (!paciente_nombre || !especialidad || !medico_nombre) {
        return res.status(400).json({ error: 'paciente_nombre, especialidad y medico_nombre son obligatorios' });
    }

    try {
        const query = 'INSERT INTO turnos_clinica (paciente_nombre, especialidad, medico_nombre, consultorio, estado) VALUES (?, ?, ?, ?, ?)';
        const [result] = await db.query(query, [paciente_nombre, especialidad, medico_nombre, consultorio || '', estado || 'pendiente']);
        res.status(201).json({
            mensaje: 'Turno guardado con éxito',
            id: result.insertId
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const update = async (req, res) => {
    var id = req.params.id;
    const { paciente_nombre, especialidad, medico_nombre, fecha_turno, consultorio, estado } = req.body;
    if (!paciente_nombre || !especialidad || !medico_nombre) {
        return res.status(400).json({ error: 'paciente_nombre, especialidad y medico_nombre son obligatorios' });
    }
    try {
        const query = 'UPDATE turnos_clinica SET paciente_nombre=?, especialidad=?, medico_nombre=?, fecha_turno=?, consultorio=?, estado=? WHERE id = ?';
        const [result] = await db.query(query, [paciente_nombre, especialidad, medico_nombre, fecha_turno, consultorio, estado, id]);
        res.status(201).json({
            mensaje: 'Post actualizado con éxito',
            id: result.insertId
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al guardar en la base de datos' });
    }
}

const remove = async (req, res) => {
    var id = req.params.id;
    try {
        const query = 'DELETE FROM turnos_clinica WHERE id = ?';
        const [result] = await db.query(query, [id]);
        res.status(201).json({
            mensaje: 'Post eliminado con éxito' 
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al guardar en la base de datos' });
    }
}

module.exports = { getAll, getById, create, update, remove };