const { Router } = require("express");

const router = Router();

router.use("/products", require("./products.routes"));

module.exports = router;
