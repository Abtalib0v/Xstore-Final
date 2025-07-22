import {v2 as cloudinary} from 'cloudinary';

export async function POST(request: Request) {
    const body = (await request.json()) as {paramsToSing: Record<string,
    string>};
    const { paramsToSing } = body;

    const signature = cloudinary.utils.api_sign_request(paramsToSing,
    process.env.CLOUDINARY_API_SECRET as string);
    
    return Response.json({signature});
}
