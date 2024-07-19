async function getFileFromBlobUrl(blobUrl: string): Promise<File> {
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  return new File([blob], 'profileImage.png', { type: blob.type });
}

export default getFileFromBlobUrl