const helper= {};

const pageConfig  =require('../config/constants')

var d 			= new Date();
var moment      = require('moment');
var moment1     = require('moment-timezone');
var date       	= moment.utc(d).toDate();
var path 	   	= require('path');
var directories = path.dirname('views');

var jwt         = require('jsonwebtoken');
const { log } = require('console');
// const nodemailer= require('nodemailer');
// // const chalk    	= require('chalk');
// const multer    = require('multer');
// var sendResponse= require('../util/CustomResponse');

// var transporter = nodemailer.createTransport({
//     host:Config.SMTP.HOSTNAME,
//     port:Config.SMTP.PORT,
//     secure:true,
//     auth: {
//         user: Config.SMTP.USER,
//         pass: Config.SMTP.PASSWORD,
//     }
// });

// -> Multer Upload Storage
// const storage = multer.diskStorage({
//   	destination: (req, file, cb) => {
// 		cb(null, 'upload/');
// 		// cb(null, directories + 'public/uploads/')
//   	},
//   	filename: (req, file, cb) => {
//      	cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
//   	}
// });
// const upload = multer({storage: storage});

// helper.generate_jwt=(userId) =>{
// 	var token= jwt.sign({ id: userId }, Config.jwt_secret, {
// 		expiresIn: '30d'
// 	});
// 	return token;
// };

helper.get_sql_date = () => {
	return moment().format('YYYY-MM-DD HH:mm:ss');
};

helper.get_sql_current_date = () => {
	return moment().format('YYYY-MM-DD');
};

helper.get_sql_date_timezone = (timezone) => {
	return moment1().tz(timezone).format('YYYY-MM-DD');
};

helper.get_sql_date2 = () => {
	return moment().format('YYYY-MM-DD HH:mm:ss');
};

helper.generate_otp = () => {
	if(Config.MODE=='dev'){
		return Math.floor(1000 + Math.random() * 9000);
	} else{
		return Math.floor(1000 + Math.random() * 9000);
	}
};

helper.ucfirst = (str) => {
	return str.charAt(0).toUpperCase() + str.slice(1)
};

helper.format_sql_data = (data) => {
	return JSON.parse(JSON.stringify(data));
};

helper.generate_url = (req) => {
	return req.protocol + '://' + req.hostname +':'+ req.connection.localPort;
};

helper.console = (type,output) => {
	let has_str = "-----------------------------------";
	if(type == null){
		if(typeof output == 'object'){
			console.log(chalk.blue.bold.inverse(has_str));
			console.log(output);
			console.log(chalk.blue.bold.inverse(has_str));
		}else{
			console.log(chalk.blue.bold.inverse(output));
		}
	}else if(type == true){
		if(typeof output == 'object'){
			console.log(chalk.green.bold.inverse(has_str));
			console.log(output);
			console.log(chalk.green.bold.inverse(has_str));
		}else{
			console.log(chalk.green.bold.inverse(output));
		}
	}else{
		if(typeof output == 'object'){
			console.log(chalk.red.bold.inverse(has_str));
			console.log(output);
			console.log(chalk.red.bold.inverse(has_str));
		}else{
			console.log(chalk.red.bold.inverse(output));
		}
	}
};

helper.get_current_year = () => {
	return moment().format('YYYY');
};

helper.toFixedNumber = (number) => {
    const spitedValues = String(number.toLocaleString()).split('.');
    let decimalValue = spitedValues.length > 1 ? spitedValues[1] : '';
    decimalValue = decimalValue.concat('00').substr(0,2);
    return spitedValues[0] + '.' + decimalValue;
}

helper.generateRandNo = () => {
	let rand_no = Math.random();
	let num = Math.floor(rand_no * 100000000 + 1);
	return num; /*8 digit random number*/
}


helper.getPageNumber = (page,limit)=>{
	// if (page == 1) {
    //   var start = 0;
    // }
	// else {

	// 	console.log("checking value");
    //   if (page == 0){
    //     page = 1;
    //   }
    //   page = (page - 1);
      var start = (((limit==undefined || limit=='') ? pageConfig.PER_PAGE_RECORD : limit) * page);
    
    return start;
}

helper.strToLowerCase = (str)=>{
  return str == undefined ? '' : helper._trim(str.toLowerCase());
}

helper._replace = (str) => {
	var responce = str == undefined ? '' : str.replace(/[^a-zA-Z0-9 ]/g, "");
    return responce;
}

helper._trim = (str) => {
	var responce = str == undefined ? '' : str.trim();
    return responce;
}

helper.sendMailWithTemplate = (templatePath, emailSubject, email, dataObject) => {
	return new Promise(function (resolve,reject){
		ejs.renderFile(templatePath, dataObject, function(err,dataTemplate){
			if(err){
				console.log("In sendMailWithTemplate error >>");
				console.log(err);
			}else{
				var mainOptions = {
					from: "Eoxs Admin <" + Config.SMTP.FROM + ">",
					to:email,
					subject: emailSubject,
					html: dataTemplate
				};
	
				transporter.sendMail(mainOptions, function (err, info) {
					if(err){
						console.log("transporter.sendMail >>> ", err);
					}else{
						resolve(1);
					}
				});
			}
		});
		
	});
};

helper.sendSms = (templatePath, emailSubject, email, dataObject) => {
	return new promise(function (resolve,reject){
		return '';
	});
};

helper.uploadfilesOnAws=(file)=>{
	return new Promise(async function (resolve,reject){
	 	const s3bucket = new AWS.S3({
	        accessKeyId: Config.S3BUCKET.ACCESS_KEY_ID,
	        secretAccessKey: Config.S3BUCKET.SECRET_ACCESS_KEY,
	        region: Config.S3BUCKET.REGION
	    });
	    await s3bucket.createBucket(function () {
		   	var params= {
		    	Bucket: Config.S3BUCKET.BUCKET_NAME, //'thumbzapp',
		    	Key: file.originalname,
		    	Body: file.buffer,
		   	};
		   	s3bucket.upload(params, function (err, data) {
		    	if (err) {
		     		reject([0,error]);
		    	} else{
		    		console.log(data.Location);
		    		resolve([1,data.Location]);
		    	}
		   });
		});
	})
}

helper.exportCsv= (fields,dataArray,fileName,res) => {
	const json2csv= new Parser({fields});
	if(dataArray.length>0){
		var dataList= dataArray;
	}else{
		var dataList= [];
	}
    try {
        const csv= json2csv.parse(dataList);
        res.attachment(fileName+'.csv');
        res.status(200).send(csv);
    } catch (error) {
        res.status(500).send(error.message)
    }
};

helper.fileUpload= function(request,response){
  	return new promise(function (resolve, reject){
    	var upload= multer({
      		storage: storage,
      		fileFilter: function(request,file,callback) {
	        	var ext= path.extname(file.originalname);
	        	if (ext!== '.csv') {
	          		sendResponse.makeResponse(response, {}, "Only CSV file is allowed", false);
	        	}
	        	callback(null, true);
      		}
    	}).single('uploaded_file');
    	upload(request, response, function(err) {
      		resolve(request.file);
    	}) 
  	})
}

module.exports= helper;