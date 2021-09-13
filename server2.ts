import path from 'path';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { ProtoGrpcType } from './proto-tv2/mygameprogram_service';
import { MygameprogramServiceHandlers } from './proto-tv2/mygameprogram/api/v1/MygameprogramService';
import { AssetCreationRequest } from './proto-tv2/mygameprogram/api/v1/AssetCreationRequest';
import { AssetCreationResponse } from './proto-tv2/mygameprogram/api/v1/AssetCreationResponse';
import * as fs from 'fs';

const PORT = 8082;
const PROTO_FILE = './proto-tv2/mygameprogram_service.proto';

const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE));

const grpcObj = grpc.loadPackageDefinition(
  packageDef
) as unknown as ProtoGrpcType;

const myGameProgramPackage = grpcObj.mygameprogram.api.v1;

const rootCert = fs.readFileSync(
  path.resolve(__dirname, './certs/ca-cert.pem')
);
const serverKey = fs.readFileSync(
  path.resolve(__dirname, './certs/server-key.pem')
);
const serverCert = fs.readFileSync(
  path.resolve(__dirname, './certs/server-cert.pem')
);

const sslCreds = grpc.ServerCredentials.createSsl(rootCert, [
  {
    private_key: serverKey,
    cert_chain: serverCert,
  },
]);

function main() {
  const server = getServer();

  server.bindAsync(
    `0.0.0.0:${PORT}`,
    // grpc.ServerCredentials.createInsecure(),
    sslCreds,
    (err, port) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`Your server has started on port ${port}`);
      server.start();
    }
  );
}

function getServer() {
  const server = new grpc.Server();
  server.addService(myGameProgramPackage.MygameprogramService.service, {
    CreateAsset: (call, res) => {
      console.log('TOKEN: ', call.metadata.get('authorization')[0]);
      console.log(call.request);

      res(null, {
        assetId: 'this-is-the-asset-id',
        uniqueId: 'this-is-the-unique-id',
      });
    },
  } as MygameprogramServiceHandlers);

  return server;
}

main();
