# aws-lambda-handling-ec2
handle EC2 instance, starting and shutting down them

POST request to start/stop instances:

{
  "instanceRegion": "us-east-2",
  "instanceId": "i-03xxxxxx",
  "action": "start" 
}
