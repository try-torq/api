import * as express from 'express';
import * as multer from 'multer';

import { ImageUploadService } from '../services';

export class RootRoutes {
  private static async uploadProfilePictureHandler(req: express.Request, res: express.Response): Promise<void> {
    const { file } = req;
    const uri = await ImageUploadService.uploadProfilePicture(file);
    res.status(200).json({
      success: true,
      uri,
    });
  }

  private static async uploadPostPictureHandler(req: express.Request, res: express.Response): Promise<void> {
    const { file } = req;
    const uri = await ImageUploadService.uploadPostPicture(file);
    res.status(200).json({
      success: true,
      uri
    })
  }

  public static mount(app: express.Application): void {
    app.post('/uploadProfilePicture', ImageUploadService.single, this.uploadProfilePictureHandler);
    app.post('/uploadPostPicture', ImageUploadService.single, this.uploadPostPictureHandler);
  }
}
