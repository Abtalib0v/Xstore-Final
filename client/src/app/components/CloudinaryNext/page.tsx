import { CldUploadWidget } from "next-cloudinary";
export default function CloudinaryNext() {
    return (
        <div>
            <CldUploadWidget signatureEndpoint="/api/sing-image" >
            {({ open }) =>{
                <button onClick={() => open()}>Upload</button>
            } }</CldUploadWidget>
        </div>
    );
}