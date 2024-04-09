variable "AWS_ACCESS_KEY_ID" {
  default     = ""
  description = "access key to an aws account"
}

variable "AWS_SECRET_ACCESS_KEY" {
  default     = ""
  description = "secret key to an aws account"
}

variable "region" {
  default     = "us-east-1"
  description = "The region to provision resources"
}