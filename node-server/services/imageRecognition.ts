import Jimp from 'jimp';
import redisClient from '@utilities/redisClient';
import Image from '@models/image';

class ImageSimilaritySearch{
    private dimensions: number;

    constructor(dimensions: number = 64){
        this.dimensions = dimensions;
    };

    static async calculatePHash(imagePath: string): Promise<number[]>{
        const cachedHash = await redisClient.get(`vision/phash:${imagePath}`);
        if(cachedHash) return JSON.parse(cachedHash);
        const image = await Jimp.read(imagePath);
        image.resize(32, 32);
        image.grayscale();
        image.normalize();
        let hash = 0;
        for(let x = 0; x < 32; x++){
            for(let y = 0; y < 32; y++){
                const pixel = Jimp.intToRGBA(image.getPixelColor(x, y));
                hash += (pixel.r > 128) ? 1 : 0;
            }
        }
        const pHash = hash.toString(2).split('').map((bit) => parseInt(bit, 10));
        await redisClient.set(`vision/phash:${imagePath}`);
        return pHash;
    };

    async findSimilarImages(queryImagePath: string, numResults: number = 10): Promise<{ imagePath: string; distance: number }[]>{
        const queryHash = await ImageSimilaritySearch.calculatePHash(queryImagePath);
        const images = await Image.find({ });
        const distances = images.map((image) => ({
            image,
            distance: this.hammingDistance(queryHash, image.hash)
        }));
        // TODO: is this necessary?, maybe better a filter with the matches
        distances.sort((a, b) => a.distance - b.distance);
        return distances.slice(0, numResults).map(({ image, distance }) => ({
            imagePath: image.path,
            distance
        }));
    };

    private hammingDistance(hash1: number[], hash2: number[]): number{
        let distance = 0;
        for(let i = 0; i < this.dimensions; i++) distance += (hash1[i] ^ hash2[i]);
        return distance;
    };

    async addImage(imagePath: string): Promise<void>{
        const hash = await ImageSimilaritySearch.calculatePHash(imagePath);
        const image = new Image({ path: imagePath, hash });
        await image.save();
    };

    async buildIndex(imagePaths: string[]): Promise<void>{
        for(const imagePath of imagePaths) await this.addImage(imagePath);
    };
};

export default ImageSimilaritySearch;