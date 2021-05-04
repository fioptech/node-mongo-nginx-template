#!/usr/bin/env bash
cat ./env_mask.txt
envsubst "$(cat ./env_mask.txt)" < nginx.$APP_ENV.template.conf > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;' ; cat /etc/nginx/conf.d/default.conf