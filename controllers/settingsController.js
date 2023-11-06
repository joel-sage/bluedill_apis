const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

const putSettings = async (req, res) => {
    // THIS IS THE BODY OF THE SETTINGS
    const {
        status,
        comments,
        documentID,
        autoResend,
        deliveryDate,
        deliveryTime,
        documentRevisionNumber,
        contractStart,
        contractEnd,
        contractType,
        name,
        coSigned,
        recipient
    } = req.body;

    // THIS IS DATA RESTRUCTORING FOR THE SETTINGS SENT IN
    db_con.query(`UPDATE ${`settings`} SET ${`status`}='${status}',${`comment`}='${comments}',${`document_id`}='${documentID}',${`auto_resend_doc`}='${autoResend}',${`delivery_date`}='${deliveryDate}',${`delivery_time`}='${deliveryTime}',${`document_revision_number`}='${documentRevisionNumber}',${`contract_start`}='${contractStart}',${`contract_end`}='${contractEnd}',${`contract_type`}='${contractType}',${`name`}='${name}',${`co_signed`}='${coSigned}',${`recipient`}='${recipient}' WHERE ${`id`} = 1`, (err, success) => {
        if (err) throw err;
        res.status(200).json({ "message": "settings updated" });
    })
}

const getSettings = async (req, res) => {
    db_con.query(`SELECT * FROM ${`settings`}`, (err, successSettings) => {
        if (err) throw err;
        res.status(200).json(successSettings);
    })
}

const updatePassword = async (req, res) => {
    const { email } = req.body;
    
    const mailAuth = await prisma.user.findUnique({
        where: {
            email: email
        },
        select: {
            email: true,
            userId: true,
            password: true
        }
    })

}

module.exports = {
    putSettings,
    getSettings,
    updatePassword

}