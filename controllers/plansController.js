const { db_con } = require("../hooks/mysqlDB");
const { currentDate: date_created } = require("../hooks/useCurrentDate");

const getAllPlans = async (req, res) => {
    db_con.query(`SELECT * FROM ${`plans`}, ${`plans_desc`} WHERE ${`plans`}.${`id`} = ${`plans_desc`}.${`plan_id`}`, (err, data) => {
        if (err) throw err;
        res.status(200).json({ data })
    })
}

// SET ANY PLAN DESCIPTION DESCRIPTION
const setPlanDescription = async (req, res) => {
    const { planID, description } = req.body; 
    db_con.query(`UPDATE ${`plans_desc`} SET ${`description`}='${JSON.stringify(description)}' WHERE ${`plan_id`} = '${planID}'` , (err, success) => {
        if (err) throw err;
        res.status(201).json({"message": "Plan description Set"})
    })
}


module.exports = {
    getAllPlans,
    setPlanDescription
};
