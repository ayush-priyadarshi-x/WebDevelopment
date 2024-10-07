/* ============================== Importing Dependencies ============================= */

const express = require("express");
/* ============================ End Importing Dependencies =========================== */

/* ==================================== Actual Code ================================== */

const router = express.Router();
router.get("/", (req, res) => {
  res.render("welcome");
});
// router.get('/', (req, res)=>{
//     res.render('welcome')
// })
/* ================================= End Actual Code ================================= */

module.exports = router;
