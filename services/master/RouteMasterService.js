const db = require("../../model");
const { Op } = require("sequelize");
const Helper = require("../../config/helper");

class RouteMasterService {
    
    // Create a new route record
    async createRoute(data) {
        try {
            const route = await db.RouteMaster.create({
                RouteName: data.RouteName,
                BusID: data.BusID, // added to match schema
                AreaIDFrom: data.AreaIDFrom, // added to match schema
                AreaIDTo: data.AreaIDTo, // added to match schema
                TimeID: data.TimeID, // added to match schema
                DriverID: data.DriverID, // added to match schema
                ConductorID: data.ConductorID, // added to match schema
                Distance: data.Distance, // added to match schema
                StatusID: data.StatusID, // updated to match schema
            });
            return route;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create route record: " + error);
        }
    }

    // Update an existing route record by RouteID
    async updateRoute(routeId, data) {
        try {
            const updatedRoute = await db.RouteMaster.update({
                RouteName: data.RouteName,
                BusID: data.BusID, // updated to match schema
                AreaIDFrom: data.AreaIDFrom, // updated to match schema
                AreaIDTo: data.AreaIDTo, // updated to match schema
                TimeID: data.TimeID, // updated to match schema
                DriverID: data.DriverID, // updated to match schema
                ConductorID: data.ConductorID, // updated to match schema
                Distance: data.Distance, // updated to match schema
                StatusID: data.StatusID, // updated to match schema
            }, {
                where: { RouteID: routeId } // updated to match schema
            });

            if (updatedRoute[0] === 0) {
                throw new Error("Route record not found or no changes made");
            }

            return "Route record updated successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update route record: " + error);
        }
    }

    // Delete a route record by RouteID
    async deleteRoute(routeId) {
        try {
            const deleted = await db.RouteMaster.destroy({
                where: { RouteID: routeId } // updated to match schema
            });

            if (deleted === 0) {
                throw new Error("Route record not found");
            }

            return "Route record deleted successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete route record: " + error);
        }
    }

    // Fetch route records with optional search, sorting, and pagination
    async fetchRoutes(query) {
        const { searchBy, searchValue, sortby, sortCode, page, limit } = query;

        try {
            let where = {};
            const offset = Helper.getPageNumber(page, limit);

            // Search functionality
            if (searchBy && searchValue) {
                where[searchBy] = { [Op.like]: `%${searchValue}%` };
            }

            // Sorting settings
            const order = sortby && sortCode ? [[sortby, sortCode]] : [["RouteID", "ASC"]];

            // Fetch data with pagination, search, and sorting
            const { count, rows } = await db.RouteMaster.findAndCountAll({
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
            throw new Error("Failed to retrieve route records");
        }
    }
}

module.exports = RouteMasterService;
