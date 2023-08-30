const { db_con } = require('../hooks/mysqlDB')
const { currentDate } = require('../hooks/useCurrentDate');
// prisma config import
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


const message = async (req, res) => {
    const { sender_id, receiver_id, message } = req.body;

    try {
        const send_message = await prisma.chats.create({
            data: {
                message: message,
                sender_user_id: sender_id,
                receiver_user_id: receiver_id,
                status: false,
            }
        })

        res.status(200).json({
            "message": "Message Sent"
        }) 

    } catch (error) { 
        console.log(error)
        res.status(500).json({
            "message": "Could not send Message",
            error
        })
    } finally {
        prisma.$disconnect()
    }
};
 
const chats = async (req, res) => {
    const { chat_id } = req.body;
    // db_con.query(`SELECT message.*, u.first_name, u.last_name FROM chats message
    // INNER JOIN (
    //     SELECT receiver_id, MAX(date) AS max_timestamp
    //     FROM chats
    //     WHERE user_id = ${chat_id}
    //     GROUP BY receiver_id
    // ) subquery
    // ON message.receiver_id = subquery.receiver_id
    // AND message.date = subquery.max_timestamp
    // JOIN users u ON u.id = subquery.receiver_id
    // WHERE message.user_id = ${chat_id}`, (err, success) => {
    //     if (err) throw err;
    //     if (success.length < 1) {
    //         res.status(200).json({ "message": "No chat to display...., chats will appear when yhou make any.." })
    //     } else {
    //         res.status(200).json({ "message": success });
    //     }
    // })
} 

const chat = async (req, res) => {
    const { chat_id, receiver_id } = req.body;
    db_con.query(`SELECT * FROM ${`chats`} WHERE ${`user_id`} = ${chat_id} AND ${`receiver_id`} = ${receiver_id}`, (err, success) => {
        if (err) throw err;
        if (success.length < 1) {
            res.status(200).json({ "Warning": "No chat made with this user" });
        } else {
            res.status(200).json({ "Messages": success });
        }
    })
}

const updateMessageStatus = async (req, res) => {
    const { unread_msg_id, user_id } = req.body;

    db_con.query(`UPDATE chats SET status = 1 WHERE id = ${user_id} AND receiver_id = ${unread_msg_id}`, (err, success) => {
        if (err) throw err;
        res.status(200).json({"Alert": `Messages For User ${unread_msg_id} Has been set to Viewed`, success});
    })
}

module.exports = {
    message,
    chats,
    chat,
    updateMessageStatus,
} 