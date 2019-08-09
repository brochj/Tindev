const Dev = require('../models/Dev');

module.exports = {
    async store(req, res) {
        // console.log(req.io); //ok
        // console.log(req.connectedUsers); //ok

        const { user } = req.headers; // quem deu o like
        const { devId } = req.params; // quem recebeu o like

        const loggedDev = await Dev.findById(user); // loggedDev guarda todas as infos deste usuario
        const targetdDev = await Dev.findById(devId);

        if (!targetdDev) {
            return res.status(400).json({ error: 'Dev not exists' });
        }

        if (targetdDev.likes.includes(loggedDev._id)) {
            console.log('Deu match');
            const loggedSocket = req.connectedUsers[user]; //socket do usuario logado
            const targetSocket = req.connectedUsers[devId]; //socket do usuario logado

            console.log('loggedSocket  : ', loggedSocket, 'from LikeController.js');
            console.log('targetSocket  : ', targetSocket, 'from LikeController.js');

            //Avisando as duas pessoas
            if (loggedSocket) {
                console.log('from LikeController.js :','Emitindo mensagem de match para o loggedSocket');
                req.io.to(loggedSocket).emit('match', targetdDev)
            }

            if (targetSocket) {
                console.log('from LikeController.js :','Emitindo mensagem para o targetSocket');
                req.io.to(targetSocket).emit('match', loggedDev)
            }


        }

        loggedDev.likes.push(targetdDev._id); // s'o fazer isso nao modifica a base de dados, tem q usar o save()

        await loggedDev.save()

        return res.json(loggedDev)
    }
};