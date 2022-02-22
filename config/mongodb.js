const mongouser = 'admin';
const mongopw = 'admin123';

const mongourl = `mongodb+srv://${mongouser}:${mongopw}@eba-db.kbpkj.mongodb.net/artistas?retryWrites=true&w=majority`;

module.exports = {
    mongourl
}