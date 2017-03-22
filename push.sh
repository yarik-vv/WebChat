#!/bin/bash
git add . && \
git add -u && \
git status && \
read -r -p "Commit description: " desc
git commit -m "$desc" && \
git push origin HEAD