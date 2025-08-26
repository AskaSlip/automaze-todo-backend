import * as path from 'node:path';
import * as dotenv from 'dotenv';
dotenv.config();
import { DataSource} from "typeorm";
import configuration from "./src/configs/configuration";


const config = configuration().database;

export default new DataSource({
    type: 'postgres',
    url: config?.url,
    entities: [path.join(process.cwd(), 'dist', 'src', 'database', 'entities', '*.js')],
    migrations: [path.join(process.cwd(), 'dist', 'src', 'database', 'migrations', '*.js')],
    synchronize: true,

});