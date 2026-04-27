import dotenv from "dotenv"
dotenv.config()
import mongoose from "mongoose";
import Company from "./models/Company"; // adjust path

const seedCompanies = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL!);

    await Company.deleteMany();

    await Company.insertMany([
  { "name": "TechNova Solutions", "industry": "Technology", "status": "Active", "plan": "Premium" },
  { "name": "GreenHarvest Ltd", "industry": "Agriculture", "status": "Active", "plan": "Basic" },
  { "name": "FinEdge Capital", "industry": "Finance", "status": "Pending", "plan": "Enterprise" },
  { "name": "MediCare Plus", "industry": "Healthcare", "status": "Active", "plan": "Premium" },
  { "name": "EduSmart Hub", "industry": "Education", "status": "Inactive", "plan": "Basic" },
  { "name": "UrbanMove Logistics", "industry": "Logistics", "status": "Active", "plan": "Enterprise" },
  { "name": "RetailSphere", "industry": "Retail", "status": "Pending", "plan": "Basic" },
  { "name": "BuildCraft Engineering", "industry": "Construction", "status": "Active", "plan": "Premium" },
  { "name": "Foodies Delight", "industry": "Hospitality", "status": "Inactive", "plan": "Basic" },
  { "name": "SecureNet Systems", "industry": "Cybersecurity", "status": "Active", "plan": "Enterprise" },

  { "name": "BlueWave Tech", "industry": "Technology", "status": "Active", "plan": "Basic" },
  { "name": "AgroLink Farms", "industry": "Agriculture", "status": "Pending", "plan": "Basic" },
  { "name": "PrimeTrust Finance", "industry": "Finance", "status": "Active", "plan": "Premium" },
  { "name": "HealthBridge Clinic", "industry": "Healthcare", "status": "Active", "plan": "Basic" },
  { "name": "BrightFuture Academy", "industry": "Education", "status": "Pending", "plan": "Basic" },
  { "name": "SwiftCargo Ltd", "industry": "Logistics", "status": "Active", "plan": "Premium" },
  { "name": "MegaMart Stores", "industry": "Retail", "status": "Inactive", "plan": "Basic" },
  { "name": "Skyline Builders", "industry": "Construction", "status": "Active", "plan": "Enterprise" },
  { "name": "TasteBuds Kitchen", "industry": "Hospitality", "status": "Active", "plan": "Premium" },
  { "name": "CyberShield Ltd", "industry": "Cybersecurity", "status": "Pending", "plan": "Enterprise" },

  { "name": "NextGen Innovations", "industry": "Technology", "status": "Active", "plan": "Enterprise" },
  { "name": "FarmFresh Produce", "industry": "Agriculture", "status": "Active", "plan": "Basic" },
  { "name": "CapitalCore Bank", "industry": "Finance", "status": "Inactive", "plan": "Premium" },
  { "name": "WellLife Hospital", "industry": "Healthcare", "status": "Active", "plan": "Enterprise" },
  { "name": "LearnSphere", "industry": "Education", "status": "Active", "plan": "Premium" },
  { "name": "FastTrack Logistics", "industry": "Logistics", "status": "Pending", "plan": "Basic" },
  { "name": "ShopEase Ltd", "industry": "Retail", "status": "Active", "plan": "Premium" },
  { "name": "UrbanBuild Co.", "industry": "Construction", "status": "Active", "plan": "Basic" },
  { "name": "Gourmet Haven", "industry": "Hospitality", "status": "Inactive", "plan": "Basic" },
  { "name": "DataSecure Inc", "industry": "Cybersecurity", "status": "Active", "plan": "Enterprise" },

  { "name": "CodeCraft Labs", "industry": "Technology", "status": "Pending", "plan": "Basic" },
  { "name": "HarvestKing Farms", "industry": "Agriculture", "status": "Active", "plan": "Premium" },
  { "name": "TrustLine Finance", "industry": "Finance", "status": "Active", "plan": "Basic" },
  { "name": "CarePoint Clinic", "industry": "Healthcare", "status": "Pending", "plan": "Basic" },
  { "name": "EduPro Institute", "industry": "Education", "status": "Active", "plan": "Enterprise" },
  { "name": "LogiPro Movers", "industry": "Logistics", "status": "Inactive", "plan": "Basic" },
  { "name": "QuickCart Retail", "industry": "Retail", "status": "Active", "plan": "Premium" },
  { "name": "SolidBuild Ltd", "industry": "Construction", "status": "Active", "plan": "Enterprise" },
  { "name": "SpiceRoute Foods", "industry": "Hospitality", "status": "Pending", "plan": "Basic" },
  { "name": "SafeGuard Cyber", "industry": "Cybersecurity", "status": "Active", "plan": "Premium" },

  { "name": "InnoTech Systems", "industry": "Technology", "status": "Active", "plan": "Basic" },
  { "name": "GreenFields Ltd", "industry": "Agriculture", "status": "Inactive", "plan": "Basic" },
  { "name": "MoneyWise Ltd", "industry": "Finance", "status": "Active", "plan": "Enterprise" },
  { "name": "LifeCare Hospital", "industry": "Healthcare", "status": "Pending", "plan": "Premium" },
  { "name": "SkillUp Academy", "industry": "Education", "status": "Active", "plan": "Basic" },
  { "name": "TransGlobal Logistics", "industry": "Logistics", "status": "Active", "plan": "Premium" },
  { "name": "CityMart Stores", "industry": "Retail", "status": "Pending", "plan": "Basic" },
  { "name": "BuildRight Co.", "industry": "Construction", "status": "Active", "plan": "Premium" },
  { "name": "FineDine Group", "industry": "Hospitality", "status": "Active", "plan": "Enterprise" },
  { "name": "CyberCore Ltd", "industry": "Cybersecurity", "status": "Inactive", "plan": "Basic" },

  { "name": "DevSolutions Ltd", "industry": "Technology", "status": "Active", "plan": "Enterprise" },
  { "name": "AgriGrow Ltd", "industry": "Agriculture", "status": "Pending", "plan": "Basic" },
  { "name": "SecureFunds Bank", "industry": "Finance", "status": "Active", "plan": "Premium" },
  { "name": "MediLink Hospital", "industry": "Healthcare", "status": "Active", "plan": "Basic" },
  { "name": "FutureLeaders School", "industry": "Education", "status": "Inactive", "plan": "Basic" },
  { "name": "CargoLink Ltd", "industry": "Logistics", "status": "Active", "plan": "Enterprise" },
  { "name": "RetailHub Ltd", "industry": "Retail", "status": "Active", "plan": "Premium" },
  { "name": "ConstructPro Ltd", "industry": "Construction", "status": "Pending", "plan": "Basic" },
  { "name": "Delish Foods", "industry": "Hospitality", "status": "Active", "plan": "Premium" },
  { "name": "CyberMatrix Ltd", "industry": "Cybersecurity", "status": "Active", "plan": "Enterprise" },

  { "name": "AlphaTech Ltd", "industry": "Technology", "status": "Pending", "plan": "Basic" },
  { "name": "AgroMax Farms", "industry": "Agriculture", "status": "Active", "plan": "Enterprise" },
  { "name": "FinanceHub Ltd", "industry": "Finance", "status": "Active", "plan": "Basic" },
  { "name": "HealthFirst Clinic", "industry": "Healthcare", "status": "Inactive", "plan": "Basic" },
  { "name": "EduWorld Ltd", "industry": "Education", "status": "Active", "plan": "Premium" },
  { "name": "MoveFast Logistics", "industry": "Logistics", "status": "Pending", "plan": "Basic" },
  { "name": "ShopSmart Ltd", "industry": "Retail", "status": "Active", "plan": "Enterprise" },
  { "name": "MegaBuild Ltd", "industry": "Construction", "status": "Active", "plan": "Premium" },
  { "name": "TastyBite Ltd", "industry": "Hospitality", "status": "Inactive", "plan": "Basic" },
  { "name": "SecureTech Ltd", "industry": "Cybersecurity", "status": "Active", "plan": "Premium" },

  { "name": "BrightCode Ltd", "industry": "Technology", "status": "Active", "plan": "Basic" },
  { "name": "FarmLink Ltd", "industry": "Agriculture", "status": "Active", "plan": "Premium" },
  { "name": "CapitalTrust Ltd", "industry": "Finance", "status": "Pending", "plan": "Basic" },
  { "name": "WellnessCare Ltd", "industry": "Healthcare", "status": "Active", "plan": "Enterprise" },
  { "name": "SmartEdu Ltd", "industry": "Education", "status": "Active", "plan": "Basic" },
  { "name": "QuickMove Ltd", "industry": "Logistics", "status": "Inactive", "plan": "Basic" },
  { "name": "RetailZone Ltd", "industry": "Retail", "status": "Active", "plan": "Premium" },
  { "name": "BuildMasters Ltd", "industry": "Construction", "status": "Pending", "plan": "Basic" },
  { "name": "FoodCourt Ltd", "industry": "Hospitality", "status": "Active", "plan": "Enterprise" },
  { "name": "CyberWorks Ltd", "industry": "Cybersecurity", "status": "Active", "plan": "Basic" }
]);

    console.log("✅ Companies seeded successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedCompanies();