import mongoose from "mongoose";
const url = "mongodb://localhost:27017/yahaya_blog";
// const url = "mongodb+srv://ifere:haaland2020@cluster0-mvvga.mongodb.net/test?retryWrites=true&w=majority"
export const connectMongodb = () => {
    mongoose.connect(
        url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }).then(() => console.log("mongodb database is connected on instance %s","yahaya_blog", url)).catch(console.log);
};