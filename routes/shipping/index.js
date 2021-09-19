const router = require("express").Router();

router.get("/", require("./controller").getAll);
router.get("/:shiipId", require("./controller").getByShiipId);
router.post("/", require("./controller").addOne);
router.put("/submit", require("./controller").submit);
router.put("/verify", require("./controller").verify);


module.exports = router;
