const AttendanceStatusService = require("../../services/master/AttendanceStatusService");
const attendanceStatusService = new AttendanceStatusService();
const httpStatus = require("http-status");
const Response = require("../../response/index");

// Add a new attendance status record
const ADD_ATTENDANCE_STATUS = async (req, res) => {
    try {
        await attendanceStatusService.createAttendanceStatus(req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Attendance status added successfully',
            },
            httpStatus.OK
        );
    } catch (error) {
        return Response.error(
            req,
            res,
            { msgCode: "INTERNAL_SERVER_ERROR", ex: error.message },
            httpStatus.INTERNAL_SERVER_ERROR
        );
    }
};

// Update an existing attendance status record
const UPDATE_ATTENDANCE_STATUS = async (req, res) => {
    const { attendanceStatusId } = req.params; // Assuming attendanceStatusId is passed as a route parameter
    try {
        await attendanceStatusService.updateAttendanceStatus(attendanceStatusId, req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Attendance status updated successfully',
            },
            httpStatus.OK
        );
    } catch (error) {
        return Response.error(
            req,
            res,
            { msgCode: "INTERNAL_SERVER_ERROR", ex: error.message },
            httpStatus.INTERNAL_SERVER_ERROR
        );
    }
};

// Delete an attendance status record
const DELETE_ATTENDANCE_STATUS = async (req, res) => {
    const { attendanceStatusId } = req.params; // Assuming attendanceStatusId is passed as a route parameter
    try {
        await attendanceStatusService.deleteAttendanceStatus(attendanceStatusId);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Attendance status deleted successfully',
            },
            httpStatus.OK
        );
    } catch (error) {
        return Response.error(
            req,
            res,
            { msgCode: "INTERNAL_SERVER_ERROR", ex: error.message },
            httpStatus.INTERNAL_SERVER_ERROR
        );
    }
};

// Fetch attendance statuses
const FETCH_ATTENDANCE_STATUSES = async (req, res) => {
    try {
        const result = await attendanceStatusService.fetchAttendanceStatuses(req.query);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: result,
            },
            httpStatus.OK
        );
    } catch (error) {
        return Response.error(
            req,
            res,
            { msgCode: "INTERNAL_SERVER_ERROR", ex: error.message },
            httpStatus.INTERNAL_SERVER_ERROR
        );
    }
};

module.exports = {
    ADD_ATTENDANCE_STATUS,
    UPDATE_ATTENDANCE_STATUS,
    DELETE_ATTENDANCE_STATUS,
    FETCH_ATTENDANCE_STATUSES
};
