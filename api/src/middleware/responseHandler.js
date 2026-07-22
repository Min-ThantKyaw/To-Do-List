const responseHandler = (req, res, next) => {
	res.success = (data = null, message = 'Success', statusCode = 200) => {
		return res.status(statusCode).json({
			success: true,
			message,
			status: statusCode,
			data
		});
	};

	res.error = (message = 'Internal Server Error', statusCode = 500, errors = null) => {
		return res.status(statusCode).json({
			success: false,
			message,
			error: errors
		});
	};

	next();
};

module.exports = responseHandler;
