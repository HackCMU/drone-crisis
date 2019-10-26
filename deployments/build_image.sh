#!/usr/bin/env bash

TAG_NAME="drone-crisis"

docker build -t drone-crisis -f deployments/Dockerfile .
docker tag drone-crisis:latest gcr.io/dronecrisis/dronecrisis
