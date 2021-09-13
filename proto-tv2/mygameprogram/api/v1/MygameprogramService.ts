// Original file: proto-tv2/mygameprogram_service.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { AssetCreationRequest as _mygameprogram_api_v1_AssetCreationRequest, AssetCreationRequest__Output as _mygameprogram_api_v1_AssetCreationRequest__Output } from '../../../mygameprogram/api/v1/AssetCreationRequest';
import type { AssetCreationResponse as _mygameprogram_api_v1_AssetCreationResponse, AssetCreationResponse__Output as _mygameprogram_api_v1_AssetCreationResponse__Output } from '../../../mygameprogram/api/v1/AssetCreationResponse';

export interface MygameprogramServiceClient extends grpc.Client {
  CreateAsset(argument: _mygameprogram_api_v1_AssetCreationRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _mygameprogram_api_v1_AssetCreationResponse__Output) => void): grpc.ClientUnaryCall;
  CreateAsset(argument: _mygameprogram_api_v1_AssetCreationRequest, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _mygameprogram_api_v1_AssetCreationResponse__Output) => void): grpc.ClientUnaryCall;
  CreateAsset(argument: _mygameprogram_api_v1_AssetCreationRequest, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _mygameprogram_api_v1_AssetCreationResponse__Output) => void): grpc.ClientUnaryCall;
  CreateAsset(argument: _mygameprogram_api_v1_AssetCreationRequest, callback: (error?: grpc.ServiceError, result?: _mygameprogram_api_v1_AssetCreationResponse__Output) => void): grpc.ClientUnaryCall;
  createAsset(argument: _mygameprogram_api_v1_AssetCreationRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _mygameprogram_api_v1_AssetCreationResponse__Output) => void): grpc.ClientUnaryCall;
  createAsset(argument: _mygameprogram_api_v1_AssetCreationRequest, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _mygameprogram_api_v1_AssetCreationResponse__Output) => void): grpc.ClientUnaryCall;
  createAsset(argument: _mygameprogram_api_v1_AssetCreationRequest, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _mygameprogram_api_v1_AssetCreationResponse__Output) => void): grpc.ClientUnaryCall;
  createAsset(argument: _mygameprogram_api_v1_AssetCreationRequest, callback: (error?: grpc.ServiceError, result?: _mygameprogram_api_v1_AssetCreationResponse__Output) => void): grpc.ClientUnaryCall;
  
}

export interface MygameprogramServiceHandlers extends grpc.UntypedServiceImplementation {
  CreateAsset: grpc.handleUnaryCall<_mygameprogram_api_v1_AssetCreationRequest__Output, _mygameprogram_api_v1_AssetCreationResponse>;
  
}

export interface MygameprogramServiceDefinition extends grpc.ServiceDefinition {
  CreateAsset: MethodDefinition<_mygameprogram_api_v1_AssetCreationRequest, _mygameprogram_api_v1_AssetCreationResponse, _mygameprogram_api_v1_AssetCreationRequest__Output, _mygameprogram_api_v1_AssetCreationResponse__Output>
}
