#!/usr/bin/env sh

set -e

cd "$(dirname "$0")/.."

## Required jq version 1.5 or higher

## Support deep-merge object and arrays, remove "$comment" field
# shellcheck disable=SC2016
QUERY='reduce inputs as $in (.; . + {"routes": (($in.beforeRoutes | map(del(.["$comment"]))) + .routes + ($in.afterRoutes | map(del(.["$comment"]))))})'
ROOT_CONF="$PWD/vercel.config.json"
OUTPUT_CONF="$PWD/.vercel/output/config.json"
TMP_CONF="$PWD/.vercel/output/config.json.tmp"

astro build
jq "$QUERY" "$OUTPUT_CONF" "$ROOT_CONF" >"$TMP_CONF"
mv "$TMP_CONF" "$OUTPUT_CONF"
