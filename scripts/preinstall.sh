#!/usr/bin/env sh

set -e

cd "$(dirname "$0")/.."

astro telemetry disable && vercel telemetry disable
