import mongoose from "mongoose";

const { Schema } = mongoose;

export let bookReviewsModel, auditLogModel;

export function InitMongoConnection(mongoURL) {
    const bookReviewSchema = new Schema({
        bookID: String,
        review: String,
        rating: Number,
    });
    bookReviewsModel = mongoose.model("book_review", bookReviewSchema);

    const auditLogSchema = new Schema({
        log: Schema.Types.Mixed,
        createdBy: String,
        createdAt: Schema.Types.Date,
        updatedBy: String,
        updatedAt: Schema.Types.Date,
    });
    auditLogModel = mongoose.model("audit_log", auditLogSchema);

    try {
        mongoose.connect(mongoURL);
        console.log("mongo connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the mongo database:", error);
    }
}
