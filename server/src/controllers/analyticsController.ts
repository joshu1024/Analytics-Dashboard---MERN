import { Request,Response } from "express";
import Transaction from"../models/Transaction";
import User from"../models/userModel";
import Event from"../models/Event";


interface QueryParams{
  type?:string,
  page?:string,
  limit?:string
}
export const getKPIs = async (req:Request, res:Response):Promise<void> => {
  try {
    const totalUsers = await User.countDocuments();

    const retainedUsers = await User.countDocuments({
      lastLogin: { $exists: true },
    });
    const retention =
      totalUsers === 0 ? 0 : Math.round((retainedUsers / totalUsers) * 100);

    const churn = 100 - retention; // percentage of users lost
    // arpu = totalrev/totalusers,
    const revenueAggregate = await Transaction.aggregate([
      { $match: { status: "success" } },
      { $group: { _id: null, totalRevenue: { $sum: "$amount" } } },
    ]);
    const totalRevenue = revenueAggregate[0]?.totalRevenue || 0;

    const arpu =
      totalUsers === 0 ? 0 : Number((totalRevenue / totalUsers).toFixed(2));
    res.json({
      totalUsers,
      churn,
      retention,
      arpu,
    });
  } catch (err:unknown) {
    const message = err instanceof Error ? err.message :"Internal server error"
   res.status(500).json({ message });
  }
};

export const getSignupsByCountry = async (req:Request, res:Response):Promise<void> => {
  try {
    const data2 = await User.aggregate<{_id:string,count:number}>([
    { $group: { _id: "$country", count: { $sum: 1 } } },
  ]);
  res.json(data2);
  } catch (err:unknown) {
    const message = err instanceof Error ? err.message :"Internal server error"
   res.status(500).json({ message });
  }
};

export const getRetentionCurve = async (req:Request, res:Response):Promise<void> => {
try {
    const retention:{day:number,value:number}[] = [];

  const totalUsers = await User.countDocuments();
  if (!totalUsers) {
     res.json([]) ;
     return;
     }
  for (let day = 0; day <= 30; day++) {
    const cutoff = new Date(Date.now() - day * 24 * 60 * 60 * 1000);

    const activeUsers = await User.countDocuments({
      lastLogin: { $gte: cutoff },
    });

    retention.push({
      day,
      value: Math.round((activeUsers / totalUsers) * 100),
    });
  }

  res.json(retention);
} catch (err:unknown) {
  const message = err instanceof Error ? err.message :"Internal server error"
   res.status(500).json({ message });
}
};

export const getUserDemographics = async (req:Request, res:Response):Promise<void> =>  {
  try {
    const result = await User.aggregate<{_id:string,count:number}>([
      {
        $group: { _id: "$gender", count: { $sum: 1 } },
      },
    ]);
    const formatted = result.map((d) => ({
      name: d._id || "Other",
      value: d.count,
    }));
    res.json(formatted);
  } catch (err:unknown) {
    const message = err instanceof Error ? err.message :"Internal server error"
   res.status(500).json({ message });
    
  }
};
export const getRecentEvents = async (req:Request<{},{},{},QueryParams>, res:Response):Promise<void> => {
  try {
    const type = req.query.type;
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 10);
    const skip = Number(page - 1) * limit;
   
    const query: { type?: string } = type ? { type } : {};
    

    const events = await Event.find(query)
      .populate({
        path: "user",
        select: "fullName email",
        options: { strictPopulate: false },
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
        res.json(events);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to fetch recent events"
     res.status(500).json({ message });
  }
};

