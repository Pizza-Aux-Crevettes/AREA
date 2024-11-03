FROM node:20 AS ionic-build

RUN apt-get update && apt-get install -y default-jdk wget unzip

RUN mkdir -p /opt/android-sdk && \
    cd /opt/android-sdk && \
    wget https://dl.google.com/android/repository/commandlinetools-linux-9477386_latest.zip && \
    unzip commandlinetools-linux-9477386_latest.zip -d cmdline-tools && \
    rm commandlinetools-linux-9477386_latest.zip && \
    mv cmdline-tools/cmdline-tools cmdline-tools/tools

ENV ANDROID_HOME /opt/android-sdk
ENV PATH="${ANDROID_HOME}/cmdline-tools/tools/bin:${ANDROID_HOME}/platform-tools:${ANDROID_HOME}/build-tools/32.0.0/:${PATH}"

RUN yes | sdkmanager --licenses && \
    sdkmanager "platform-tools" "platforms;android-32" "build-tools;32.0.0"

RUN npm install -g @ionic/cli

WORKDIR /app
COPY ./ /app

RUN npm install @capacitor/android
RUN npm install

RUN ionic capacitor build android

WORKDIR /app/android

USER root
RUN mkdir /output

VOLUME /output

RUN ./gradlew assembleRelease

RUN keytool -genkey -alias replserver -keyalg RSA -keystore area.keystore -dname "CN=pizzacrevette, OU=R&D, O=PizzaCrevette" -storepass password -keypass password

RUN zipalign -p 4 /app/android/app/build/outputs/apk/release/app-release-unsigned.apk /app/android/app/build/outputs/apk/release/area_app.apk
RUN apksigner sign --ks area.keystore --ks-pass pass:password --key-pass pass:password /app/android/app/build/outputs/apk/release/area_app.apk
RUN apksigner verify /app/android/app/build/outputs/apk/release/area_app.apk

CMD ["cp", "/app/android/app/build/outputs/apk/release/area_app.apk", "/output/client.apk"]