import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { MygameprogramServiceClient as _mygameprogram_api_v1_MygameprogramServiceClient, MygameprogramServiceDefinition as _mygameprogram_api_v1_MygameprogramServiceDefinition } from './mygameprogram/api/v1/MygameprogramService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  google: {
    protobuf: {
      Timestamp: MessageTypeDefinition
    }
  }
  mygameprogram: {
    api: {
      v1: {
        AssetCreationRequest: MessageTypeDefinition
        AssetCreationResponse: MessageTypeDefinition
        AssetPublishingDetails: MessageTypeDefinition
        MygameprogramService: SubtypeConstructor<typeof grpc.Client, _mygameprogram_api_v1_MygameprogramServiceClient> & { service: _mygameprogram_api_v1_MygameprogramServiceDefinition }
      }
    }
  }
}

