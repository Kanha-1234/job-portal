import { Company } from "../models/company.model.js";

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!company) {
      return res.status(400).json({
        message: "company name is required",
        success: false,
      });
    }

    let company = await Company.findOne({ name: companyName });

    if (company) {
      return res.status(400).json({
        message: "you can't register same company",
        success: false,
      });
    }

    company = await Company.create({
      name: companyName,
      userId: req.id,
    });

    return res.status(201).json({
      message: "comapny registered successfully",
      message: true,
    });
  } catch (err) {
    console.log(err);
  }
};

//get company

export const getCompany = async (req, res) => {
  try {
    const userId = req.id; //logged in user company
    const companies = await Company.find({ userId });

    if (!companies) {
      return res.status(400).json({
        message: "companies not found",
        success: false,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

//get company by id

export const getCompanyByID = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(400).json({
        message: "company not found",
        success: false,
      });
    }
    return res.status(200).json({
      company,
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};

//update company

export const updateComapanyById = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    //const file=req.file;

    const updateData = { name, description, website, location };

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!company) {
      return res.status(404).json({
        message: "company not found",
        success: false,
      });
    }
    return res.status(200).json({
        message: "company info updated",
        success: true,
      });

  } catch (err) {
    console.log(err);
  }
};
