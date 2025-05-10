#!/bin/bash

OUTPUT="commit_report_by_email.csv"
echo "Email,Commits" > "$OUTPUT"

git log --all --no-merges --pretty=format:"%ae" \
  | sort \
  | uniq -c \
  | sort -rn \
  | awk '{gsub(/^ +/, "", $1); print $2 "," $1}' >> "$OUTPUT"

echo "✅ Звіт за email збережено в: $OUTPUT"

# Для запуску скрипту виконайте ./generate_commit_report.sh