import { DataSource } from "typeorm"
import { User } from "./entity/User.entity"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "1111",
    database: "test-gallery",
    synchronize: true,
    logging: true,
    entities: [User],
    migrations: [],
})