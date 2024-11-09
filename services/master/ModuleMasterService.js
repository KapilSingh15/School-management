const db = require("../../model");
const { Op } = require("sequelize");
const Helper = require("../../config/helper");

class ModuleMasterService {
    
    // Create a new module record
    async createModule(data) {
        try {
            const module = await db.ModuleMaster.create({
                ModuleName: data.ModuleName,
                Description: data.Description,
                StatusID: data.StatusID
            });
            return module;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create module record: " + error);
        }
    }

    // Update an existing module record by ModuleID
    async updateModule(moduleId, data) {
        try {
            const updatedModule = await db.ModuleMaster.update({
                ModuleName: data.ModuleName,
                Description: data.Description,
                StatusID: data.StatusID
            }, {
                where: { ModuleID: moduleId }
            });

            if (updatedModule[0] === 0) {
                throw new Error("Module record not found or no changes made");
            }

            return "Module record updated successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update module record: " + error);
        }
    }

    // Delete a module record by ModuleID
    async deleteModule(moduleId) {
        try {
            const deleted = await db.ModuleMaster.destroy({
                where: { ModuleID: moduleId }
            });

            if (deleted === 0) {
                throw new Error("Module record not found");
            }

            return "Module record deleted successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete module record: " + error);
        }
    }

    // Fetch module records with optional search, sorting, and pagination
    async fetchModules(query) {
        const { searchBy, searchValue, sortby, sortCode, page, limit } = query;

        try {
            let where = {};
            const offset = Helper.getPageNumber(page, limit);

            // Search functionality
            if (searchBy && searchValue) {
                where[searchBy] = { [Op.like]: `%${searchValue}%` };
            }

            // Sorting settings
            const order = sortby && sortCode ? [[sortby, sortCode]] : [["ModuleID", "ASC"]];

            // Fetch data with pagination, search, and sorting
            const { count, rows } = await db.ModuleMaster.findAndCountAll({
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
            throw new Error("Failed to retrieve module records");
        }
    }
}

module.exports = ModuleMasterService;
