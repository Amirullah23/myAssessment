const router = require("express").Router();

router.get("/", require("./controller").getAll);
router.get("/one", require("./controller").getOne);
router.post("/", require("./controller").addOne);

module.exports = router;
