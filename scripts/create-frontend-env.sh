#!/bin/sh

echo create frontend env

cat > frontend/.env << frontend_env
REACT_APP_URL_BACKEND=http://$(uname -n)
REACT_APP_URL_FRONTEND=http://$(uname -n)
frontend_env

cat frontend/.env
