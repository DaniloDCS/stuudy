import multer from 'multer';
import mime from 'mime-types';
import path from 'path';
import fs from 'fs';
import { Request } from 'express';

class Upload {
  private url: string = path.join(__dirname, '..', '..', 'public', 'uploads');

  constructor() { }

  private storage(): multer.StorageEngine {
    return multer.diskStorage({
      destination: (req, file, cb) => {
        if (!fs.existsSync(this.url)) fs.mkdirSync(this.url);
        cb(null, this.url);
      },
      filename: (req, file, cb) => {
        const ext = mime.extension(file.mimetype);
        cb(null, `${Date.now()}.${ext}`);
      }
    });
  }

  private filter() {
    return (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
      const ext = mime.extension(file.mimetype);
      const accept = ['jpg', 'png', 'jpeg'];
      if (accept.includes(`${ext}`)) cb(null, true);
      else cb(null, false);
    }
  }

  get config(): multer.Options {
    return {
      storage: this.storage(),
      filter: this.filter()
    }
  }
}

export const upload = new Upload();