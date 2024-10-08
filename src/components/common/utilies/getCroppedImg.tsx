export type Area = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export const getCroppedImg = (
  imageSrc: string,
  pixelCrop: Area
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }

      const { width, height } = pixelCrop;
      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        width,
        height,
        0,
        0,
        width,
        height
      );

      canvas.toBlob(
        (blob) => {
          if (blob) {
            // Create a URL for the blob
            const croppedImageUrl = URL.createObjectURL(blob);
            resolve(croppedImageUrl);
          } else {
            reject(new Error('Failed to create cropped image blob'));
          }
        },
        'image/jpeg',
        1
      );
    };

    image.onerror = (error) => {
      reject(error);
    };
  });
};


