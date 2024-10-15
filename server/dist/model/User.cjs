"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/model/User.ts
var User_exports = {};
__export(User_exports, {
  User: () => User
});
module.exports = __toCommonJS(User_exports);

// src/config/db.ts
var import_mysql = __toESM(require("mysql"), 1);
var import_dotenv = require("dotenv");
(0, import_dotenv.config)();
var db = import_mysql.default.createConnection({
  host: process.env.DB_HOST || "10.12.100.156",
  user: process.env.DB_USER || "root",
  database: process.env.DB_NAME || "calibrator-control",
  password: process.env.DB_PASSWORD || "Helpdesk4202"
});

// src/model/User.ts
var _User = class _User {
};
_User.findByCalibrator = (calibratorId) => __async(_User, null, function* () {
  return new Promise((resolve, reject) => __async(_User, null, function* () {
    const sql = `SELECT 
                id, calibrator_id, calibrator_type, calibrator_description, calibrator_model, location, departament, input_date, out_date 
                FROM historic 
                WHERE calibrator_id = ?`;
    yield db.query(sql, [calibratorId], (err, data) => {
      if (err) {
        return reject({ message: "Erro na consulta sql" });
      }
      if (data && data.length > 0) {
        return resolve(data);
      } else {
        return reject({ message: "N\xE3o foi encontrado calibrador com esse c\xF3digo" });
      }
    });
  }));
});
_User.createNewRegister = (_0) => __async(_User, [_0], function* ({ calibrator_id, calibrator_type, calibrator_description, calibrator_model, location, departament, input_date, out_date }) {
  return new Promise((resolve, reject) => __async(_User, null, function* () {
    const query = `INSERT INTO historic 
            (calibrator_id, calibrator_type, calibrator_description, calibrator_model, location, departament, input_date, out_date) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    yield db.query(query, [
      calibrator_id,
      calibrator_type,
      calibrator_description,
      calibrator_model,
      location,
      departament,
      input_date,
      out_date
    ], (err, data) => {
      if (err) {
        console.log(err);
        reject({ message: "Erro no servidor ao atualizar os dados!", error: err });
      }
      if (data.affectedRows > 0) {
        resolve({ message: `O calibrador ${calibrator_id}, mudou de ${location} (${departament}), para ${location} (${departament})` });
      } else {
        console.log("err");
        reject({ message: "Erro no servidor ao atualizar os dados!" });
      }
    });
  }));
});
_User.updateLocationAndOutDate = (historicId, newOutDate) => __async(_User, null, function* () {
  return new Promise((resolve, reject) => __async(_User, null, function* () {
    const query = `UPDATE historic 
            SET out_date = ? WHERE id = ?`;
    yield db.query(query, [
      newOutDate,
      historicId
    ], (error, data) => {
      if (error) {
        console.log(error);
        reject({ message: "Erro no servidor ao atualizar dados!", error });
      }
      if (data.affectedRows > 0) {
        resolve({ message: "Dados atualizados com sucesso!" });
      } else {
        console.log("Erro incomum");
        reject({ message: "Erro no servidor ao atualizar dados!" });
      }
    });
  }));
});
var User = _User;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  User
});
