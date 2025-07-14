#!/usr/bin/env sh

set -e

cd "$(dirname "$0")/.."

## Required jq version 1.5 or higher

# shellcheck disable=SC2016
QUERY='reduce inputs as $in (.; . + $in + {"routes": ($in.routes + .routes)})'
ROOT_CONF="$PWD/vercel.json"
OUTPUT_CONF="$PWD/.vercel/output/config.json"
TMP_CONF="$PWD/.vercel/output/config.json.tmp"

astro build
jq "$QUERY" "$OUTPUT_CONF" "$ROOT_CONF" >"$TMP_CONF"
mv "$TMP_CONF" "$OUTPUT_CONF"
