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
exports.AvatarEntity = void 0;
const typeorm_1 = require("typeorm");
const index_1 = require("./index");
let AvatarEntity = class AvatarEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], AvatarEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AvatarEntity.prototype, "filename", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AvatarEntity.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(type => index_1.UserEntity, user => user.avatar),
    (0, typeorm_1.JoinColumn)({ name: "ownerId" }),
    __metadata("design:type", index_1.UserEntity)
], AvatarEntity.prototype, "owner", void 0);
AvatarEntity = __decorate([
    (0, typeorm_1.Entity)("video")
], AvatarEntity);
exports.AvatarEntity = AvatarEntity;
