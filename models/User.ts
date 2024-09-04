import mongoose from "mongoose";

const { Schema } = mongoose;

const storeSchema = new Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    src: { type: String, required: true },
    tags: { type: [String], required: true },
});

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: [true, "username must be filled."],
        },
        email: {
            type: String,
            unique: true,
            required: [true, "email must be filled."],
        },
        password: {
            type: String,
            required: false,
            // select: false,
        },
        privilege: {
            type: String,
            required: false,
        },
        favoriteStore: {
            type: [storeSchema],
            required: false,
        },
    },
    { timestamps: true }
);

// mongoose.model("User", userSchema) => 需注意這邊的第一個參數User, 在Mongoose中會自動視為小寫開頭及改為複數（結尾加 s), 因此 User 實際上是連到 users collection
export default mongoose.models.User || mongoose.model("User", userSchema);