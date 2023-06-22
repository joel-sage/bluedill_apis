const { db_con } = require('../hooks/mysqlDB');

const putSettings = async (req, res) => {
    // THIS IS THE BODY OF THE SETTINGS
    const body = req.body; 

    // THIS IS DATA RESTRUCTORING FOR THE SETTINGS SENT IN
    const status = JSON.stringify(body.currentStatus);
    const comments = body.comments;
    const documentID = body.documentID;
    const autoResend = body.autoResend; 
    const deliveryDate = body.deliveryDate; 
    const deliveryTime = body.deliveryTime;
    const documentRevisionNumber = JSON.stringify(body.documentRevisionNumber);
    const contractStart = body.contractStart;
    const contractEnd = body.contractEnd;
    const contractType = body.contractType;
    const name = body.name;
    const coSigned = body.coSigned;
    const recipient = JSON.stringify(body.recipient);
    
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
 
module.exports = {
    putSettings,
    getSettings
}