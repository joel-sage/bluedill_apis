const { db_con } = require('../hooks/mysqlDB')
const { currentDate } = require('../hooks/useCurrentDate')
const addCollaborator = async (req, res) => {
    const { user_id, email, collab_code } = req.body;
    db_con.query(`SELECT * FROM  ${`collaborators`} WHERE ${`email`} = '${email}' AND ${`collab_code`} = '${collab_code}'`, (err, data) => {
        if (err) throw err;
        if (data.length < 1) {
            // WE INSERT ONLY IF THE USER DOESNT EXIST IN ANY COLLABORATION 
            db_con.query(`INSERT INTO ${`collaborators`}(${`id`}, ${`user_id`}, ${`collab_code`}, ${`email`}, ${`date_joined`}, ${`status`}) 
                                                 VALUES ('','${user_id}','${collab_code}','${email}','${currentDate}','0')`, (err, success) => {
                if (err) throw err; 
                res.status(201).json({ "message": "User Join the Collaboration" })
            })
        } else {
            console.log(data);
            res.json({ "Warning": "This User already exist in this collaboration", data });
        }
    })
}

const getCollaborators = (req, res) => {
    const { collab_code } = req.body
    db_con.query(`SELECT * FROM ${`collaborators`} WHERE ${`collab_code`} = '${collab_code}'`, (err, data) => {
        if (err) throw err; 
        res.json({
            data
        })
    })
}



module.exports = {
    addCollaborator,
    getCollaborators
}