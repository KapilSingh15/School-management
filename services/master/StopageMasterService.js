const db = require("../../model");
const { Op } = require("sequelize");
const Helper = require("../../config/helper");

class StopageMasterService {

    // Create a new Stopage record
    async createStopage(data) {
        try {
            const stopage = await db.StopageMaster.create({
                RouteID: data.RouteID,  // Foreign key reference to Route
                Stopage: data.Stopage,  // Name of the stopage
                StatusID: data.StatusID,  // Status of the stopage
            });
            return stopage;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create stopage record: " + error);
        }
    }

    // Update an existing Stopage record by StopageID
    async updateStopage(stopageId, data) {
        try {
            const updatedStopage = await db.StopageMaster.update({
                RouteID: data.RouteID,  // Foreign key reference to Route
                Stopage: data.Stopage,  // Name of the stopage
                StatusID: data.StatusID,  // Status of the stopage
            }, {
                where: { StopageID: stopageId }
            });

            if (updatedStopage[0] === 0) {
                throw new Error("Stopage record not found or no changes made");
            }

            return "Stopage record updated successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update stopage record: " + error);
        }
    }

    // Delete a Stopage record by StopageID
    async deleteStopage(stopageId) {
        try {
            const deleted = await db.StopageMaster.destroy({
                where: { StopageID: stopageId }
            });

            if (deleted === 0) {
                throw new Error("Stopage record not found");
            }

            return "Stopage record deleted successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete stopage record: " + error);
        }
    }

    // Fetch Stopage records with optional search, sorting, and pagination
    async fetchStopages(query) {
        const { searchBy, searchValue, sortby, sortCode, page, limit } = query;

        try {
            let where = {};
            const offset = Helper.getPageNumber(page, limit);

            // Search functionality
            if (searchBy && searchValue) {
                where[searchBy] = { [Op.like]: `%${searchValue}%` };
            }

            // Sorting settings
            const order = sortby && sortCode ? [[sortby, sortCode]] : [["StopageID", "ASC"]];

            // Fetch data with pagination, search, and sorting
            const { count, rows } = await db.StopageMaster.findAndCountAll({
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
            throw new Error("Failed to retrieve stopage records");
        }
    }
}

module.exports = StopageMasterService;
