package dev.matinzd.healthconnect.permissions

import androidx.health.connect.client.PermissionController
import androidx.health.connect.client.permission.HealthPermission
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.WritableNativeArray
import dev.matinzd.healthconnect.utils.InvalidRecordType
import dev.matinzd.healthconnect.utils.reactRecordTypeToClassMap

class PermissionUtils {
  companion object {
    fun parsePermissions(reactPermissions: ReadableArray): Set<String> {
      return reactPermissions.toArrayList().mapNotNull {
        it as HashMap<*, *>
        val recordType = it["recordType"]
        val accessType = it["accessType"]

        if (accessType == "write" && recordType == "ExerciseRoute") {
          return@mapNotNull HealthPermission.PERMISSION_WRITE_EXERCISE_ROUTE
        }

        if (accessType == "read" && recordType == "ReadHealthDataHistory") {
          return@mapNotNull HealthPermission.PERMISSION_READ_HEALTH_DATA_HISTORY
        }

        val recordClass = reactRecordTypeToClassMap[recordType]
          ?: throw InvalidRecordType()

        when (accessType) {
          "write" -> HealthPermission.getWritePermission(recordClass)
          "read" -> HealthPermission.getReadPermission(recordClass)
          else -> null
        }
      }.toSet()
    }

    suspend fun getGrantedPermissions(permissionController: PermissionController): WritableNativeArray {
      return mapPermissionResult(permissionController.getGrantedPermissions())
    }

    fun mapPermissionResult(grantedPermissions: Set<String>): WritableNativeArray {
      return WritableNativeArray().apply {
        // Add read and write permissions for all record types
        for ((recordType, recordClass) in reactRecordTypeToClassMap) {
          val readPermissionForRecord = HealthPermission.getReadPermission(recordClass)
          val writePermissionForRecord = HealthPermission.getWritePermission(recordClass)

          if (grantedPermissions.contains(readPermissionForRecord)) {
            pushMap(ReactPermission(AccessType.READ, recordType).toReadableMap())
          }

          if (grantedPermissions.contains(writePermissionForRecord)) {
            pushMap(ReactPermission(AccessType.WRITE, recordType).toReadableMap())
          }
        }

        // ExerciseRoute isn't a record type, so we need to add it manually
        if (grantedPermissions.contains(HealthPermission.PERMISSION_WRITE_EXERCISE_ROUTE)) {
          pushMap(ReactPermission(AccessType.WRITE, "ExerciseRoute").toReadableMap())
        }
      }
    }

  }
}
