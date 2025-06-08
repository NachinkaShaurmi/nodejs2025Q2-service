import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1749310486230 implements MigrationInterface {
  name = 'InitialMigration1749310486230';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "version" integer NOT NULL DEFAULT '1', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "artists" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "grammy" boolean NOT NULL, CONSTRAINT "PK_09b823d4607d2675dc4ffa82261" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "albums" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "year" integer NOT NULL, "artist_id" uuid, CONSTRAINT "PK_838ebae24d2e12082670ffc95d7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b6465bf462c2ffef5f066bc6f2" ON "albums" ("artist_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "tracks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "duration" integer NOT NULL, "album_id" uuid, "artist_id" uuid, CONSTRAINT "PK_242a37ffc7870380f0e611986e8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fceb1d9483fda6a312af244a80" ON "tracks" ("album_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_495f8b68c75ac5c9b0301a85b3" ON "tracks" ("artist_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "favorites" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "artist_id" uuid, "album_id" uuid, "track_id" uuid, CONSTRAINT "PK_890818d27523748dd36a4d1bdc8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9c7c756540b38ffe4e419c8bc9" ON "favorites" ("artist_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2e46772aaeeaa9770bdb59d466" ON "favorites" ("album_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d8d3b0b8b67970531d4a097a10" ON "favorites" ("track_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "albums" ADD CONSTRAINT "FK_b6465bf462c2ffef5f066bc6f21" FOREIGN KEY ("artist_id") REFERENCES "artists"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" ADD CONSTRAINT "FK_fceb1d9483fda6a312af244a80e" FOREIGN KEY ("album_id") REFERENCES "albums"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" ADD CONSTRAINT "FK_495f8b68c75ac5c9b0301a85b32" FOREIGN KEY ("artist_id") REFERENCES "artists"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites" ADD CONSTRAINT "FK_9c7c756540b38ffe4e419c8bc99" FOREIGN KEY ("artist_id") REFERENCES "artists"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites" ADD CONSTRAINT "FK_2e46772aaeeaa9770bdb59d4668" FOREIGN KEY ("album_id") REFERENCES "albums"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites" ADD CONSTRAINT "FK_d8d3b0b8b67970531d4a097a100" FOREIGN KEY ("track_id") REFERENCES "tracks"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "favorites" DROP CONSTRAINT "FK_d8d3b0b8b67970531d4a097a100"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites" DROP CONSTRAINT "FK_2e46772aaeeaa9770bdb59d4668"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites" DROP CONSTRAINT "FK_9c7c756540b38ffe4e419c8bc99"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" DROP CONSTRAINT "FK_495f8b68c75ac5c9b0301a85b32"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" DROP CONSTRAINT "FK_fceb1d9483fda6a312af244a80e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "albums" DROP CONSTRAINT "FK_b6465bf462c2ffef5f066bc6f21"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d8d3b0b8b67970531d4a097a10"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2e46772aaeeaa9770bdb59d466"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9c7c756540b38ffe4e419c8bc9"`,
    );
    await queryRunner.query(`DROP TABLE "favorites"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_495f8b68c75ac5c9b0301a85b3"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_fceb1d9483fda6a312af244a80"`,
    );
    await queryRunner.query(`DROP TABLE "tracks"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b6465bf462c2ffef5f066bc6f2"`,
    );
    await queryRunner.query(`DROP TABLE "albums"`);
    await queryRunner.query(`DROP TABLE "artists"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
