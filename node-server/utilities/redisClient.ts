import redis from 'redis';

let redisClient = null;

export const redisConnector = async () => {
    try{
        console.log('@utilities/redisClient.ts: Connecting to Redis server...');
        redisClient = redis.createClient({
            socket: {
                host: process.env.REDIS_HOST,
                port: process.env.REDIS_PORT
            },
            password: process.env.REDIS_PASSWORD
        });
        await redisClient.connect();
        console.log('@utilities/redisClient.ts: Connected to Redis.');
    }catch(error){
        console.log('utilities/redisClient.ts: Error trying connect to Redis ->', error);
    };
};

export default redisClient;