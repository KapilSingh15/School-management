const db = require("../../model");
const { Op } = require("sequelize");
const Helper = require("../../config/helper");

class AreaMasterService {
    
    // Create a new area
    async createArea(data) {
        try {
            const area = await db.AreaMaster.create({
                BranchID: data.BranchID,
                AreaName: data.AreaName,
                StatusID: data.StatusID
            });
            return area;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create area: " + error);
        }
    }

    // Update an existing area by AreaID
    async updateArea(areaId, data) {
        try {
            const updatedArea = await db.AreaMaster.update({
                BranchID: data.BranchID,
                AreaName: data.AreaName,
                StatusID: data.StatusID
            }, {
                where: {
                    AreaID: areaId
                }
            });

            if (updatedArea[0] === 0) {
                throw new Error("Area not found or no changes made");
            }

            return "Area updated successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update area: " + error);
        }
    }

    // Delete an area by AreaID
    async deleteArea(areaId) {
        try {
            const deleted = await db.AreaMaster.destroy({
                where: {
                    AreaID: areaId
                }
            });

            if (deleted === 0) {
                throw new Error("Area not found");
            }

            return "Area deleted successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete area: " + error);
        }
    }

    // Fetch areas with optional search, sorting, and pagination
    async fetchAreas(query) {
        const { searchBy, searchValue, status, sortby, sortCode, page, limit } = query;

        try {
            let where = {};
            
            // Calculate offset using Helper.getPageNumber
            const offset = Helper.getPageNumber(page, limit);
            
            // Search functionality
            if (searchBy && searchValue) {
                where[searchBy] = { [Op.like]: `%${searchValue}%` };
            }

            // Status filter
            if (status) {
                where.StatusID = { [Op.eq]: status };
            }

            // Sorting settings
            const order = sortby && sortCode ? [[sortby, sortCode]] : [["AreaID", "ASC"]];

            // Fetch data with pagination, search, and sorting
            const { count, rows } = await db.AreaMaster.findAndCountAll({
                where,
                offset,
                limit: parseInt(limit) || Helper.getPageNumber(1, limit), // Default limit if undefined
                order
            });

            return {
                data: {
                    pagination: {
                        currentPage: parseInt(page),
                        pageSize: parseInt(limit) || Helper.getPageNumber(1, limit),
                        totalPages: Math.ceil(count / (parseInt(limit) || Helper.getPageNumber(1, limit))),
                        totalResults: count,
                    },
                    data: rows,
                },
            };
        } catch (error) {
            console.error(error);
            throw new Error("Failed to retrieve areas");
        }
    }
}

module.exports = AreaMasterService;
