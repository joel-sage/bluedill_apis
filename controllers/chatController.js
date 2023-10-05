const { db_con } = require('../hooks/mysqlDB')
const { currentDate } = require('../hooks/useCurrentDate');
// prisma config import
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
let clients = [];

const IO = (io) => {
    io.on('connection', (socket) => {
        // ASIGN AN ID BASED ON THE USER THAT IS CONNECTED
        socket.emit('welcome', 'SOCK_ID: ' + socket.id);
        socket.on('connected', (user_id) => {
            clients.push(
                {
                    userID: user_id,
                    sockID: socket.id,
                }
            )
            // console.log(clients);
            if (clients.length > 0) {
                socket.broadcast.emit('connected', 'USER ' + clients.at(-1).userID + ' JOINED');
            }
        })

        // Handle events from the client
        socket.on('message', async (message, s_ID, r_ID, cb) => {
            try {
                const person = await prisma.user.findUnique({
                    where: {
                        id: Number(s_ID)
                    }
                })
                
                const send_message = await prisma.chat.create({
                    data: {
                        user: {
                            connect: { id: person.id },
                        },
                        message: message,
                        receiverUserId: Number(r_ID),
                        status: false
                    }
                })

                cb('MESSAGE SENT');
            } catch (error) {
                console.log(error)
                cb('AN ERROR OCCURED');
            } finally {
                prisma.$disconnect()
            }

            clients.forEach((client, id) => {
                const { userID, sockID } = client;

                if (r_ID == userID) {
                    // console.clear()
                    // console.log(`User:${userID} with sockID:${sockID} To message`);
                    io.to(sockID).emit('sendback', socket.id + " said: " + message);
                }
            })
        });

        socket.on('chat', async (s_ID, r_ID, cb) => {
            try {
                const chat = await prisma.chat.findMany({
                    where: {
                        OR: [
                            { senderUserId: s_ID, receiverUserId: r_ID },
                            { senderUserId: r_ID, receiverUserId: s_ID }
                        ]
                    },
                    select: {
                        message: true,
                        createdAt: true,
                        id: true
                    }
                })
                cb(chat);
            } catch (error) {
                cb('An Error Occured' + error);
            } finally { 
                prisma.$disconnect()
            }
        })

        socket.on('chats', async (userId, cb) => {
            try {
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

                cb(users);
            } catch (error) {
                cb('AN ERROR OCCURED' + error)
            }
        })

        socket.on('read-message', async (messages_ids, view_id, cb) => {
            try {
                const seen = await prisma.chat.update({
                    where: {
                        id: {
                            in: messages_ids,  // Array of IDs to match
                        },
                        // Additional condition for a specific ID
                        AND: {
                            receiverUserId: view_id,  // Single ID to match
                        },
                    },
                    data: {
                        status: true
                    }
                })
                cb("Info: This chat is marked seen");
            } catch (error) {
                cb("Error: Could not mark chat as seen")
            }
        })
        // Handle disconnection
        socket.on('disconnect', (cb) => {

            clients.forEach((client, id) => {
                const { userID, sockID } = client;

                if (sockID == socket.id) {
                    clients.splice(id, 1)
                    // console.log(`User:${userID} with sockID:${sockID} Disconnected`);
                    socket.broadcast.emit('disconnected', userID + ' IS WENT OFFLINE');
                    // console.clear()
                    // console.log(clients)
                }
            })
        });

    });
}

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
    try {

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

    } catch (error) {
        res.status(500).json({ "AN ERROR OCCURED": error })
    }
}

const chat = async (req, res) => {
    const { chat_id, receiver_id } = req.body;
    try { 
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
    } catch (error) {
        res.status(400).json({ "Message": "An Error Occured" })
    }
}

const updateMessageStatus = async (req, res) => {
    const { messages_ids, view_id } = req.body;
    // UPDATING MESSAGE AND SETTING AN OPENED MESSAGE AS SEEN WHEN A USER OPENS THE CHAT
    try {
        const seen = await prisma.chat.update({
            where: {
                id: {
                    in: messages_ids,  // Array of IDs to match
                },
                // Additional condition for a specific ID
                AND: {
                    receiverUserId: view_id,  // Single ID to match
                },
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
    IO
} 