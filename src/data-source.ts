import "dotenv/config";

import { DataSource } from "typeorm";

// const host =
//   process.env.APP_ENV === "docker" ? process.env.DB_HOST : "localhost";

// const password =
//   process.env.APP_ENV === "docker" ? process.env.DB_PASSWORD : "1234";

const AppDataSource = new DataSource(
  process.env.NODE_ENV === "test"
    ? {
        type: "sqlite",
        database: ":memory:",
        synchronize: true,
        entities: ["src/entities/*.ts"],
      }
    : {
        type: "postgres",
        url: process.env.DATABASE_URL,
        ssl:
          process.env.NODE_ENV === "production"
            ? { rejectUnauthorized: false }
            : false,
        logging: true,
        synchronize: false,
        entities:
          process.env.NODE_ENV === "production"
            ? ["dist/entities/*.js"]
            : ["src/entities/*.ts"],
        migrations:
          process.env.NODE_ENV === "production"
            ? ["dist/migrations/*.js"]
            : ["src/migrations/*.ts"],
      }
);

export default AppDataSource;
