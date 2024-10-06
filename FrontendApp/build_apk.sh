#!/bin/bash
./gradlew assembleRelease
cp /app/android/app/build/outputs/apk/release/app-release-unsigned.apk /output/area.apk