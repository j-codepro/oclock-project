const { Activity, Message, User } = require('../models');

const Sequelize = require("sequelize");
const { formatDate } = require('../selectors/formatDate');
const sanitizeHtml = require('sanitize-html');

const messageController = {

    addMessageToActivity: async (req, res) => {
        let activityId = parseInt(req.params.id);
        const { userId, comment } = req.body;
        // nettoie toutes les balises
        const cleanComment = sanitizeHtml(comment, {
            allowedTags: [],
            allowedAttributes: {}
        });

        try {
            const newMessage = await Message.create({
                comment: cleanComment,
                activity_id: activityId,
                user_id: userId,
            });

            if(!newMessage){
                console.trace(error);
                res.status(500).json(error.toString());
            }

            const message = await Message.findOne({
                include: [
                    {
                        association: 'users',
                        attributes: ['id', 'pseudo'],
                    }
                ],
                attributes: ['id','created_at', 'comment', 'activity_id'],
                where: {
                    id: newMessage.id,
                }
            });

            const formatedMessage =  {
                ...message.dataValues,
                created_at: formatDate(message.created_at),
            }
            res.status(201).json(formatedMessage);
            
        } catch (error) {
        console.trace(error);
        res.status(500).json(error.toString());
      }
    },

}

module.exports = messageController;