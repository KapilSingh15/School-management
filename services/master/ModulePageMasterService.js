const db = require("../../model");
const { Op } = require("sequelize");
const Helper = require("../../config/helper");

class ModulePageMasterService {
    
    // Create a new module page record
    async createModulePage(data) {
        try {
            const modulePage = await db.ModulePageMaster.create({
                ModuleID: data.ModuleID,
                PageName: data.PageName,
                Page: data.Page,  // Updated field to match schema
                Status: data.Status,  // Updated field to match schema
                SortBy: data.SortBy
            });
            return modulePage;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create module page record: " + error);
        }
    }

    // Update an existing module page record by ModulePageID
    async updateModulePage(modulePageId, data) {
        try {
            const updatedModulePage = await db.ModulePageMaster.update({
                ModuleID: data.ModuleID,
                PageName: data.PageName,
                Page: data.Page,  // Updated field to match schema
                Status: data.Status,  // Updated field to match schema
                SortBy: data.SortBy
            }, {
                where: { ModulePageID: modulePageId }
            });

            if (updatedModulePage[0] === 0) {
                throw new Error("Module page record not found or no changes made");
            }

            return "Module page record updated successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update module page record: " + error);
        }
    }

    // Delete a module page record by ModulePageID
    async deleteModulePage(modulePageId) {
        try {
            const deleted = await db.ModulePageMaster.destroy({
                where: { ModulePageID: modulePageId }
            });

            if (deleted === 0) {
                throw new Error("Module page record not found");
            }

            return "Module page record deleted successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete module page record: " + error);
        }
    }

    // Fetch module page records with optional search, sorting, and pagination
    async fetchModulePages(query) {
        const { searchBy, searchValue, sortby, sortCode, page, limit } = query;

        try {
            let where = {};
            const offset = Helper.getPageNumber(page, limit);

            // Search functionality
            if (searchBy && searchValue) {
                where[searchBy] = { [Op.like]: `%${searchValue}%` };
            }

            // Sorting settings
            const order = sortby && sortCode ? [[sortby, sortCode]] : [["ModulePageID", "ASC"]];

            // Fetch data with pagination, search, and sorting
            const { count, rows } = await db.ModulePageMaster.findAndCountAll({
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
            throw new Error("Failed to retrieve module page records");
        }
    }
}

module.exports = ModulePageMasterService;
