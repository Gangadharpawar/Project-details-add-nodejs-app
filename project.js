import {
  CreateProjects,
  GetProjects,
  Updatecurrentstatus,
  GetprojecttotalCounts,
  DepartmentwiseCounts,
} from "./db/mongo/projectmongo.js";

export const createproject = async (req, res, next) => {
  const { data } = req.body;
  try {
    await CreateProjects(req.body);
    res
      .status(201)
      .json({ message: "Project created successfully", data: req.body });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error: Could not create record" });
    next(error);
  }
};
export const Updatestatus = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { status } = req.body;
    await Updatecurrentstatus(userId, status);
    // console.log("rescored udpated=", userId, status);
    res.status(200).json({ message: "Status Updated Successfully" });
  } catch (error) {
    console.error("Error updating status:", error);
    res
      .status(500)
      .json({ error: "Internal server error:Could not update record" });
  }
};
export const getproject = async (req, res, next) => {
  try {
    const getprojectres = await GetProjects();
    // console.log(getprojectres);
    res.status(200).json(getprojectres);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Inernal Server Error:Could not fetch record" });
    console.log(error);
    console.log("Failed to featch data from server ");
  }
};

export const getprojectcount = async (req, res, next) => {
  try {
    const getcountresult = await GetprojecttotalCounts();
    res.status(200).json(getcountresult);
    // console.log("Getproject count==", getcountresult);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Inernal Server Error:Could not fetch record" });
    console.log("error", error);
  }
};
export const getdepartmentwisecount = async (req, res, next) => {
  try {
    const getprojectresult = await DepartmentwiseCounts();
    // console.log("Get Department count==", getprojectresult);
    res.status(200).json(getprojectresult);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Inernal Server Error:Could not fetch record" });
    next("error", error);
  }
};
