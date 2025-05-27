#!/bin/bash
cd /home/kavia/workspace/code-generation/foodieinsight-dashboard-101046-79227c1e/foodieinsight_dashboard
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

