import axios from 'axios';
import fs from 'fs/promises';

interface RemoveBackgroundParams{
    url: string;
};

export const removeBackground = async (params: RemoveBackgroundParams, outputPath: string): Promise<string> => {
    const BASE_URL = process.env.REMBG_API_SERVER + '/api/remove';
    try{
        const response = await axios.get(BASE_URL, {
            params: {
                url: params.url
            },
            responseType: 'arraybuffer'
        });
        await fs.writeFile(outputPath, response.data);
        return outputPath;
    }catch(error){
        console.error('@services/removeBackground.ts:', error);
        throw error;
    }
};

export default removeBackground;