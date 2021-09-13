// Original file: proto-tv2/mygameprogram_service.proto

import type { Timestamp as _google_protobuf_Timestamp, Timestamp__Output as _google_protobuf_Timestamp__Output } from '../../../google/protobuf/Timestamp';
import type { AssetPublishingDetails as _mygameprogram_api_v1_AssetPublishingDetails, AssetPublishingDetails__Output as _mygameprogram_api_v1_AssetPublishingDetails__Output } from '../../../mygameprogram/api/v1/AssetPublishingDetails';

export interface AssetCreationRequest {
  'associationId'?: (string);
  'categoryId'?: (string);
  'matchStart'?: (_google_protobuf_Timestamp | null);
  'title'?: (string);
  'assetPublishingDetails'?: ({[key: string]: _mygameprogram_api_v1_AssetPublishingDetails});
}

export interface AssetCreationRequest__Output {
  'associationId'?: (string);
  'categoryId'?: (string);
  'matchStart'?: (_google_protobuf_Timestamp__Output);
  'title'?: (string);
  'assetPublishingDetails'?: ({[key: string]: _mygameprogram_api_v1_AssetPublishingDetails__Output});
}
