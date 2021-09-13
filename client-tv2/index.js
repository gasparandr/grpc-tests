const PROTO_PATH = __dirname + '/../proto-tv2/mygameprogram_service.proto';

const grpc = require('@grpc/grpc-js');
const loader = require('@grpc/proto-loader');
const fs = require('fs');
const path = require('path');

const address = '0.0.0.0:8082';

const metadataCreds = grpc.credentials.createFromMetadataGenerator((_, cb) => {
  const metadata = new grpc.Metadata();
  metadata.set('Authorization', 'testtoken12312312');
  cb(null, metadata);
});

const rootCert = fs.readFileSync(
  path.resolve(__dirname, '../certs/ca-cert.pem')
);

const sslCreds = grpc.credentials.createSsl(rootCert);

const packageDef = loader.loadSync(PROTO_PATH);

const myGameProgramPackage =
  grpc.loadPackageDefinition(packageDef).mygameprogram.api.v1;

const client = new myGameProgramPackage.MygameprogramService(
  address,
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

const createGoogleTimestampFromDate = (date) => {
  return { seconds: Math.floor(date.getTime() / 1000) };
};

function onClientReady() {
  const dateTest = createGoogleTimestampFromDate(new Date());

  client.CreateAsset(
    {
      associationId: 'association_id',
      categoryId: 'category_id',
      matchStart: dateTest,
      title: 'The title',
      assetPublishingDetails: {
        exposureStart: dateTest,
        exposureEnd: dateTest,
        publicationStart: dateTest,
        publicationEnd: dateTest,
      },
    },
    (err, result) => {
      if (err) {
        console.error(err);
        return;
      }

      console.log(result);
    }
  );
}
