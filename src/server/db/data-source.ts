import "reflect-metadata"
import { DataSource } from "typeorm"
import { Image } from "../models/image.js"
import "reflect-metadata"

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "anyaaven",
  password: "",
  database: "pixly",
  synchronize: true,
  logging: true,
  entities: [Image],
  subscribers: [],
  migrations: [],
})