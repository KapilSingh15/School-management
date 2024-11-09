const db = require("../../model");
const { Op } = require("sequelize");
const Helper = require("../../config/helper");

class BusMasterService {
    async createBus(data) {
        try {
            const bus = await db.BusMaster.create({
                BusNumber: data.BusNumber,
                Capacity: data.Capacity,
                StatusID: data.StatusID
            });
            return bus;
        } catch (error) {
            throw new Error("Failed to create bus: " + error);
        }
    }

    async updateBus(busId, data) {
        try {
            const updatedBus = await db.BusMaster.update({
                BusNumber: data.BusNumber,
                Capacity: data.Capacity,
                StatusID: data.StatusID
            }, {
                where: { BusID: busId }
            });

            if (updatedBus[0] === 0) throw new Error("Bus not found or no changes made");
            return "Bus updated successfully";
        } catch (error) {
            throw new Error("Failed to update bus: " + error);
        }
    }

    async deleteBus(busId) {
        try {
            const deleted = await db.BusMaster.destroy({ where: { BusID: busId } });
            if (deleted === 0) throw new Error("Bus not found");
            return "Bus deleted successfully";
        } catch (error) {
            throw new Error("Failed to delete bus: " + error);
        }
    }

    async fetchBuses(query) {
        const { searchBy, searchValue, sortby, sortCode, page, limit } = query;
        try {
            let where = {};
            const offset = Helper.getPageNumber(page, limit);
            if (searchBy && searchValue) where[searchBy] = { [Op.like]: `%${searchValue}%` };
            const order = sortby && sortCode ? [[sortby, sortCode]] : [["BusID", "ASC"]];
            const { count, rows } = await db.BusMaster.findAndCountAll({
                where, offset, limit: parseInt(limit) || Helper.getPageNumber(1, limit), order
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
            throw new Error("Failed to retrieve buses");
        }
    }
}

module.exports = BusMasterService;
