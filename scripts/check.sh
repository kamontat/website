#!/usr/bin/env sh

set -e

cd "$(dirname "$0")/.."

pnpm run check:prettier
pnpm run check:eslint
pnpm run check:astro
