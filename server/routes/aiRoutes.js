const router = require("express").Router();

const {
  extractTask,
} = require("../controllers/aiController");

router.post("/extract-task", extractTask);

module.exports = router;