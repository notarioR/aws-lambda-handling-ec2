const AWS = require('aws-sdk');
import { success, failure } from "./libs/response-libs";

exports.handleEC2 = async (event, context, callback) => {
  const body = JSON.parse(event.body);
  const ec2 = new AWS.EC2({ region: body.instanceRegion });

  if (body.action === "start"){
    return ec2.startInstances({ InstanceIds: [body.instanceId] }).promise()
    .then(() => {
      return success({body: 'Successfully started '+body.instanceId});
    }).catch((err) => {
      return failure(err.statusCode, err.message);
    });
  };
  if (body.action === "stop"){
    return ec2.stopInstances({ InstanceIds: [body.instanceId] }).promise()
    .then(() => {
      return success({body: 'Successfully stopped '+body.instanceId});
    }).catch((err) => {
      return failure(err.statusCode, err.message);
    });
  };
  return success({body: 'No matching action required'});
};