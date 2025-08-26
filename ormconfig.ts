import * as path from 'node:path';
import * as dotenv from 'dotenv';
dotenv.config();
import { DataSource} from "typeorm";
import configuration from "./src/configs/configuration";


const config = configuration().database;

export default new DataSource({
    type: 'postgres',
    url: config?.url,
    entities: [path.join(process.cwd(), 'dist', 'database', 'entities', '*.js')],
    migrations: [path.join(process.cwd(), 'dist', 'database', 'migrations', '*.js')],
    synchronize: true,

});