import { createConnection } from "typeorm";

createConnection();

// sudo docker run --name postgres -e POSTGRES_PASSWORD=docker -p 15432:5432 -d postgres

/**
 * {
    name: 'created_at',
    type: 'timestamp with time zone',
    default: 'now()',
  },
  {
    name: 'updated_at',
    type: 'timestamp with time zone',
    default: 'now()',
  },
*/
