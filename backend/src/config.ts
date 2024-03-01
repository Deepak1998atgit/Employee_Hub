import dotenv from 'dotenv';
dotenv.config();

const configKeys = {

   DB_CLUSTER_URL:process.env.DB_CLUSTER_URL as string,

  PORT: process.env.PORT,

  DB_NAME: process.env.DB_NAME, 

  JWT_SECRET: process.env.JWT_SECRET as string,


};

export default configKeys;