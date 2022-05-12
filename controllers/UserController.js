const connection = require('../database/connection');
const responseModel = {
    success: false,
    data: [],
    error: []
}

module.exports = {

    async agendar(req, res) {
        const response = { ...responseModel };

        return res.json(response);
    },

    async totem(req, res) {
        const response = { ...responseModel };
        const { id } = req.params;

        const [, data] = await connection.query(
            `SELECT nome, permissaoacesso, nomepolo, numeropolo, a1pj_12m, a3pj_36m, a1pf_12m, a3pf_36m, bairro FROM AGRV WHERE numeropolo = '${id}'`
        )
        response.success = data.length > 0;

        return res.json(response);
    }
}