const Dev = require('../models/Dev');

module.exports = {
    async store(req, res) {
        const { user } = req.headers; // quem deu o like
        const { devId } = req.params; // quem recebeu o like

        const loggedDev = await Dev.findById(user); // loggedDev guarda todas as infos deste usuario
        const targetdDev = await Dev.findById(devId);

        if (!targetdDev) {
            return res.status(400).json({ error: 'Dev not exists' });
        }

        loggedDev.dislikes.push(targetdDev._id); // s'o fazer isso nao modifica a base de dados, tem q usar o save()

        await loggedDev.save()

        return res.json(loggedDev)
    }
};