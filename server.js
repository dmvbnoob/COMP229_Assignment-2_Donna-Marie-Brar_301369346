import config from './config/config.js' 
import app from './server/express.js'
import mongoose from 'mongoose' 
mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri, { useNewUrlParser: true,
//useCreateIndex: true, 
useUnifiedTopology: true } )
mongoose.connection.on('error', () => {
throw new Error(`unable to connect to database: ${config.mongoUri}`) 
})
app.get("/", (req, res) => {
res.json({ message: "Welcome to DressStore application." });
});
app.listen(config.port, (err) => { 
if (err) {
console.log(err) 
}
console.info('Server started on port %s.', config.port) 
})
