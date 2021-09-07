import path from 'path';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { ProtoGrpcType } from './proto/random';
import * as fs from 'fs';

const PORT = 8082;
const PROTO_FILE = './proto/random.proto';

const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE));

const grpcObj = grpc.loadPackageDefinition(
  packageDef
) as unknown as ProtoGrpcType;

// const client = new grpcObj.randomPackage.Random(
//   `localhost:${PORT}`,
//   grpc.credentials.createInsecure()
// );

// const metadataUpdater = (_, cb) => {
//   const metadata = new grpc.Metadata();
//   metadata.set('Authorization', 'testtoken12312312');
//   cb(null, metadata);
// };

const metadataCreds = grpc.credentials.createFromMetadataGenerator((_, cb) => {
  const metadata = new grpc.Metadata();
  metadata.set('Authorization', 'testtoken12312312');
  cb(null, metadata);
});

const rootCert = fs.readFileSync(
  path.resolve(__dirname, './certs/ca-cert.pem')
);
const sslCreds = grpc.credentials.createSsl(rootCert);

const insecureSSL = grpc.credentials.createInsecure();

const client = new grpcObj.randomPackage.Random(
  `0.0.0.0:${PORT}`,
  grpc.credentials.combineChannelCredentials(sslCreds, metadataCreds)
);

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
  const meta = new grpc.Metadata();
  meta.add('Authorization', 'tokenasd123');

  // client.PingPong({ message: 'Ping' }, meta, (err, result) => {
  //   if (err) {
  //     console.error(err);
  //     return;
  //   }
  //   console.log(result);
  // });

  client.PingPong({ message: 'Ping' }, (err, result) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(result);
  });

  // const stream = client.RandomNumbers({ maxVal: 85 });
  // stream.on('data', (chunk) => {
  //   console.log(chunk);
  // });
  // stream.on('end', () => {
  //   console.log('Communication ended.');
  // });
  // const stream = client.TodoList((err, result) => {
  //   if (err) {
  //     console.error(err);
  //     return;
  //   }
  //   console.log(result);
  // });
  // stream.write({ todo: 'walk the wife', status: 'never' });
  // stream.write({ todo: 'walk the dog', status: 'doing' });
  // stream.write({ todo: 'get a real job', status: 'impossible' });
  // stream.write({ todo: 'feed the dog', status: 'done' });
  // stream.end();
}
