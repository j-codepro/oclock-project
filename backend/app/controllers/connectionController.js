const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser');

const { User } = require("../models");

const jsonwebtoken = require('jsonwebtoken');

const connectionController = {
    getUser: async (req, res) => {
        const data = req.body;
        console.log(data.email);
        const result = await User.findOne({
            where: {
                email: data.email,
            },
        });

        // Test pour voir si l'email est valide
        if (result === null) {
            res.status(400).json({
                error: "Votre adresse mail n'est pas valide",
            });
        }
        // Test pour voir si le mot de passe est correct
        else {
            // on compare le mot de passe en clair et le mot de passe hachée de la BDD
            // true ou false
            validPwd = bcrypt.compareSync(data.password, result.password);
            if (!validPwd) {
                res.status(400).json({
                    error: "Le mot de passe est incorrect",
                });
            } else {

                const jwtSecret = process.env.JWT_SECRET;
                const jwtContent = { userId: result.id };
                const jwtOptions = {
                    algorithm: 'HS256',
                    expiresIn: '3h'
                };
                const token = jsonwebtoken.sign(jwtContent, jwtSecret, jwtOptions);
                res.cookie('token', token, {httpOnly: true});

                res.json({
                    id: `${result.id}`,
                    firsname: `${result.firstname}`,
                    lastname: `${result.lastname}`,
                    pseudo: `${result.pseudo}`,
                    points: `${result.reward_count}`,
                });
            }
        }
    },
};

module.exports = connectionController;
