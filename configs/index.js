const dotenv = require('dotenv');

dotenv.config({})

export const env = process.env.NODE_ENV || 'development';