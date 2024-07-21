import redis, { RedisClientType } from 'redis';

let redisClient: RedisClientType | null = null;

export const redisConnector = async () => {
    try{
        console.log('@utilities/redisClient.ts: Connecting to Redis server...');
        redisClient = redis.createClient({
            socket: {
                host: process.env.REDIS_HOST,
                port: parseInt(process.env.REDIS_PORT) || 6379
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