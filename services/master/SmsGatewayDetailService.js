const db = require("../../model");
const { Op } = require("sequelize");
const Helper = require("../../config/helper");

class SmsGatewayDetailService {
    
    // Create a new SMS gateway record
    async createGateway(data) {
        try {
            const gateway = await db.SmsGatewayDetail.create({
                GatewayName: data.GatewayName,
                GatewayURL: data.GatewayURL,
                ApiKey: data.ApiKey,
                StatusID: data.StatusID
            });
            return gateway;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create SMS gateway record: " + error);
        }
    }

    // Update an existing SMS gateway record by GatewayID
    async updateGateway(gatewayId, data) {
        try {
            const updatedGateway = await db.SmsGatewayDetail.update({
                GatewayName: data.GatewayName,
                GatewayURL: data.GatewayURL,
                ApiKey: data.ApiKey,
                StatusID: data.StatusID
            }, {
                where: { GatewayID: gatewayId }
            });

            if (updatedGateway[0] === 0) {
                throw new Error("SMS gateway record not found or no changes made");
            }

            return "SMS gateway record updated successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update SMS gateway record: " + error);
        }
    }

    // Delete an SMS gateway record by GatewayID
    async deleteGateway(gatewayId) {
        try {
            const deleted = await db.SmsGatewayDetail.destroy({
                where: { GatewayID: gatewayId }
            });

            if (deleted === 0) {
                throw new Error("SMS gateway record not found");
            }

            return "SMS gateway record deleted successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete SMS gateway record: " + error);
        }
    }

    // Fetch SMS gateway records with optional search, sorting, and pagination
    async fetchGateways(query) {
        const { searchBy, searchValue, sortby, sortCode, page, limit } = query;

        try {
            let where = {};
            const offset = Helper.getPageNumber(page, limit);

            // Search functionality
            if (searchBy && searchValue) {
                where[searchBy] = { [Op.like]: `%${searchValue}%` };
            }

            // Sorting settings
            const order = sortby && sortCode ? [[sortby, sortCode]] : [["GatewayID", "ASC"]];

            // Fetch data with pagination, search, and sorting
            const { count, rows } = await db.SmsGatewayDetail.findAndCountAll({
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
            throw new Error("Failed to retrieve SMS gateway records");
        }
    }
}

module.exports = SmsGatewayDetailService;
