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
exports.AccessEntity = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const video_entity_1 = require("./video.entity");
let AccessEntity = class AccessEntity {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], AccessEntity.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], AccessEntity.prototype, "video_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AccessEntity.prototype, "access", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => user_entity_1.UserEntity, user => user.accesses, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_entity_1.UserEntity)
], AccessEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => video_entity_1.VideoEntity, video => video.accesses, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: "videoId" }),
    __metadata("design:type", video_entity_1.VideoEntity)
], AccessEntity.prototype, "video", void 0);
AccessEntity = __decorate([
    (0, typeorm_1.Entity)()
], AccessEntity);
exports.AccessEntity = AccessEntity;
