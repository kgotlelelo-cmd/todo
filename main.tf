terraform {
  required_version = "1.6.4"
  required_providers {
    aws = {
        source = "hashicorp/aws"
        version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
  secret_key = var.secret_key
  access_key = var.access_key
}

module "vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name = "Todo-VPC"
  cidr = "10.0.0.0/16"

  azs = ["us-east-1a", "us-east-1b"]
  private_subnets = ["10.0.1.0/24"]
  public_subnets = ["10.0.2.0/24"]

  create_database_subnet_group = true
  database_subnet_group_name = "database_subnet_group"
}