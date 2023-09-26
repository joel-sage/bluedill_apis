const { db_con } = require('../hooks/mysqlDB')
const { currentDate } = require('../hooks/useCurrentDate');
// prisma config import
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();


const message = async (req, res) => {
    const { sender_id, receiver_id, message } = req.body;

    try {
        const person = await prisma.user.findUnique({
            where: {
                id: Number(sender_id)
            }
        })
        // console.log(person)
        // return;
        const send_message = await prisma.chat.create({
            data: {
                user: {
                    connect: { id: person.id },
                },
                message: message,
                receiverUserId: Number(receiver_id),
                status: false
            }
        })

        res.status(200).json({
            "message": "Message Sent",
            send_message
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
    const { userId } = req.body;
    // try {

        const sentToUsers = await prisma.chat.findMany({
            where: {
                senderUserId: userId,
            },
            distinct: ['receiverUserId'],
        }).then((result) => result.map((chat) => chat.receiverUserId));

        const receivedFromUsers = await prisma.chat.findMany({
            where: {
                receiverUserId: userId,
            },
            distinct: ['senderUserId'],
        }).then((result) => result.map((chat) => chat.senderUserId));

        const allUsersId = [...new Set([...sentToUsers, ...receivedFromUsers])];

        const users = await prisma.user.findMany({
            where: {
                id: {
                    in: allUsersId,
                },
            },
            select: {
                userId: true,
                email: true,
                firstname: true,
                lastname: true,
                company: true
            }
        });
    
        res.status(200).json({
            users
        })

        // async function getLastMessage(uId, ursId) {
        //     // console.log(uId, ursId);
        //     // return
        //     try {
        //         const lastMessage = await prisma.chat.findFirst({
        //             where: {
        //                 receiverUserId: uId,
        //                 senderUserId: {
        //                     in: ursId,
        //                 },
        //             },
        //             orderBy: {
        //                 createdAt: 'desc',
        //             },
        //         });
        //         return lastMessage;
        //     } catch (error) {
        //         console.error('Error fetching last message:', error);
        //         throw error;
        //     }
        // }

        // getLastMessage(userId, allUsersId).then((lastMessage) => {
        //     res.status(200).json({ "Recent": lastMessage })
        // }).catch((error) => {
        //     res.status(200).json({ "ERROR": error })
        // });


    // } catch (error) {
    //     res.status(500).json({ "AN ERROR OCCURED": error })
    // }
}


const chat = async (req, res) => {
    const { chat_id, receiver_id } = req.body;

    const chat = await prisma.chat.findMany({
        where: {
            OR: [
                { senderUserId: chat_id, receiverUserId: receiver_id },
                { senderUserId: receiver_id, receiverUserId: chat_id }
            ]

        },
        select: {
            message: true,
            createdAt: true,
            id: true
        }
    })
    res.status(200).json({ "chat": chat })
}

const updateMessageStatus = async (req, res) => {
    const { message_id, view_id } = req.body;
    // UPDATING MESSAGE AND SETTING AN OPENED MESSAGE AS SEEN WHEN A USER OPENS THE CHAT
    try {
        const seen = await prisma.chats.update({
            where: {
                id: message_id,
                receiver_user_id: view_id
            },
            data: {
                status: true
            }
        })
        res.status(200).json({ "Info": "This chat is marked seen" })
    } catch (error) {
        res.status(200).json({ "Error": "Could not mark chat as seen" })
    }
}

module.exports = {
    message,
    chats,
    chat,
    updateMessageStatus,
} 