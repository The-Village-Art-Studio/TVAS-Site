export interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

const OUTPUT_SIZE = 800;

export async function createCroppedImageFile(file: File, cropArea: CropArea): Promise<File> {
  const image = await createImageBitmap(file);
  const canvas = document.createElement('canvas');
  canvas.width = OUTPUT_SIZE;
  canvas.height = OUTPUT_SIZE;

  const context = canvas.getContext('2d');
  if (!context) {
    image.close();
    throw new Error('Your browser could not process this image.');
  }

  context.drawImage(
    image,
    cropArea.x,
    cropArea.y,
    cropArea.width,
    cropArea.height,
    0,
    0,
    OUTPUT_SIZE,
    OUTPUT_SIZE,
  );
  image.close();

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (result) => result ? resolve(result) : reject(new Error('Image compression failed.')),
      'image/jpeg',
      0.85,
    );
  });

  return new File([blob], 'upload.jpg', { type: 'image/jpeg' });
}

export async function getUploadResponse(response: Response) {
  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) {
    if (response.status === 413) {
      throw new Error('The image is too large to upload. Please choose a smaller image.');
    }
    throw new Error(`Upload failed (${response.status}). Please try again.`);
  }

  const result = await response.json();
  if (!response.ok || !result.success) {
    throw new Error(result.error || `Upload failed (${response.status}).`);
  }

  return result as { success: true; url: string };
}
