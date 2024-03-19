const config = {
  port: process.env.PORT || 3000,
  databaseUrl: process.env.MONGODB_URI || 'mongodb+srv://scoobychrupka:chrupka@cluster0.2a2ibrs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  JwtSecret: process.env.JWT_SECRET || 'secret_token'
};

export default config;

