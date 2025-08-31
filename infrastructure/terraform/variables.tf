variable "aws_region" {
  description = "AWS region for Indian operations"
  type        = string
  default     = "ap-south-1"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "development"
}

variable "vpc_cidr" {
  description = "CIDR block for VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "project_name" {
  description = "Project name"
  type        = string
  default     = "fin-agentix-india"
}

variable "db_username" {
  description = "Database username"
  type        = string
  default     = "fin_agentix_admin"
}

variable "enable_bedrock" {
  description = "Enable AWS Bedrock for AI services"
  type        = bool
  default     = true
}
