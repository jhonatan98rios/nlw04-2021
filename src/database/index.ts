import { Connection, createConnection, getConnectionOptions } from 'typeorm'

export default async (): Promise<Connection> =>{

    const defaultOptions = await getConnectionOptions()

    return createConnection(
        Object.assign(defaultOptions, {
            database: process.env.NODE_ENV === "test" ? 
                "./src/database/database.test.sqlite" : 
                defaultOptions.database
        })
    )
}


/* 
typeorm commands
yarn typeorm migration:run >> run all migrations
yarn typeorm migration:revert >> revert the last migration
*/