// Original file: proto-tv2/mygameprogram_service.proto

import type { Timestamp as _google_protobuf_Timestamp, Timestamp__Output as _google_protobuf_Timestamp__Output } from '../../../google/protobuf/Timestamp';

export interface AssetPublishingDetails {
  'exposureStart'?: (_google_protobuf_Timestamp | null);
  'exposureEnd'?: (_google_protobuf_Timestamp | null);
  'publicationStart'?: (_google_protobuf_Timestamp | null);
  'publicationEnd'?: (_google_protobuf_Timestamp | null);
}

export interface AssetPublishingDetails__Output {
  'exposureStart'?: (_google_protobuf_Timestamp__Output);
  'exposureEnd'?: (_google_protobuf_Timestamp__Output);
  'publicationStart'?: (_google_protobuf_Timestamp__Output);
  'publicationEnd'?: (_google_protobuf_Timestamp__Output);
}
