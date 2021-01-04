'use strict';
const AWS = require('aws-sdk');

exports.hello = async (event, context, callback) => {
const body = JSON.parse(event.body)

const ec2 = new AWS.EC2({ region: body.instanceRegion });

if (body.action === "start"){
  return ec2.startInstances({ InstanceIds: [body.instanceId] }).promise()
  .then(() => `Successfully started ${body.instanceId}`)
  .catch(err => `Something went wrong ${err}`);
}
if (body.action === "stop"){
  return ec2.stopInstances({ InstanceIds: [body.instanceId] }).promise()
  .then(() => `Successfully stopped ${body.instanceId}`)
  .catch(err => `Something went wrong ${err}`);
}
 
};