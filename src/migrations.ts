import sequelize from './sequelize';
import * as dotenv from 'dotenv';

dotenv.config();

const sqlScripts = [
    'ALTER TABLE `todos` CHANGE `complete` `done` TINYINT(1) NOT NULL;',
  ];
let i = parseInt(process.env.MIGRATION?process.env.MIGRATION:'0');

// const migrations = (async () => {
//   await sequelize.query("ALTER TABLE `todos` CHANGE `done` `complete` TINYINT(1) NOT NULL;")
//   .then(() => console.log('Column renamed successfully'))
//   .catch((error) => console.log('Error while renaming column', error));
// })();

  if(i >= sqlScripts.length)
  console.log(`Nothing to migrate`)
  else{
    for ( i ; i < sqlScripts.length; i++) {
    console.log(i);
    const sqlScript = sqlScripts[i];
    sequelize.query(sqlScript)
      .then(() => console.log(`SQL script ${i+1} executed successfully`))
      .catch((error) =>{ 
        process.env.MIGRATION = i.toString() ;

        console.log(`Error while executing SQL script ${i+1}`, error)
      });
  }
}


