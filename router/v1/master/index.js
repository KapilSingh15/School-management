const Router = require('express').Router()

const userStatusMasterController = require('../../../controllers/master/UserStatusMasterController');
const schoolDetailController = require('../../../controllers/master/schoolDetailController');
const accountTypeMasterController = require('../../../controllers/master/AccountTypeMasterController');
const areaMasterController = require('../../../controllers/master/AreaMasterController');
const assessmentMasterController = require('../../../controllers/master/AssessmentMasterController');
const attendanceMasterController = require('../../../controllers/master/AttendanceMasterController');
const attendanceMasterDetailController = require('../../../controllers/master/AttendanceMasterDetailController');
const attendanceStatusController = require('../../../controllers/master/AttendanceStatusController');
const bloodGroupMasterController = require('../../../controllers/master/BloodGroupMasterController');
const busMasterController = require('../../../controllers/master/BusMasterController');
const cityMasterController = require('../../../controllers/master/CityMasterController');
const classMasterController = require('../../../controllers/master/ClassMasterController');
const classSubjectMappingMasterController = require('../../../controllers/master/ClassSubjectMappingMasterController');
const countryMasterController = require('../../../controllers/master/CountryMasterController');
const driverMasterController = require('../../../controllers/master/DriverMasterController');
const driverTypeMasterController = require('../../../controllers/master/DriverTypeMasterController');
const examinationScheduleMasterController = require('../../../controllers/master/ExaminationScheduleMasterController');
const feeBalanceMasterController = require('../../../controllers/master/FeeBalanceMasterController');
const feeHeadMasterController = require('../../../controllers/master/FeeHeadMasterController');
const feeHeadMonthMasterController = require('../../../controllers/master/FeeHeadMonthMasterController');
const feePlanDetailMasterController = require('../../../controllers/master/FeePlanDetailMasterController');
const feePlanMasterController = require('../../../controllers/master/FeePlanMasterController');
const feeReceiptConcessionDetailController = require('../../../controllers/master/FeeReceiptConcessionDetailController');
const feeReceiptDetailController = require('../../../controllers/master/FeeReceiptDetailController');
const feeReceiptMasterController = require('../../../controllers/master/FeeReceiptMasterController');
const feeReceiptMasterDetailController = require('../../../controllers/master/FeeReceiptMasterDetailController');
const financialYearMasterController = require('../../../controllers/master/FinancialYearMasterController');
const frequencyMasterController = require('../../../controllers/master/FrequencyMasterController');
const frequencyMonthMappingMasterController = require('../../../controllers/master/FrequencyMonthMappingMasterController');
const genderMasterController = require('../../../controllers/master/GenderMasterController');
const gradeMasterController = require('../../../controllers/master/GradeMasterController');
const groupMasterController = require('../../../controllers/master/GroupMasterController');
const loginMasterController = require('../../../controllers/master/LoginMasterController');
const moduleMasterController = require('../../../controllers/master/ModuleMasterController');


//user status 
Router.post('/user-status', userStatusMasterController.ADD_USER_STATUS);
Router.put('/user-status/:statusId', userStatusMasterController.UPDATE_USER_STATUS);
Router.delete('/user-status/:statusId', userStatusMasterController.DELETE_USER_STATUS);
Router.get('/user-status', userStatusMasterController.FETCH_USER_STATUSES);

// Routes for school details
Router.post('/school', schoolDetailController.ADD_SCHOOL);
Router.put('/school/:schoolId', schoolDetailController.UPDATE_SCHOOL);
Router.delete('/school/:schoolId', schoolDetailController.DELETE_SCHOOL);
Router.get('/school', schoolDetailController.FETCH_SCHOOLS);

// Routes for account types
Router.post('/account-type', accountTypeMasterController.ADD_ACCOUNT_TYPE);
Router.put('/account-type/:accountTypeId', accountTypeMasterController.UPDATE_ACCOUNT_TYPE);
Router.delete('/account-type/:accountTypeId', accountTypeMasterController.DELETE_ACCOUNT_TYPE);
Router.get('/account-type', accountTypeMasterController.FETCH_ACCOUNT_TYPES);


// Routes for areas
Router.post('/area', areaMasterController.ADD_AREA);
Router.put('/area/:areaId', areaMasterController.UPDATE_AREA);
Router.delete('/area/:areaId', areaMasterController.DELETE_AREA);
Router.get('/area', areaMasterController.FETCH_AREAS);



// Routes for assessments
Router.post('/assessment', assessmentMasterController.ADD_ASSESSMENT);
Router.put('/assessment/:assessmentId', assessmentMasterController.UPDATE_ASSESSMENT);
Router.delete('/assessment/:assessmentId', assessmentMasterController.DELETE_ASSESSMENT);
Router.get('/assessment', assessmentMasterController.FETCH_ASSESSMENTS);



// Routes for attendance records
Router.post('/attendance', attendanceMasterController.ADD_ATTENDANCE);
Router.put('/attendance/:attendanceId', attendanceMasterController.UPDATE_ATTENDANCE);
Router.delete('/attendance/:attendanceId', attendanceMasterController.DELETE_ATTENDANCE);
Router.get('/attendance', attendanceMasterController.FETCH_ATTENDANCES);


// Routes for attendance master details
Router.post('/attendance-detail', attendanceMasterDetailController.ADD_ATTENDANCE_DETAIL);
Router.put('/attendance-detail/:attendanceDetailId', attendanceMasterDetailController.UPDATE_ATTENDANCE_DETAIL);
Router.delete('/attendance-detail/:attendanceDetailId', attendanceMasterDetailController.DELETE_ATTENDANCE_DETAIL);
Router.get('/attendance-detail', attendanceMasterDetailController.FETCH_ATTENDANCE_DETAILS);



// Routes for attendance statuses
Router.post('/attendance-status', attendanceStatusController.ADD_ATTENDANCE_STATUS);
Router.put('/attendance-status/:attendanceStatusId', attendanceStatusController.UPDATE_ATTENDANCE_STATUS);
Router.delete('/attendance-status/:attendanceStatusId', attendanceStatusController.DELETE_ATTENDANCE_STATUS);
Router.get('/attendance-status', attendanceStatusController.FETCH_ATTENDANCE_STATUSES);


// Routes for blood groups
Router.post('/blood-group', bloodGroupMasterController.ADD_BLOOD_GROUP);
Router.put('/blood-group/:bloodGroupId', bloodGroupMasterController.UPDATE_BLOOD_GROUP);
Router.delete('/blood-group/:bloodGroupId', bloodGroupMasterController.DELETE_BLOOD_GROUP);
Router.get('/blood-group', bloodGroupMasterController.FETCH_BLOOD_GROUPS);


// Routes for buses
Router.post('/bus', busMasterController.ADD_BUS);
Router.put('/bus/:busId', busMasterController.UPDATE_BUS);
Router.delete('/bus/:busId', busMasterController.DELETE_BUS);
Router.get('/bus', busMasterController.FETCH_BUSES);


// Routes for cities
Router.post('/city', cityMasterController.ADD_CITY);
Router.put('/city/:cityId', cityMasterController.UPDATE_CITY);
Router.delete('/city/:cityId', cityMasterController.DELETE_CITY);
Router.get('/city', cityMasterController.FETCH_CITIES);


// Routes for classes
Router.post('/class', classMasterController.ADD_CLASS);
Router.put('/class/:classId', classMasterController.UPDATE_CLASS);
Router.delete('/class/:classId', classMasterController.DELETE_CLASS);
Router.get('/class', classMasterController.FETCH_CLASSES);



// Routes for class-subject mappings
Router.post('/class-subject-mapping', classSubjectMappingMasterController.ADD_CLASS_SUBJECT_MAPPING);
Router.put('/class-subject-mapping/:mappingId', classSubjectMappingMasterController.UPDATE_CLASS_SUBJECT_MAPPING);
Router.delete('/class-subject-mapping/:mappingId', classSubjectMappingMasterController.DELETE_CLASS_SUBJECT_MAPPING);
Router.get('/class-subject-mapping', classSubjectMappingMasterController.FETCH_CLASS_SUBJECT_MAPPINGS);



// Routes for countries
Router.post('/country', countryMasterController.ADD_COUNTRY);
Router.put('/country/:countryId', countryMasterController.UPDATE_COUNTRY);
Router.delete('/country/:countryId', countryMasterController.DELETE_COUNTRY);
Router.get('/country', countryMasterController.FETCH_COUNTRIES);



// Routes for drivers
Router.post('/driver', driverMasterController.ADD_DRIVER);
Router.put('/driver/:driverId', driverMasterController.UPDATE_DRIVER);
Router.delete('/driver/:driverId', driverMasterController.DELETE_DRIVER);
Router.get('/driver', driverMasterController.FETCH_DRIVERS);



// Routes for driver types
Router.post('/driver-type', driverTypeMasterController.ADD_DRIVER_TYPE);
Router.put('/driver-type/:driverTypeId', driverTypeMasterController.UPDATE_DRIVER_TYPE);
Router.delete('/driver-type/:driverTypeId', driverTypeMasterController.DELETE_DRIVER_TYPE);
Router.get('/driver-type', driverTypeMasterController.FETCH_DRIVER_TYPES);


// Routes for examination schedules
Router.post('/examination-schedule', examinationScheduleMasterController.ADD_EXAM_SCHEDULE);
Router.put('/examination-schedule/:examScheduleId', examinationScheduleMasterController.UPDATE_EXAM_SCHEDULE);
Router.delete('/examination-schedule/:examScheduleId', examinationScheduleMasterController.DELETE_EXAM_SCHEDULE);
Router.get('/examination-schedule', examinationScheduleMasterController.FETCH_EXAM_SCHEDULES);



// Routes for fee balances
Router.post('/fee-balance', feeBalanceMasterController.ADD_FEE_BALANCE);
Router.put('/fee-balance/:feeBalanceId', feeBalanceMasterController.UPDATE_FEE_BALANCE);
Router.delete('/fee-balance/:feeBalanceId', feeBalanceMasterController.DELETE_FEE_BALANCE);
Router.get('/fee-balance', feeBalanceMasterController.FETCH_FEE_BALANCES);


// Routes for fee heads
Router.post('/fee-head', feeHeadMasterController.ADD_FEE_HEAD);
Router.put('/fee-head/:feeHeadId', feeHeadMasterController.UPDATE_FEE_HEAD);
Router.delete('/fee-head/:feeHeadId', feeHeadMasterController.DELETE_FEE_HEAD);
Router.get('/fee-head', feeHeadMasterController.FETCH_FEE_HEADS);


// Routes for fee head months
Router.post('/fee-head-month', feeHeadMonthMasterController.ADD_FEE_HEAD_MONTH);
Router.put('/fee-head-month/:feeHeadMonthId', feeHeadMonthMasterController.UPDATE_FEE_HEAD_MONTH);
Router.delete('/fee-head-month/:feeHeadMonthId', feeHeadMonthMasterController.DELETE_FEE_HEAD_MONTH);
Router.get('/fee-head-month', feeHeadMonthMasterController.FETCH_FEE_HEAD_MONTHS);



// Routes for fee plan details
Router.post('/fee-plan-detail', feePlanDetailMasterController.ADD_FEE_PLAN_DETAIL);
Router.put('/fee-plan-detail/:feePlanDetailId', feePlanDetailMasterController.UPDATE_FEE_PLAN_DETAIL);
Router.delete('/fee-plan-detail/:feePlanDetailId', feePlanDetailMasterController.DELETE_FEE_PLAN_DETAIL);
Router.get('/fee-plan-detail', feePlanDetailMasterController.FETCH_FEE_PLAN_DETAILS);



// Routes for fee plans
Router.post('/fee-plan', feePlanMasterController.ADD_FEE_PLAN);
Router.put('/fee-plan/:feePlanId', feePlanMasterController.UPDATE_FEE_PLAN);
Router.delete('/fee-plan/:feePlanId', feePlanMasterController.DELETE_FEE_PLAN);
Router.get('/fee-plan', feePlanMasterController.FETCH_FEE_PLANS);



// Routes for fee receipt concession details
Router.post('/fee-receipt-concession-detail', feeReceiptConcessionDetailController.ADD_FEE_RECEIPT_CONCESSION_DETAIL);
Router.put('/fee-receipt-concession-detail/:feeReceiptConcessionDetailId', feeReceiptConcessionDetailController.UPDATE_FEE_RECEIPT_CONCESSION_DETAIL);
Router.delete('/fee-receipt-concession-detail/:feeReceiptConcessionDetailId', feeReceiptConcessionDetailController.DELETE_FEE_RECEIPT_CONCESSION_DETAIL);
Router.get('/fee-receipt-concession-detail', feeReceiptConcessionDetailController.FETCH_FEE_RECEIPT_CONCESSION_DETAILS);



// Routes for fee receipt details
Router.post('/fee-receipt-detail', feeReceiptDetailController.ADD_FEE_RECEIPT_DETAIL);
Router.put('/fee-receipt-detail/:feeReceiptDetailId', feeReceiptDetailController.UPDATE_FEE_RECEIPT_DETAIL);
Router.delete('/fee-receipt-detail/:feeReceiptDetailId', feeReceiptDetailController.DELETE_FEE_RECEIPT_DETAIL);
Router.get('/fee-receipt-detail', feeReceiptDetailController.FETCH_FEE_RECEIPT_DETAILS);


// Routes for fee receipts
Router.post('/fee-receipt', feeReceiptMasterController.ADD_FEE_RECEIPT);
Router.put('/fee-receipt/:feeReceiptId', feeReceiptMasterController.UPDATE_FEE_RECEIPT);
Router.delete('/fee-receipt/:feeReceiptId', feeReceiptMasterController.DELETE_FEE_RECEIPT);
Router.get('/fee-receipt', feeReceiptMasterController.FETCH_FEE_RECEIPTS);



// Routes for fee receipt master details
Router.post('/fee-receipt-master-detail', feeReceiptMasterDetailController.ADD_FEE_RECEIPT_MASTER_DETAIL);
Router.put('/fee-receipt-master-detail/:feeReceiptMasterDetailId', feeReceiptMasterDetailController.UPDATE_FEE_RECEIPT_MASTER_DETAIL);
Router.delete('/fee-receipt-master-detail/:feeReceiptMasterDetailId', feeReceiptMasterDetailController.DELETE_FEE_RECEIPT_MASTER_DETAIL);
Router.get('/fee-receipt-master-detail', feeReceiptMasterDetailController.FETCH_FEE_RECEIPT_MASTER_DETAILS);



// Routes for financial years
Router.post('/financial-year', financialYearMasterController.ADD_FINANCIAL_YEAR);
Router.put('/financial-year/:financialYearId', financialYearMasterController.UPDATE_FINANCIAL_YEAR);
Router.delete('/financial-year/:financialYearId', financialYearMasterController.DELETE_FINANCIAL_YEAR);
Router.get('/financial-year', financialYearMasterController.FETCH_FINANCIAL_YEARS);



// Routes for frequencies
Router.post('/frequency', frequencyMasterController.ADD_FREQUENCY);
Router.put('/frequency/:frequencyId', frequencyMasterController.UPDATE_FREQUENCY);
Router.delete('/frequency/:frequencyId', frequencyMasterController.DELETE_FREQUENCY);
Router.get('/frequency', frequencyMasterController.FETCH_FREQUENCIES);



// Routes for frequency month mappings
Router.post('/frequency-month-mapping', frequencyMonthMappingMasterController.ADD_FREQUENCY_MONTH_MAPPING);
Router.put('/frequency-month-mapping/:frequencyMonthMappingId', frequencyMonthMappingMasterController.UPDATE_FREQUENCY_MONTH_MAPPING);
Router.delete('/frequency-month-mapping/:frequencyMonthMappingId', frequencyMonthMappingMasterController.DELETE_FREQUENCY_MONTH_MAPPING);
Router.get('/frequency-month-mapping', frequencyMonthMappingMasterController.FETCH_FREQUENCY_MONTH_MAPPINGS);


// Routes for genders
Router.post('/gender', genderMasterController.ADD_GENDER);
Router.put('/gender/:genderId', genderMasterController.UPDATE_GENDER);
Router.delete('/gender/:genderId', genderMasterController.DELETE_GENDER);
Router.get('/gender', genderMasterController.FETCH_GENDERS);


// Routes for grades
Router.post('/grade', gradeMasterController.ADD_GRADE);
Router.put('/grade/:gradeId', gradeMasterController.UPDATE_GRADE);
Router.delete('/grade/:gradeId', gradeMasterController.DELETE_GRADE);
Router.get('/grade', gradeMasterController.FETCH_GRADES);



// Routes for groups
Router.post('/group', groupMasterController.ADD_GROUP);
Router.put('/group/:groupId', groupMasterController.UPDATE_GROUP);
Router.delete('/group/:groupId', groupMasterController.DELETE_GROUP);
Router.get('/group', groupMasterController.FETCH_GROUPS);


// Routes for logins
Router.post('/login', loginMasterController.ADD_LOGIN);
Router.put('/login/:loginId', loginMasterController.UPDATE_LOGIN);
Router.delete('/login/:loginId', loginMasterController.DELETE_LOGIN);
Router.get('/login', loginMasterController.FETCH_LOGINS);



// Routes for modules
Router.post('/module', moduleMasterController.ADD_MODULE);
Router.put('/module/:moduleId', moduleMasterController.UPDATE_MODULE);
Router.delete('/module/:moduleId', moduleMasterController.DELETE_MODULE);
Router.get('/module', moduleMasterController.FETCH_MODULES);
module.exports = Router

