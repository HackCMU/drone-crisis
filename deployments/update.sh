#!/usr/bin/env bash

docker push gcr.io/dronecrisis/dronecrisis
kubectl rollout restart deployment/dronecrisis
