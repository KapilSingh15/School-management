const db = require("../../model");
const { Op } = require("sequelize");
const Helper = require("../../config/helper");

class RoutePlanMasterService {
    // Create a new route plan
    async createRoutePlan(data) {
        try {
            const routePlan = await db.RoutePlanMaster.create({
                RouteID: data.RouteID,
                AccountTypeID: data.AccountTypeID,
                GroupID: data.GroupID,
                FinancialYearID: data.FinancialYearID,
                FrequencyID: data.FrequencyID,
                Fare: data.Fare,
                CreatedBy: data.CreatedBy,  // You can adjust the "CreatedBy" and "ModifiedBy" as per your logic
                CreatedOn: data.CreatedOn
            });
            return routePlan;
        } catch (error) {
            throw new Error("Error creating route plan: " + error.message);
        }
    }

    // Update an existing route plan
    async updateRoutePlan(routePlanId, data) {
        try {
            const routePlan = await db.RoutePlanMaster.findByPk(routePlanId);
            if (!routePlan) {
                throw new Error("Route plan not found");
            }

            await routePlan.update({
                RouteID: data.RouteID,
                AccountTypeID: data.AccountTypeID,
                GroupID: data.GroupID,
                FinancialYearID: data.FinancialYearID,
                FrequencyID: data.FrequencyID,
                Fare: data.Fare,
                ModifiedBy: data.ModifiedBy, // Adjust if needed
                ModifiedOn: data.ModifiedOn
            });

            return routePlan;
        } catch (error) {
            throw new Error("Error updating route plan: " + error.message);
        }
    }

    // Delete a route plan
    async deleteRoutePlan(routePlanId) {
        try {
            const routePlan = await db.RoutePlanMaster.findByPk(routePlanId);
            if (!routePlan) {
                throw new Error("Route plan not found");
            }
            await routePlan.destroy();
            return { message: "Route plan deleted successfully" };
        } catch (error) {
            throw new Error("Error deleting route plan: " + error.message);
        }
    }

    // Fetch route plans with optional filtering and pagination
    async fetchRoutePlans(query) {
        const { searchBy, searchValue, sortby, sortCode, page, limit } = query;

        try {
            let where = {};
            if (searchBy && searchValue) {
                where[searchBy] = { [Op.like]: `%${searchValue}%` };
            }

            const offset = Helper.getPageNumber(page, limit);
            const order = sortby && sortCode ? [[sortby, sortCode]] : [["RoutePlanID", "ASC"]];

            const { count, rows } = await db.RoutePlanMaster.findAndCountAll({
                where,
                offset,
                limit: parseInt(limit),
                order,
            });

            return {
                data: {
                    pagination: {
                        currentPage: page,
                        pageSize: limit,
                        totalPages: Math.ceil(count / limit),
                        totalResults: count,
                    },
                    data: rows,
                },
            };
        } catch (error) {
            throw new Error("Error fetching route plans: " + error.message);
        }
    }
}

module.exports = RoutePlanMasterService;
