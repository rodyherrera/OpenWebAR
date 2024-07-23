import axios from 'axios';
import fs from 'fs/promises';

interface RemoveBackgroundParams{
    url: string;
    model: string;
    a: boolean;
    af: number;
    ab: number;
    ae: number;
    om: boolean;
    ppm: boolean;
};

export const removeBackground = async (params: RemoveBackgroundParams, outputPath: string): Promise<string> => {
    const BASE_URL = process.env.REMBG_API_SERVER + '/api/remove';
    try{
        const response = await axios.get(BASE_URL, {
            params: {
                url: params.url,
                model: params.model,
                a: params.a.toString(),
                af: params.af,
                ab: params.ab,
                ae: params.ae,
                om: params.om.toString(),
                ppm: params.ppm.toString()
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