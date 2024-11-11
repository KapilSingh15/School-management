const db = require("../../model");
const { Op } = require("sequelize");
const Helper = require("../../config/helper");

class StateMasterService {
    
    // Create a new state record
    async createState(data) {
        try {
            const state = await db.StateMaster.create({
                StateName: data.StateName,  // Name of the state
                CountryID: data.CountryID,  // Foreign key reference to Country
                StatusID: data.StatusID     // Foreign key reference to Status
            });
            return state;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create state record: " + error);
        }
    }

    // Update an existing state record by StateID
    async updateState(stateId, data) {
        try {
            const updatedState = await db.StateMaster.update({
                StateName: data.StateName,  // Name of the state
                CountryID: data.CountryID,  // Foreign key reference to Country
                StatusID: data.StatusID     // Foreign key reference to Status
            }, {
                where: { StateID: stateId }
            });

            if (updatedState[0] === 0) {
                throw new Error("State record not found or no changes made");
            }

            return "State record updated successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update state record: " + error);
        }
    }

    // Delete a state record by StateID
    async deleteState(stateId) {
        try {
            const deleted = await db.StateMaster.destroy({
                where: { StateID: stateId }
            });

            if (deleted === 0) {
                throw new Error("State record not found");
            }

            return "State record deleted successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete state record: " + error);
        }
    }

    // Fetch state records with optional search, sorting, and pagination
    async fetchStates(query) {
        const { searchBy, searchValue, sortby, sortCode, page, limit } = query;

        try {
            let where = {};
            const offset = Helper.getPageNumber(page, limit);

            // Search functionality
            if (searchBy && searchValue) {
                where[searchBy] = { [Op.like]: `%${searchValue}%` };
            }

            // Sorting settings
            const order = sortby && sortCode ? [[sortby, sortCode]] : [["StateID", "ASC"]];

            // Fetch data with pagination, search, and sorting
            const { count, rows } = await db.StateMaster.findAndCountAll({
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
            throw new Error("Failed to retrieve state records");
        }
    }
}

module.exports = StateMasterService;
