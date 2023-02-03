"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoEntity = void 0;
const typeorm_1 = require("typeorm");
const index_1 = require("./index");
let VideoEntity = class VideoEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], VideoEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], VideoEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], VideoEntity.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_private" }),
    __metadata("design:type", Boolean)
], VideoEntity.prototype, "isPrivate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => index_1.UserEntity, user => user.video),
    (0, typeorm_1.JoinColumn)({ name: 'owner_id' }),
    __metadata("design:type", index_1.UserEntity)
], VideoEntity.prototype, "owner", void 0);
VideoEntity = __decorate([
    (0, typeorm_1.Entity)("video")
], VideoEntity);
exports.VideoEntity = VideoEntity;
