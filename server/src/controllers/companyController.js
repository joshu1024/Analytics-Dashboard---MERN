const Company = require("../models/Company");
const getCompanies = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const total = await Company.countDocuments();
    const companies = await Company.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    res.json({ companies, page, total, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
const createCompany = async (req, res) => {
  try {
    const company = await Company.create(req.body);
    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = {
  getCompanies,
  createCompany,
};
