import mongoose from "mongoose";

const { Schema } = mongoose;

export function InitMongoConnection(mongoURL) {
    const bookReviewSchema = new Schema({
        bookID: String,
        review: String,
        rating: Number,
    });
    const bookReviewsModel = mongoose.model("book_review", bookReviewSchema);

    const auditLogSchema = new Schema({
        log: Schema.Types.Mixed,
        createdBy: String,
        createdAt: Schema.Types.Date,
        updatedBy: String,
        updatedAt: Schema.Types.Date,
    });
    const auditLogModel = mongoose.model("audit_log", auditLogSchema);

    try {
        mongoose.connect(mongoURL);
        console.log("mongo connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the mongo database:", error);
    }
}
