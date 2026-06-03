import streamifier from 'streamifier';
import { cloudinaryClient } from '../config/cloudinary.js';

function sanitizeOptions(options = {}) {
  const opts = { ...options };

  // Remove deprecated/invalid fields that break transformations
  delete opts.format;
  delete opts.fetch_format;

  // Ensure resource_type defaults to image
  opts.resource_type = opts.resource_type || 'image';

  // Convert simple quality option into an explicit transformation
  if (opts.quality) {
    const quality = opts.quality;
    delete opts.quality;
    opts.transformation = opts.transformation || [];
    opts.transformation.unshift({ quality });
  }

  return opts;
}

export function uploadBuffer(buffer, options = {}) {
  const opts = sanitizeOptions(options);
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinaryClient.uploader.upload_stream(opts, (error, result) => {
      if (error) {
        console.error('Cloudinary upload error:', error, 'opts:', opts);
        return reject(error);
      }
      console.log('Cloudinary upload result:', result && { public_id: result.public_id, secure_url: result.secure_url });
      resolve(result);
    });

    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
}

export async function uploadToCloudinary(buffer, folder = 'portfolio/projects') {
  if (!buffer) throw new Error('Buffer is required for upload');
  const opts = {
    folder,
    resource_type: 'image',
    quality: 'auto',
  };

  const result = await uploadBuffer(buffer, opts);
  return {
    url: result.secure_url,
    publicId: result.public_id,
  };
}

export async function uploadCloudinaryFiles(files = [], folder = 'portfolio/projects') {
  if (!Array.isArray(files)) files = [files];
  const uploads = files.map(async (file) => {
    if (!file || !file.buffer) {
      throw new Error('Invalid file provided to uploadCloudinaryFiles');
    }
    return uploadToCloudinary(file.buffer, folder);
  });

  return Promise.all(uploads);
}

export async function deleteAsset(publicId, resourceType = 'image') {
  if (!publicId) {
    throw new Error('publicId is required for Cloudinary delete');
  }

  return cloudinaryClient.uploader.destroy(publicId, { resource_type: resourceType });
}
