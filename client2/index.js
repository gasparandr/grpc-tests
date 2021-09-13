const PROTO_PATH = __dirname + '/../proto/random.proto';

const grpc = require('@grpc/grpc-js');
const loader = require('@grpc/proto-loader');
const fs = require('fs');
const path = require('path');

const packageDef = loader.loadSync(PROTO_PATH);

const randomProto = grpc.loadPackageDefinition(packageDef).randomPackage;

const address = '3.68.194.144:8082';
// const address = 'ec2-3-68-194-144.eu-central-1.compute.amazonaws.com:8082';
// const address = '0.0.0.0:8082';

const metadataCreds = grpc.credentials.createFromMetadataGenerator((_, cb) => {
  const metadata = new grpc.Metadata();
  metadata.set('Authorization', 'testtoken12312312');
  cb(null, metadata);
});

const rootCert = fs.readFileSync(
  path.resolve(__dirname, '../certs/ca-cert.pem')
);

const sslCreds = grpc.credentials.createSsl(rootCert);

const client = new randomProto.Random(address, sslCreds);

const deadline = new Date();
deadline.setSeconds(deadline.getSeconds() + 5);
client.waitForReady(deadline, (err) => {
  if (err) {
    console.error(err);
    return;
  }

  onClientReady();
});

function onClientReady() {
  client.PingPong({ message: 'Ping' }, (err, result) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(result);
  });
}
