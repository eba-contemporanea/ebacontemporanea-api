const mongouser = 'admin';
const mongopw = 'admin123';

const mongourl = (collection) => (`mongodb+srv://${mongouser}:${mongopw}@eba-db.kbpkj.mongodb.net/${collection}?retryWrites=true&w=majority`);

module.exports = {
    mongourl
}