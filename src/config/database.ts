const dirPath = process.env.TS_NODE ? 'src' : 'dist';

export default {
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: 3306,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    migrationsRun: false,
    entities: [`${dirPath}/**/*.entity{.ts,.js}`],
    synchronize: true,
    // migrations: ["migrations/**/*.ts", "migrations/**/*.js"],
    cli: {
        // "migrationsDir": "migrations"
    },
};
