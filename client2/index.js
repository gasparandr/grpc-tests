const PROTO_PATH = __dirname + '/../proto/random.proto';

const grpc = require('@grpc/grpc-js');
const loader = require('@grpc/proto-loader');

const packageDef = loader.loadSync(PROTO_PATH);

const randomProto = grpc.loadPackageDefinition(packageDef).randomPackage;

const address = '3.68.194.144:8082';
// const address = 'localhost:8082';

const client = new randomProto.Random(
  address,
  grpc.credentials.createInsecure()
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
  client.PingPong({ message: 'Ping' }, (err, result) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(result);
  });
}
