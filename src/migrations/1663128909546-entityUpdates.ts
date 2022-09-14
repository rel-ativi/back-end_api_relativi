import { MigrationInterface, QueryRunner } from "typeorm";

export class entityUpdates1663128909546 implements MigrationInterface {
    name = 'entityUpdates1663128909546'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "days" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(16) NOT NULL, "number" integer NOT NULL, CONSTRAINT "PK_c2c66eb46534bea34ba48cc4d7f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "activity_schedule" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "hour" TIME NOT NULL, CONSTRAINT "PK_0d179e36c22978e1b875816a489" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cities" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(32) NOT NULL, CONSTRAINT "UQ_a0ae8d83b7d32359578c486e7f6" UNIQUE ("name"), CONSTRAINT "PK_4762ffb6e5d198cfec5606bc11e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "countries" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(32) NOT NULL, CONSTRAINT "UQ_fa1376321185575cf2226b1491d" UNIQUE ("name"), CONSTRAINT "PK_b2d7006793e8697ab3ae2deff18" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "districts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(32) NOT NULL, CONSTRAINT "UQ_6a6fd6d258022e5576afbad90b4" UNIQUE ("name"), CONSTRAINT "PK_972a72ff4e3bea5c7f43a2b98af" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bank_info" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "bank" character varying(16) NOT NULL, "agency" character varying(16) NOT NULL, "account_number" character varying(16) NOT NULL, CONSTRAINT "PK_3f7f2f080380ab7c06adcbe04cf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "payment_info" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "card_name" character varying(128) NOT NULL, "card" character varying(64) NOT NULL, "due_date" date NOT NULL, "sec_code" integer NOT NULL, CONSTRAINT "PK_b2ba4f3b3f40c6a37e54fb8b252" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_activity_history" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" date NOT NULL, "hour" TIME NOT NULL, "activityId" uuid, "profileId" uuid, CONSTRAINT "PK_7720a890d0eeca5ea50d2b8b9c5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_certifications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(128) NOT NULL, "emmited_by" character varying(128) NOT NULL, "emission_date" date NOT NULL, "expiration_date" date, "profileId" uuid, CONSTRAINT "PK_9951122e9d864429886105c6448" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_schedule" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" date NOT NULL, "hour" TIME NOT NULL, "activityId" uuid, "profileId" uuid, CONSTRAINT "PK_1c68f6861388e111e080b7ea766" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "profiles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "bio" character varying(512), "phone" character varying(24), "addressId" uuid, "bankInfoId" uuid, "paymentInfoId" uuid, CONSTRAINT "REL_33e2671fc5a4f3bc5ba6a8b394" UNIQUE ("addressId"), CONSTRAINT "REL_ade582ccdd65522e01f22e29a3" UNIQUE ("bankInfoId"), CONSTRAINT "REL_35c26e5d9b58c32bdfbb660d90" UNIQUE ("paymentInfoId"), CONSTRAINT "PK_8e520eb4da7dc01d0e190447c8e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "states" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(32) NOT NULL, CONSTRAINT "UQ_fe52f02449eaf27be2b2cb7acda" UNIQUE ("name"), CONSTRAINT "PK_09ab30ca0975c02656483265f4f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "addresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "street" character varying(64) NOT NULL, "number" character varying(16) NOT NULL, "zip_code" character varying(8) NOT NULL, "createdById" uuid, "districtId" uuid, "cityId" uuid, "stateId" uuid, "countryId" uuid, CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(60) NOT NULL, CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "activities" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(128) NOT NULL, "price" numeric(8,2) NOT NULL, "min_users" integer NOT NULL DEFAULT '1', "max_users" integer NOT NULL, "duration" character varying(4) NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "recurrent" boolean NOT NULL DEFAULT false, "starting_date" date NOT NULL, "image_url" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "createdById" uuid, "categoryId" uuid, "addressId" uuid, "activityScheduleId" uuid, CONSTRAINT "REL_5803aa050358a4d5619c270a09" UNIQUE ("addressId"), CONSTRAINT "REL_0e2bc0e1180cce4963c1274c18" UNIQUE ("activityScheduleId"), CONSTRAINT "PK_7f4004429f731ffb9c88eb486a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(128) NOT NULL, "email" character varying(48) NOT NULL, "password" character varying(128) NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "is_adm" boolean NOT NULL DEFAULT false, "is_pro_user" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "profileId" uuid, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "REL_b1bda35cdb9a2c1b777f5541d8" UNIQUE ("profileId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "activity_schedule_days_days" ("activityScheduleId" uuid NOT NULL, "daysId" uuid NOT NULL, CONSTRAINT "PK_2d9af713178f771fd69ac7bce0a" PRIMARY KEY ("activityScheduleId", "daysId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6b7582efdd2448807a367e4711" ON "activity_schedule_days_days" ("activityScheduleId") `);
        await queryRunner.query(`CREATE INDEX "IDX_1c884c763b25628c892b7af70d" ON "activity_schedule_days_days" ("daysId") `);
        await queryRunner.query(`CREATE TABLE "profiles_favorite_activities_activities" ("profilesId" uuid NOT NULL, "activitiesId" uuid NOT NULL, CONSTRAINT "PK_97e892b9d9373c07314eb7fdc3c" PRIMARY KEY ("profilesId", "activitiesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fd15133176bf719dfa09090e4a" ON "profiles_favorite_activities_activities" ("profilesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d202bfd51913e2a9b1351c5b18" ON "profiles_favorite_activities_activities" ("activitiesId") `);
        await queryRunner.query(`ALTER TABLE "user_activity_history" ADD CONSTRAINT "FK_f36b4336ed7a514b5af64ec9363" FOREIGN KEY ("activityId") REFERENCES "activities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_activity_history" ADD CONSTRAINT "FK_9619d12b39bc548afa98132c898" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_certifications" ADD CONSTRAINT "FK_5e88afcf4c79416a1bebdce15a5" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_schedule" ADD CONSTRAINT "FK_287d8ece343630dfd11e87a7bd2" FOREIGN KEY ("activityId") REFERENCES "activities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_schedule" ADD CONSTRAINT "FK_4c0d2dc60ee8fc23ddb2abbe09e" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "profiles" ADD CONSTRAINT "FK_33e2671fc5a4f3bc5ba6a8b3942" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "profiles" ADD CONSTRAINT "FK_ade582ccdd65522e01f22e29a32" FOREIGN KEY ("bankInfoId") REFERENCES "bank_info"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "profiles" ADD CONSTRAINT "FK_35c26e5d9b58c32bdfbb660d906" FOREIGN KEY ("paymentInfoId") REFERENCES "payment_info"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_62d93f5f84d128f1fe834f077e2" FOREIGN KEY ("createdById") REFERENCES "profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_f975b3c53730463bc607d23bf8b" FOREIGN KEY ("districtId") REFERENCES "districts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_221420cb636d4e9e48aeca528a0" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_debce902ec6af918010a7b04264" FOREIGN KEY ("stateId") REFERENCES "states"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_589483c676701aa3bbb2695daf2" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "activities" ADD CONSTRAINT "FK_579056df0c92b0f6432e96b2048" FOREIGN KEY ("createdById") REFERENCES "profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "activities" ADD CONSTRAINT "FK_da47c633d8bb7ee8ca9009788d4" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "activities" ADD CONSTRAINT "FK_5803aa050358a4d5619c270a093" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "activities" ADD CONSTRAINT "FK_0e2bc0e1180cce4963c1274c180" FOREIGN KEY ("activityScheduleId") REFERENCES "activity_schedule"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_b1bda35cdb9a2c1b777f5541d87" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "activity_schedule_days_days" ADD CONSTRAINT "FK_6b7582efdd2448807a367e4711d" FOREIGN KEY ("activityScheduleId") REFERENCES "activity_schedule"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "activity_schedule_days_days" ADD CONSTRAINT "FK_1c884c763b25628c892b7af70d4" FOREIGN KEY ("daysId") REFERENCES "days"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "profiles_favorite_activities_activities" ADD CONSTRAINT "FK_fd15133176bf719dfa09090e4a0" FOREIGN KEY ("profilesId") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "profiles_favorite_activities_activities" ADD CONSTRAINT "FK_d202bfd51913e2a9b1351c5b18c" FOREIGN KEY ("activitiesId") REFERENCES "activities"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profiles_favorite_activities_activities" DROP CONSTRAINT "FK_d202bfd51913e2a9b1351c5b18c"`);
        await queryRunner.query(`ALTER TABLE "profiles_favorite_activities_activities" DROP CONSTRAINT "FK_fd15133176bf719dfa09090e4a0"`);
        await queryRunner.query(`ALTER TABLE "activity_schedule_days_days" DROP CONSTRAINT "FK_1c884c763b25628c892b7af70d4"`);
        await queryRunner.query(`ALTER TABLE "activity_schedule_days_days" DROP CONSTRAINT "FK_6b7582efdd2448807a367e4711d"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_b1bda35cdb9a2c1b777f5541d87"`);
        await queryRunner.query(`ALTER TABLE "activities" DROP CONSTRAINT "FK_0e2bc0e1180cce4963c1274c180"`);
        await queryRunner.query(`ALTER TABLE "activities" DROP CONSTRAINT "FK_5803aa050358a4d5619c270a093"`);
        await queryRunner.query(`ALTER TABLE "activities" DROP CONSTRAINT "FK_da47c633d8bb7ee8ca9009788d4"`);
        await queryRunner.query(`ALTER TABLE "activities" DROP CONSTRAINT "FK_579056df0c92b0f6432e96b2048"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_589483c676701aa3bbb2695daf2"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_debce902ec6af918010a7b04264"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_221420cb636d4e9e48aeca528a0"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_f975b3c53730463bc607d23bf8b"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_62d93f5f84d128f1fe834f077e2"`);
        await queryRunner.query(`ALTER TABLE "profiles" DROP CONSTRAINT "FK_35c26e5d9b58c32bdfbb660d906"`);
        await queryRunner.query(`ALTER TABLE "profiles" DROP CONSTRAINT "FK_ade582ccdd65522e01f22e29a32"`);
        await queryRunner.query(`ALTER TABLE "profiles" DROP CONSTRAINT "FK_33e2671fc5a4f3bc5ba6a8b3942"`);
        await queryRunner.query(`ALTER TABLE "user_schedule" DROP CONSTRAINT "FK_4c0d2dc60ee8fc23ddb2abbe09e"`);
        await queryRunner.query(`ALTER TABLE "user_schedule" DROP CONSTRAINT "FK_287d8ece343630dfd11e87a7bd2"`);
        await queryRunner.query(`ALTER TABLE "user_certifications" DROP CONSTRAINT "FK_5e88afcf4c79416a1bebdce15a5"`);
        await queryRunner.query(`ALTER TABLE "user_activity_history" DROP CONSTRAINT "FK_9619d12b39bc548afa98132c898"`);
        await queryRunner.query(`ALTER TABLE "user_activity_history" DROP CONSTRAINT "FK_f36b4336ed7a514b5af64ec9363"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d202bfd51913e2a9b1351c5b18"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fd15133176bf719dfa09090e4a"`);
        await queryRunner.query(`DROP TABLE "profiles_favorite_activities_activities"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1c884c763b25628c892b7af70d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6b7582efdd2448807a367e4711"`);
        await queryRunner.query(`DROP TABLE "activity_schedule_days_days"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "activities"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
        await queryRunner.query(`DROP TABLE "states"`);
        await queryRunner.query(`DROP TABLE "profiles"`);
        await queryRunner.query(`DROP TABLE "user_schedule"`);
        await queryRunner.query(`DROP TABLE "user_certifications"`);
        await queryRunner.query(`DROP TABLE "user_activity_history"`);
        await queryRunner.query(`DROP TABLE "payment_info"`);
        await queryRunner.query(`DROP TABLE "bank_info"`);
        await queryRunner.query(`DROP TABLE "districts"`);
        await queryRunner.query(`DROP TABLE "countries"`);
        await queryRunner.query(`DROP TABLE "cities"`);
        await queryRunner.query(`DROP TABLE "activity_schedule"`);
        await queryRunner.query(`DROP TABLE "days"`);
    }

}
