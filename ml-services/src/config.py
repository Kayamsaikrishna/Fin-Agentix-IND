import os
from pydantic import BaseSettings

class Settings(BaseSettings):
    # Application settings
    app_name: str = "Fin-Agentix ML Services"
    app_version: str = "1.0.0"
    
    # Database settings
    database_url: str = os.getenv("DATABASE_URL", "")
    mongodb_url: str = os.getenv("MONGODB_URL", "")
    redis_url: str = os.getenv("REDIS_URL", "")
    
    # AWS settings
    aws_region: str = "ap-south-1"
    s3_bucket: str = os.getenv("S3_BUCKET_NAME", "")
    
    # Model settings
    model_path: str = os.getenv("MODEL_PATH", "./models")
    
    class Config:
        env_file = ".env"

settings = Settings()
