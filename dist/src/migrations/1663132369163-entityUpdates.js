"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.entityUpdates1663132369163 = void 0;
class entityUpdates1663132369163 {
    constructor() {
        this.name = 'entityUpdates1663132369163';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "activities" DROP CONSTRAINT "FK_5803aa050358a4d5619c270a093"`);
            yield queryRunner.query(`ALTER TABLE "activities" DROP CONSTRAINT "FK_0e2bc0e1180cce4963c1274c180"`);
            yield queryRunner.query(`ALTER TABLE "activities" ADD CONSTRAINT "FK_5803aa050358a4d5619c270a093" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "activities" ADD CONSTRAINT "FK_0e2bc0e1180cce4963c1274c180" FOREIGN KEY ("activityScheduleId") REFERENCES "activity_schedule"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "activities" DROP CONSTRAINT "FK_0e2bc0e1180cce4963c1274c180"`);
            yield queryRunner.query(`ALTER TABLE "activities" DROP CONSTRAINT "FK_5803aa050358a4d5619c270a093"`);
            yield queryRunner.query(`ALTER TABLE "activities" ADD CONSTRAINT "FK_0e2bc0e1180cce4963c1274c180" FOREIGN KEY ("activityScheduleId") REFERENCES "activity_schedule"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "activities" ADD CONSTRAINT "FK_5803aa050358a4d5619c270a093" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        });
    }
}
exports.entityUpdates1663132369163 = entityUpdates1663132369163;
