#!/usr/bin/env bash

docker push gcr.io/dronecrisis/dronecrisis
kubectl create -f deployments/pod.yaml
kubectl create -f deployments/service.yaml
