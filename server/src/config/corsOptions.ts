export const corsOptions={
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}
