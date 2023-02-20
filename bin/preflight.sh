#!/usr/bin/env bash

set -e

npm run format:write -s
npm run lint:fix -s
#npm run test:dependencies -s
#npm audit --audit-level=high
#npm run test:coverage
