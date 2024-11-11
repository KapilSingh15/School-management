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
const modulePageMasterController = require('../../../controllers/master/ModulePageMasterController');
const monthMasterController = require('../../../controllers/master/MonthMasterController');
const parentDetailMasterController = require('../../../controllers/master/ParentDetailMasterController');
const quarterMasterController = require('../../../controllers/master/QuarterMasterController');
const quarterMasterDetailController = require('../../../controllers/master/QuarterMasterDetailController');
const quotaMasterController = require('../../../controllers/master/QuotaMasterController');
const registrationFeeMasterController = require('../../../controllers/master/RegistrationFeeMasterController');
const registrationTypeMasterController = require('../../../controllers/master/RegistrationTypeMasterController');
const religionMasterController = require('../../../controllers/master/ReligionMasterController');
const resultMasterController = require('../../../controllers/master/ResultMasterController');
const resultMasterDetailController = require('../../../controllers/master/ResultMasterDetailController');
const resultReportMasterController = require('../../../controllers/master/ResultReportMasterController');
const resultStatusController = require('../../../controllers/master/ResultStatusController');
const roleMasterController = require('../../../controllers/master/RoleMasterController');
const routeMasterController = require('../../../controllers/master/RouteMasterController');
const routePlanDetailMasterController = require('../../../controllers/master/RoutePlanDetailMasterController');
const routePlanMasterController = require('../../../controllers/master/RoutePlanMasterController');
const schoolBranchDetailsController = require('../../../controllers/master/SchoolBranchDetailsController');
const schoolDetailsController = require('../../../controllers/master/schoolDetailController');
const sectionMasterController = require('../../../controllers/master/SectionMasterController');
const smsGatewayDetailController = require('../../../controllers/master/SmsGatewayDetailController');
const staffMasterController = require('../../../controllers/master/StaffMasterController');
const staffRoleMasterController = require('../../../controllers/master/StaffRoleMasterController');
const staffTypeMasterController = require('../../../controllers/master/StaffTypeMasterController');
const stateMasterController = require('../../../controllers/master/StateMasterController');
const stopageMasterController = require('../../../controllers/master/StopageMasterController');
const studentHistoryController = require('../../../controllers/master/StudentHistoryController');
const studentMasterController = require('../../../controllers/master/StudentMasterController');
const studentOptionalSubjectMasterController = require('../../../controllers/master/StudentOptionalSubjectMasterController');
const studentRegistrationController = require('../../../controllers/master/StudentRegistrationController');
const studentTypeMasterController = require('../../../controllers/master/StudentTypeMasterController');
const subjectMasterController = require('../../../controllers/master/SubjectMasterController');
const termMasterController = require('../../../controllers/master/TermMasterController');
const timeMasterController = require('../../../controllers/master/TimeMasterController');
const userModulePermissionController = require('../../../controllers/master/UserModulePermissionController');

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



// Routes for module pages
Router.post('/module-page', modulePageMasterController.ADD_MODULE_PAGE);
Router.put('/module-page/:modulePageId', modulePageMasterController.UPDATE_MODULE_PAGE);
Router.delete('/module-page/:modulePageId', modulePageMasterController.DELETE_MODULE_PAGE);
Router.get('/module-page', modulePageMasterController.FETCH_MODULE_PAGES);

// Routes for months
Router.post('/month', monthMasterController.ADD_MONTH);
Router.put('/month/:monthId', monthMasterController.UPDATE_MONTH);
Router.delete('/month/:monthId', monthMasterController.DELETE_MONTH);
Router.get('/month', monthMasterController.FETCH_MONTHS);



// Routes for parent details
Router.post('/parent-detail', parentDetailMasterController.ADD_PARENT_DETAIL);
Router.put('/parent-detail/:parentDetailId', parentDetailMasterController.UPDATE_PARENT_DETAIL);
Router.delete('/parent-detail/:parentDetailId', parentDetailMasterController.DELETE_PARENT_DETAIL);
Router.get('/parent-detail', parentDetailMasterController.FETCH_PARENT_DETAILS);


// Routes for quarters
Router.post('/quarter', quarterMasterController.ADD_QUARTER);
Router.put('/quarter/:quarterId', quarterMasterController.UPDATE_QUARTER);
Router.delete('/quarter/:quarterId', quarterMasterController.DELETE_QUARTER);
Router.get('/quarter', quarterMasterController.FETCH_QUARTERS);



// Routes for quarter master details
Router.post('/quarter-master-detail', quarterMasterDetailController.ADD_QUARTER_MASTER_DETAIL);
Router.put('/quarter-master-detail/:quarterMasterDetailId', quarterMasterDetailController.UPDATE_QUARTER_MASTER_DETAIL);
Router.delete('/quarter-master-detail/:quarterMasterDetailId', quarterMasterDetailController.DELETE_QUARTER_MASTER_DETAIL);
Router.get('/quarter-master-detail', quarterMasterDetailController.FETCH_QUARTER_MASTER_DETAILS);



// Routes for quotas
Router.post('/quota', quotaMasterController.ADD_QUOTA);
Router.put('/quota/:quotaId', quotaMasterController.UPDATE_QUOTA);
Router.delete('/quota/:quotaId', quotaMasterController.DELETE_QUOTA);
Router.get('/quota', quotaMasterController.FETCH_QUOTAS);



// Routes for registration fees
Router.post('/registration-fee', registrationFeeMasterController.ADD_REGISTRATION_FEE);
Router.put('/registration-fee/:registrationFeeId', registrationFeeMasterController.UPDATE_REGISTRATION_FEE);
Router.delete('/registration-fee/:registrationFeeId', registrationFeeMasterController.DELETE_REGISTRATION_FEE);
Router.get('/registration-fee', registrationFeeMasterController.FETCH_REGISTRATION_FEES);



// Routes for registration types
Router.post('/registration-type', registrationTypeMasterController.ADD_REGISTRATION_TYPE);
Router.put('/registration-type/:registrationTypeId', registrationTypeMasterController.UPDATE_REGISTRATION_TYPE);
Router.delete('/registration-type/:registrationTypeId', registrationTypeMasterController.DELETE_REGISTRATION_TYPE);
Router.get('/registration-type', registrationTypeMasterController.FETCH_REGISTRATION_TYPES);



// Routes for religions
Router.post('/religion', religionMasterController.ADD_RELIGION);
Router.put('/religion/:religionId', religionMasterController.UPDATE_RELIGION);
Router.delete('/religion/:religionId', religionMasterController.DELETE_RELIGION);
Router.get('/religion', religionMasterController.FETCH_RELIGIONS);



// Routes for results
Router.post('/result', resultMasterController.ADD_RESULT);
Router.put('/result/:resultId', resultMasterController.UPDATE_RESULT);
Router.delete('/result/:resultId', resultMasterController.DELETE_RESULT);
Router.get('/result', resultMasterController.FETCH_RESULTS);


// Routes for result master details
Router.post('/result-master-detail', resultMasterDetailController.ADD_RESULT_MASTER_DETAIL);
Router.put('/result-master-detail/:resultMasterDetailId', resultMasterDetailController.UPDATE_RESULT_MASTER_DETAIL);
Router.delete('/result-master-detail/:resultMasterDetailId', resultMasterDetailController.DELETE_RESULT_MASTER_DETAIL);
Router.get('/result-master-detail', resultMasterDetailController.FETCH_RESULT_MASTER_DETAILS);



// Routes for result reports
Router.post('/result-report', resultReportMasterController.ADD_RESULT_REPORT);
Router.put('/result-report/:resultReportId', resultReportMasterController.UPDATE_RESULT_REPORT);
Router.delete('/result-report/:resultReportId', resultReportMasterController.DELETE_RESULT_REPORT);
Router.get('/result-report', resultReportMasterController.FETCH_RESULT_REPORTS);



// Routes for result statuses
Router.post('/result-status', resultStatusController.ADD_RESULT_STATUS);
Router.put('/result-status/:resultStatusId', resultStatusController.UPDATE_RESULT_STATUS);
Router.delete('/result-status/:resultStatusId', resultStatusController.DELETE_RESULT_STATUS);
Router.get('/result-status', resultStatusController.FETCH_RESULT_STATUSES);



// Routes for roles
Router.post('/role', roleMasterController.ADD_ROLE);
Router.put('/role/:roleId', roleMasterController.UPDATE_ROLE);
Router.delete('/role/:roleId', roleMasterController.DELETE_ROLE);
Router.get('/role', roleMasterController.FETCH_ROLES);



// Routes for routes
Router.post('/route', routeMasterController.ADD_ROUTE);
Router.put('/route/:routeId', routeMasterController.UPDATE_ROUTE);
Router.delete('/route/:routeId', routeMasterController.DELETE_ROUTE);
Router.get('/route', routeMasterController.FETCH_ROUTES);


// Routes for route plan details
Router.post('/route-plan-detail', routePlanDetailMasterController.ADD_ROUTE_PLAN_DETAIL);
Router.put('/route-plan-detail/:routePlanDetailId', routePlanDetailMasterController.UPDATE_ROUTE_PLAN_DETAIL);
Router.delete('/route-plan-detail/:routePlanDetailId', routePlanDetailMasterController.DELETE_ROUTE_PLAN_DETAIL);
Router.get('/route-plan-detail', routePlanDetailMasterController.FETCH_ROUTE_PLAN_DETAILS);



// Routes for route plans
Router.post('/route-plan', routePlanMasterController.ADD_ROUTE_PLAN);
Router.put('/route-plan/:routePlanId', routePlanMasterController.UPDATE_ROUTE_PLAN);
Router.delete('/route-plan/:routePlanId', routePlanMasterController.DELETE_ROUTE_PLAN);
Router.get('/route-plan', routePlanMasterController.FETCH_ROUTE_PLANS);



// Routes for school branch details
Router.post('/school-branch-detail', schoolBranchDetailsController.ADD_SCHOOL_BRANCH_DETAIL);
Router.put('/school-branch-detail/:schoolBranchDetailId', schoolBranchDetailsController.UPDATE_SCHOOL_BRANCH_DETAIL);
Router.delete('/school-branch-detail/:schoolBranchDetailId', schoolBranchDetailsController.DELETE_SCHOOL_BRANCH_DETAIL);
Router.get('/school-branch-detail', schoolBranchDetailsController.FETCH_SCHOOL_BRANCH_DETAILS);



// Routes for schools
Router.post('/school', schoolDetailsController.ADD_SCHOOL);
Router.put('/school/:schoolId', schoolDetailsController.UPDATE_SCHOOL);
Router.delete('/school/:schoolId', schoolDetailsController.DELETE_SCHOOL);
Router.get('/school', schoolDetailsController.FETCH_SCHOOLS);


// Routes for sections
Router.post('/section', sectionMasterController.ADD_SECTION);
Router.put('/section/:sectionId', sectionMasterController.UPDATE_SECTION);
Router.delete('/section/:sectionId', sectionMasterController.DELETE_SECTION);
Router.get('/section', sectionMasterController.FETCH_SECTIONS);



// Routes for SMS gateway details
Router.post('/sms-gateway-detail', smsGatewayDetailController.ADD_SMS_GATEWAY_DETAIL);
Router.put('/sms-gateway-detail/:smsGatewayDetailId', smsGatewayDetailController.UPDATE_SMS_GATEWAY_DETAIL);
Router.delete('/sms-gateway-detail/:smsGatewayDetailId', smsGatewayDetailController.DELETE_SMS_GATEWAY_DETAIL);
Router.get('/sms-gateway-detail', smsGatewayDetailController.FETCH_SMS_GATEWAY_DETAILS);



// Routes for staff records
Router.post('/staff', staffMasterController.ADD_STAFF);
Router.put('/staff/:staffId', staffMasterController.UPDATE_STAFF);
Router.delete('/staff/:staffId', staffMasterController.DELETE_STAFF);
Router.get('/staff', staffMasterController.FETCH_STAFFS);


// Routes for staff roles
Router.post('/staff-role', staffRoleMasterController.ADD_STAFF_ROLE);
Router.put('/staff-role/:staffRoleId', staffRoleMasterController.UPDATE_STAFF_ROLE);
Router.delete('/staff-role/:staffRoleId', staffRoleMasterController.DELETE_STAFF_ROLE);
Router.get('/staff-role', staffRoleMasterController.FETCH_STAFF_ROLES);




// Routes for staff types
Router.post('/staff-type', staffTypeMasterController.ADD_STAFF_TYPE);
Router.put('/staff-type/:staffTypeId', staffTypeMasterController.UPDATE_STAFF_TYPE);
Router.delete('/staff-type/:staffTypeId', staffTypeMasterController.DELETE_STAFF_TYPE);
Router.get('/staff-type', staffTypeMasterController.FETCH_STAFF_TYPES);



// Routes for states
Router.post('/state', stateMasterController.ADD_STATE);
Router.put('/state/:stateId', stateMasterController.UPDATE_STATE);
Router.delete('/state/:stateId', stateMasterController.DELETE_STATE);
Router.get('/state', stateMasterController.FETCH_STATES);



// Routes for stopages
Router.post('/stopage', stopageMasterController.ADD_STOPAGE);
Router.put('/stopage/:stopageId', stopageMasterController.UPDATE_STOPAGE);
Router.delete('/stopage/:stopageId', stopageMasterController.DELETE_STOPAGE);
Router.get('/stopage', stopageMasterController.FETCH_STOPAGES);


// Routes for student histories
Router.post('/student-history', studentHistoryController.ADD_STUDENT_HISTORY);
Router.put('/student-history/:studentHistoryId', studentHistoryController.UPDATE_STUDENT_HISTORY);
Router.delete('/student-history/:studentHistoryId', studentHistoryController.DELETE_STUDENT_HISTORY);
Router.get('/student-history', studentHistoryController.FETCH_STUDENT_HISTORIES);


// Routes for students
Router.post('/student', studentMasterController.ADD_STUDENT);
Router.put('/student/:studentId', studentMasterController.UPDATE_STUDENT);
Router.delete('/student/:studentId', studentMasterController.DELETE_STUDENT);
Router.get('/student', studentMasterController.FETCH_STUDENTS);



// Routes for student optional subjects
Router.post('/student-optional-subject', studentOptionalSubjectMasterController.ADD_STUDENT_OPTIONAL_SUBJECT);
Router.put('/student-optional-subject/:studentOptionalSubjectId', studentOptionalSubjectMasterController.UPDATE_STUDENT_OPTIONAL_SUBJECT);
Router.delete('/student-optional-subject/:studentOptionalSubjectId', studentOptionalSubjectMasterController.DELETE_STUDENT_OPTIONAL_SUBJECT);
Router.get('/student-optional-subject', studentOptionalSubjectMasterController.FETCH_STUDENT_OPTIONAL_SUBJECTS);


// Routes for student registrations
Router.post('/student-registration', studentRegistrationController.ADD_STUDENT_REGISTRATION);
Router.put('/student-registration/:studentRegistrationId', studentRegistrationController.UPDATE_STUDENT_REGISTRATION);
Router.delete('/student-registration/:studentRegistrationId', studentRegistrationController.DELETE_STUDENT_REGISTRATION);
Router.get('/student-registration', studentRegistrationController.FETCH_STUDENT_REGISTRATIONS);



// Routes for student types
Router.post('/student-type', studentTypeMasterController.ADD_STUDENT_TYPE);
Router.put('/student-type/:studentTypeId', studentTypeMasterController.UPDATE_STUDENT_TYPE);
Router.delete('/student-type/:studentTypeId', studentTypeMasterController.DELETE_STUDENT_TYPE);
Router.get('/student-type', studentTypeMasterController.FETCH_STUDENT_TYPES);


// Routes for subjects
Router.post('/subject', subjectMasterController.ADD_SUBJECT);
Router.put('/subject/:subjectId', subjectMasterController.UPDATE_SUBJECT);
Router.delete('/subject/:subjectId', subjectMasterController.DELETE_SUBJECT);
Router.get('/subject', subjectMasterController.FETCH_SUBJECTS);



// Routes for terms
Router.post('/term', termMasterController.ADD_TERM);
Router.put('/term/:termId', termMasterController.UPDATE_TERM);
Router.delete('/term/:termId', termMasterController.DELETE_TERM);
Router.get('/term', termMasterController.FETCH_TERMS);



// Routes for times
Router.post('/time', timeMasterController.ADD_TIME);
Router.put('/time/:timeId', timeMasterController.UPDATE_TIME);
Router.delete('/time/:timeId', timeMasterController.DELETE_TIME);
Router.get('/time', timeMasterController.FETCH_TIMES);



// Routes for user module permissions
Router.post('/user-module-permission', userModulePermissionController.ADD_USER_MODULE_PERMISSION);
Router.put('/user-module-permission/:permissionId', userModulePermissionController.UPDATE_USER_MODULE_PERMISSION);
Router.delete('/user-module-permission/:permissionId', userModulePermissionController.DELETE_USER_MODULE_PERMISSION);
Router.get('/user-module-permission', userModulePermissionController.FETCH_USER_MODULE_PERMISSIONS);

module.exports = Router

