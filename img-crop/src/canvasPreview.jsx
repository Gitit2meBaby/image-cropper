const TO_RADIANS = Math.PI / 180;

export async function canvasPreview(
    image,
    canvas,
    crop,
    scale = 1,
    rotate = 0
) {
    const ctx = canvas.getContext('2d');

    if (!ctx) {
        throw new Error('No 2d context');
    }

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const pixelRatio = window.devicePixelRatio;

    canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
    canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

    ctx.scale(pixelRatio, pixelRatio);
    ctx.imageSmoothingQuality = 'high';

    const cropX = crop.x * scaleX;
    const cropY = crop.y * scaleY;

    const rotateRads = rotate * TO_RADIANS;
    const centerX = image.naturalWidth / 2;
    const centerY = image.naturalHeight / 2;

    ctx.save();

    ctx.translate(-cropX, -cropY);
    ctx.translate(centerX, centerY);
    ctx.rotate(rotateRads);
    ctx.scale(scale, scale);
    ctx.translate(-centerX, -centerY);
    ctx.drawImage(
        image,
        0,
        0,
        image.naturalWidth,
        image.naturalHeight,
        0,
        0,
        image.naturalWidth,
        image.naturalHeight
    );

    ctx.restore();
}




// import { PixelCrop } from 'react-image-crop';

// const TO_RADIANS = Math.PI / 180;

// export async function canvasPreview(
//     image: HTMLImageElement,
//     canvas: HTMLCanvasElement,
//     crop: PixelCrop,
//     targetWidth: number,
//     targetHeight: number,
//     scale = 1,
//     rotate = 0,
// ) {
//     const ctx = canvas.getContext('2d');

//     if (!ctx) {
//         throw new Error('No 2d context');
//     }

//     const scaleX = image.naturalWidth / image.width;
//     const scaleY = image.naturalHeight / image.height;
//     const pixelRatio = window.devicePixelRatio;

//     canvas.width = Math.floor(targetWidth * pixelRatio);
//     canvas.height = Math.floor(targetHeight * pixelRatio);

//     ctx.scale(pixelRatio, pixelRatio);
//     ctx.imageSmoothingQuality = 'high';

//     const cropX = crop.x * scaleX;
//     const cropY = crop.y * scaleY;

//     const rotateRads = rotate * TO_RADIANS;
//     const centerX = image.naturalWidth / 2;
//     const centerY = image.naturalHeight / 2;

//     ctx.save();

//     ctx.translate(-cropX, -cropY);
//     ctx.translate(centerX, centerY);
//     ctx.rotate(rotateRads);
//     ctx.scale(scale, scale);
//     ctx.translate(-centerX, -centerY);

//     // Resize the image before drawing
//     ctx.drawImage(
//         image,
//         0,
//         0,
//         image.naturalWidth,
//         image.naturalHeight,
//         0,
//         0,
//         targetWidth,
//         targetHeight,
//     );

//     ctx.restore();
// }

