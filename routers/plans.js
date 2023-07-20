const express = require("express");
const router = express.Router();
const { getAllPlans, setPlanDescription } = require("../controllers/plansController");
 const { jwtVerification } = require("../middleware/authUserVerification.js");

// router.route('/plans/yearly').get(getYearly);
// router.route('/plans/monthly').get(getMonthly);
// router.route('/plan/yearly').post(setYearly); 
// router.route('/plan/mothly').post(setMonthly);
// router.route('/plan/setYearlyDesc').post(setYearlyDescription)
// router.route('/plan/setMonthlyDesc').post(setMonthlyDescription)
router.route('/setPlanDesc').post(jwtVerification,setPlanDescription)
router.route('/getPlans').get(jwtVerification,getAllPlans)
module.exports = router;
