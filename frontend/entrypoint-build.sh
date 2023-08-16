#!/bin/sh

npm install

# https://stackoverflow.com/questions/27787536/how-to-pass-a-variable-containing-slashes-to-sed
sed -i \
"s~http://localhost~${URL}~g" \
$(find /app/src -type f -name "*.ts*")

npm run build
