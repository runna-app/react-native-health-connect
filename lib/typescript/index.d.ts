import type { AggregateRequest, AggregateResult, AggregateGroupByDurationRequest, AggregateGroupByPeriodRequest, AggregationGroupResult, AggregateResultRecordType, HealthConnectRecord, Permission, ReadRecordsOptions, RecordResult, RecordType, ReadRecordsResult, GetChangesRequest, GetChangesResults, WriteExerciseRoutePermission, ReadHealthDataHistoryPermission } from './types';
import type { ExerciseRoute, TimeRangeFilter } from './types/base.types';
/**
 * Gets the status of the Health Connect SDK
 * @param providerPackageName the package name of the Health Connect provider
 * @returns the status of the SDK - check SdkAvailabilityStatus constants
 */
export declare function getSdkStatus(providerPackageName?: string): Promise<number>;
/**
 * Initializes the Health Connect SDK
 * @param providerPackageName the package name of the Health Connect provider
 * @returns true if the SDK was initialized successfully
 */
export declare function initialize(providerPackageName?: string): Promise<boolean>;
/**
 * Opens Health Connect settings app
 */
export declare function openHealthConnectSettings(): void;
/**
 * Opens Health Connect data management screen
 */
export declare function openHealthConnectDataManagement(providerPackageName?: string): void;
/**
 * Request permissions to access Health Connect data
 * @param permissions list of permissions to request
 * @returns granted permissions
 */
export declare function requestPermission(permissions: (Permission | WriteExerciseRoutePermission | ReadHealthDataHistoryPermission)[]): Promise<(Permission | WriteExerciseRoutePermission)[]>;
export declare function requestExerciseRoute(recordId: string): Promise<ExerciseRoute>;
export declare function getGrantedPermissions(): Promise<(Permission | WriteExerciseRoutePermission)[]>;
export declare function revokeAllPermissions(): Promise<void>;
export declare function readRecords<T extends RecordType>(recordType: T, options: ReadRecordsOptions): Promise<ReadRecordsResult<T>>;
export declare function readRecord<T extends RecordType>(recordType: T, recordId: string): Promise<RecordResult<T>>;
export declare function insertRecords(records: HealthConnectRecord[]): Promise<string[]>;
export declare function aggregateRecord<T extends AggregateResultRecordType>(request: AggregateRequest<T>): Promise<AggregateResult<T>>;
export declare function aggregateGroupByDuration<T extends AggregateResultRecordType>(request: AggregateGroupByDurationRequest<T>): Promise<AggregationGroupResult<T>[]>;
export declare function aggregateGroupByPeriod<T extends AggregateResultRecordType>(request: AggregateGroupByPeriodRequest<T>): Promise<AggregationGroupResult<T>[]>;
export declare function getChanges(request: GetChangesRequest): Promise<GetChangesResults>;
export declare function deleteRecordsByUuids(recordType: RecordType, recordIdsList: string[], clientRecordIdsList: string[]): Promise<void>;
export declare function deleteRecordsByTimeRange(recordType: RecordType, timeRangeFilter: TimeRangeFilter): Promise<void>;
export * from './constants';
export * from './types';
//# sourceMappingURL=index.d.ts.map