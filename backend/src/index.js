import connectDB from "./db/index.js";
import dotenv from "dotenv";
import app from "./app.js";
import userRoutes from "./routes/userRoutes.js";
import vendorRoutes from "./routes/vendorRoutes.js";
import experienceRoutes from "./routes/experienceRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import demoRoutes from "./routes/demoRoutes.js";

dotenv.config();


connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️   Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})

app.use('/api/users', userRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/experiences', experienceRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/seed', demoRoutes );