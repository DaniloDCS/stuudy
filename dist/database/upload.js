"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _mimetypes = require('mime-types'); var _mimetypes2 = _interopRequireDefault(_mimetypes);
var _path = require('path'); var _path2 = _interopRequireDefault(_path);
var _fs = require('fs'); var _fs2 = _interopRequireDefault(_fs);


class Upload {
   __init() {this.url = _path2.default.join(__dirname, '..', '..', 'public', 'uploads')}

  constructor() {;Upload.prototype.__init.call(this); }

   storage() {
    return _multer2.default.diskStorage({
      destination: (req, file, cb) => {
        if (!_fs2.default.existsSync(this.url)) _fs2.default.mkdirSync(this.url);
        cb(null, this.url);
      },
      filename: (req, file, cb) => {
        const ext = _mimetypes2.default.extension(file.mimetype);
        cb(null, `${Date.now()}.${ext}`);
      }
    });
  }

   filter() {
    return (req, file, cb) => {
      const ext = _mimetypes2.default.extension(file.mimetype);
      const accept = ['jpg', 'png', 'jpeg'];
      if (accept.includes(`${ext}`)) cb(null, true);
      else cb(null, false);
    }
  }

  get config() {
    return {
      storage: this.storage(),
      filter: this.filter()
    }
  }
}

 const upload = new Upload(); exports.upload = upload;