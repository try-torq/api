import * as express from 'express';
import * as storage from '@google-cloud/storage';
import * as multer from 'multer';

import { Environment, Logger } from '../core';

export class ImageUploadService {
  private static log = Logger('app:services:ImageUploadService');

  private static _multer = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 /* 5mb limit */ }
  });

  private static _storage = storage({
    projectId: Environment.config.cloudStorage.projectId,
    credentials: {
      client_email: Environment.config.cloudStorage.clientEmail,
      private_key: Environment.config.cloudStorage.privateKey,
    },
  });

  private static _bucket = ImageUploadService._storage.bucket('torq-f0c17.appspot.com')

  private static _uploadImage(directory: string, file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      const filename = `${file.originalname}_${Date.now()}`;
      const uploadRef = this._bucket.file(`${directory}/${filename}`);

      const blobStream = uploadRef.createWriteStream({
        metadata: { contentType: file.mimetype }
      });

      blobStream.on('error', err => {
        this.log.error(`Error uploading image to gcloud: ${err.message}`);
        reject(err);
      });
      blobStream.on('finish', async () => {
        const url = await uploadRef.getSignedUrl({
          action: 'read',
          expires: '03-09-2491',
        });
        this.log.info(`Uploaded image to gcloud: ${url}`);
        resolve(url.pop());
      });

      blobStream.end(file.buffer);
    })
  }

  public static get single(): express.RequestHandler {
    return this._multer.single('file');
  }

  public static uploadProfilePicture(file: Express.Multer.File): Promise<string> {
    return this._uploadImage('/profile-pictures', file);
  }

  public static uploadPostPicture(file: Express.Multer.File): Promise<string> {
    return this._uploadImage('/post-pictures', file);
  }
  
}
