const AWS = require('aws-sdk');
import { success, failure } from "./libs/response-libs";

exports.handleEC2 = async (event, context, callback) => {
  try{
    const body = JSON.parse(event.body);
    const ec2 = new AWS.EC2({ region: body.instanceRegion });

    if (body.action === "start"){
      return await ec2.startInstances({ InstanceIds: [body.instanceId] }).promise()
      .then((data) => {
        //data.StartingInstances
        return success({body: 'Successfully started '+body.instanceId});
      });
    }
    if (body.action === "stop"){
      return await ec2.stopInstances({ InstanceIds: [body.instanceId] }).promise()
      .then(() => {
        return success({body: 'Successfully stopped '+body.instanceId});
      });
    }
    return success({body: 'No matching required fields'});
  }catch(e){
    return failure({body: "Something went wrong "+e});
  }
};