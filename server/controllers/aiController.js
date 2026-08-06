const {
  extractTaskDetails,
} = require("../services/geminiService");

exports.extractTask = async (req, res) => {
  try {
    const { text } = req.body;

    const task = await extractTaskDetails(text);

    res.json(task);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "AI failed",
    });
  }
};