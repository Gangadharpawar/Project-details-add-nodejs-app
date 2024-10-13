import { getDB } from "./config.js";
import { ObjectId } from "mongodb";
import { projectSchema } from "./ProjectScheme.js";
export const CreateProjects = async (data) => {
  const addprojects = {
    projectname: data.projectname,
    resone: data.resone,
    type: data.type,
    division: data.division,
    category: data.category,
    priority: data.priority,
    department: data.department,
    pstartdate: data.pstartdate,
    penddate: data.penddate,
    Location: data.location,
    Status: data.status,
  };
  console.log("addprojects", addprojects);
  const db = getDB();
  const result = await db.collection("project_details").insertOne(addprojects);
  
  console.log("result", result);
};
export const Updatecurrentstatus = async (userId, status) => {
  const db = getDB();
  const objectId = new ObjectId(userId);
  const result = await db
    .collection("project_details")
    .updateOne({ _id: objectId }, { $set: { Status: status } });
  console.log("result", result);
};
export const GetProjects = async () => {
  try {
    const db = getDB();
    const result = await db.collection("project_details").find({}).toArray();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const GetprojecttotalCounts = async () => {
  try {
    const db = getDB();
    const collection = await db.collection("project_details");
    const totalCount = await collection.countDocuments();
    const runningCount = await collection.countDocuments({ Status: "Running" });
    const closedCount = await collection.countDocuments({ Status: "Closed" });
    const cancelledCount = await collection.countDocuments({
      Status: "Cancelled",
    });
    const runningAndEndDateCount = await collection.countDocuments({
      Status: "Running",
      pstartdate: { $lte: new Date() },
    });
    return {
      totalCount,
      runningCount,
      closedCount,
      cancelledCount,
      runningAndEndDateCount,
    };
  } catch (error) {
    console.log("error", error);
  }
};

export const DepartmentwiseCounts = async () => {
  const db = getDB();
  const collection = await db.collection("project_details");
  const totalCount = await collection.countDocuments();
  const totalstrcount = await collection.countDocuments({
    department: "Strategy",
  });
  const totalstrclose = await collection.countDocuments({
    department: "Strategy",
    Status: "Closed",
  });
  const totalfincount = await collection.countDocuments({
    department: "Finance",
  });
  const totalfinclose = await collection.countDocuments({
    department: "Finance",
    Status: "Closed",
  });
  const totalqulitycount = await collection.countDocuments({
    department: "Quality",
  });
  const totalqulityclose = await collection.countDocuments({
    department: "Quality",
    Status: "Closed",
  });

  const totalmaintancount = await collection.countDocuments({
    department: "Maintenance",
  });
  const totalmaintanclose = await collection.countDocuments({
    department: "Maintenance",
    Status: "Closed",
  });

  const totalHRcount = await collection.countDocuments({
    department: "HR",
  });
  const totalHRclose = await collection.countDocuments({
    department: "HR",
    Status: "Closed",
  });
  return {
    totalCount,
    totalstrcount,
    totalstrclose,
    totalfincount,
    totalfinclose,
    totalqulitycount,
    totalqulityclose,
    totalmaintancount,
    totalmaintanclose,
    totalHRcount,
    totalHRclose,
  };
};
