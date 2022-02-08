const mongouser = 'admin';
const mongopw = 'admin123';
const databases = {
    artistas: 'artistas',
    pesquisadores: 'pesquisadores'
};

const mongourl = (db) => `mongodb+srv://${mongouser}:${mongopw}@eba-db.kbpkj.mongodb.net/${databases[db]}?retryWrites=true&w=majority`;

module.exports = {
    mongourl,
    databases
}