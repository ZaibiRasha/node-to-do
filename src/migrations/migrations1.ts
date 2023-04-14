import sequelize from '../sequelize';

const migrations = (async () => {
  await sequelize.query("ALTER TABLE `todos` CHANGE `done` `complete` TINYINT(1) NOT NULL;")
  .then(() => console.log('Column renamed successfully'))
  .catch((error) => console.log('Error while renaming column', error));
})();

export { migrations };

