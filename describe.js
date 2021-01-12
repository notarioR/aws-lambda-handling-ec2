const AWS = require('aws-sdk');
import { success, failure } from "./libs/response-libs";

exports.main = async (event, context, callback) => {
  const ec2 = new AWS.EC2({ region: "us-east-2" });

  var params = {
    DryRun: false
  };
  var instances = [];

  return ec2.describeInstances(params)
    .promise()
    .then((data) => {
      data.Reservations.map((i) =>
        instances.push({
          "ID"    : i.Instances[0].InstanceId,
          "Type"  : i.Instances[0].InstanceType,
          "State" : i.Instances[0].State,
          "Tags"  : i.Instances[0].Tags,
          "DNS"   : i.Instances[0].PublicDnsName
        }),
      );
      return success({body: instances});
    })
    .catch((err) => {
      return failure(err.statusCode, err.message);
    });
};