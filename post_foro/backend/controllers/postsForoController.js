const db = require('../db');


const getAll = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM posts_foro');
        res.json(rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const getById = async (req, res) => {
    try {
        var id = req.params.id;
        const query = 'SELECT * FROM posts_foro where id = ?'
        const [rows] = await db.query(query, [id]);
        res.json(rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const create = async (req, res) => {
    const { titulo, contenido, autor_alias } = req.body;
    if (!titulo || !contenido || !autor_alias) {
        return res.status(400).json({ error: 'titulo, contenido y autor_alias son obligatorios' });
    }
    try {
        const query = 'INSERT INTO posts_foro (titulo, contenido, autor_alias, fecha_creacion, vistas, cerrado) VALUES (?, ?, ?, NOW(), 0, 0)';
        const [result] = await db.query(query, [titulo, contenido, autor_alias]);
        res.status(201).json({
            mensaje: 'Post guardado con éxito',
            id: result.insertId
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al guardar en la base de datos' });
    }
}

const update = async (req, res) => {
    var id = req.params.id;
    const { titulo, contenido, autor_alias, vistas, cerrado } = req.body;
    if (!titulo || !contenido || !autor_alias) {
        return res.status(400).json({ error: 'titulo, contenido y autor_alias son obligatorios' });
    }
    try {
        const query = 'UPDATE posts_foro SET titulo=?, contenido=?, autor_alias=?, vistas=?, cerrado=? where id = ?';
        const [result] = await db.query(query, [titulo, contenido, autor_alias, vistas ?? 0, cerrado ?? false, id]);
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
        const query = 'DELETE FROM posts_foro WHERE id = ?';
        const [result] = await db.query(query, [id]);
        res.status(201).json({
            mensaje: 'Post eliminado con éxito' 
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al guardar en la base de datos' });
    }
}

module.exports = { getAll, getById, create, update, remove };