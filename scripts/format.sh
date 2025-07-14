#!/usr/bin/env sh

set -e

cd "$(dirname "$0")/.."

pnpm run format:prettier
pnpm run format:eslint
