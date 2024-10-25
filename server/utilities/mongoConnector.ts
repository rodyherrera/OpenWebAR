import mongoose from 'mongoose';

const mongoConnector = async () => {
    const {
        NODE_ENV,
        PRODUCTION_DATABASE,
        DEVELOPMENT_DATABASE,
        MONGO_URI
    } = process.env;

    const databaseName = NODE_ENV === 'production' ? PRODUCTION_DATABASE : DEVELOPMENT_DATABASE;
    const uri = `${MONGO_URI}/${databaseName}`;

    console.log(`@utilities/mongoConnector: connecting to mongodb (${databaseName})...`);

    mongoose.set('strictQuery', false);
    mongoose.set('strictPopulate', false);
    
    const options = {
        maxPoolSize: 10, 
        autoIndex: NODE_ENV !== 'production', 
        connectTimeoutMS: 10000,
        socketTimeoutMS: 45000, 
        authSource: 'admin',
        appName: 'opensearch',
        serverSelectionTimeoutMS: 5000,
        maxIdleTimeMS: 30000,
        retryWrites: true,
    };

    try{
        await mongoose.connect(uri, options);
        console.log(`@utilities/mongoConnector: connected to mongodb (${databaseName})!`);
    }catch(error){
        console.error('@utilities/mongoConnector: error connecting to mongodb:', error);
    }
};

export default mongoConnector;