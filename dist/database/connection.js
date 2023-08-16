"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _supabasejs = require('@supabase/supabase-js');
require('dotenv/config');

 const connection = _supabasejs.createClient.call(void 0, String(process.env.URL), String(process.env.KEY)); exports.connection = connection;