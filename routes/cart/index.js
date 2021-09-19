const router = require("express").Router();

router.get("/", require("./controller").getAll);
router.post("/", require("./controller").addOne);
router.put("/pay", require("./controller").pay);

module.exports = router;
