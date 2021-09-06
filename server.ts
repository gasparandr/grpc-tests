import path from 'path';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { ProtoGrpcType } from './proto/random';
import { RandomHandlers } from './proto/randomPackage/Random';
import { TodoRequest } from './proto/randomPackage/TodoRequest';
import { TodoResponse } from './proto/randomPackage/TodoResponse';

const PORT = 8082;
const PROTO_FILE = './proto/random.proto';

const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE));

const grpcObj = grpc.loadPackageDefinition(
  packageDef
) as unknown as ProtoGrpcType;

console.log(grpcObj);

const randomPackage = grpcObj.randomPackage;

function main() {
  const server = getServer();

  server.bindAsync(
    `localhost:${PORT}`,
    grpc.ServerCredentials.createInsecure(),
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

const todoList: TodoResponse = { todos: [] };

function getServer() {
  const server = new grpc.Server();
  server.addService(randomPackage.Random.service, {
    PingPong: (req, res) => {
      console.log(req.request);
      res(null, { message: 'Pong' });
    },
    RandomNumbers: (call) => {
      const { maxVal = 10 } = call.request;
      console.log('Max value is: ', maxVal);

      let runCount = 0;

      const id = setInterval(() => {
        runCount = ++runCount;
        call.write({ num: Math.floor(Math.random() * maxVal) });

        if (runCount >= 10) {
          clearInterval(id);
          call.end();
        }
      }, 500);
    },
    TodoList: (call, callback) => {
      call.on('data', (chunk) => {
        todoList.todos?.push(chunk);
        console.log(chunk);
      });

      call.on('end', () => {
        callback(null, { todos: todoList.todos });
      });
    },
  } as RandomHandlers);

  return server;
}

main();
