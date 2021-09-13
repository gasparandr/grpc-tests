#!/bin/bash

echo "***** Validating arguments *****"

echo $#

if [ $# -eq 2 ]
    then
        echo "Number of arguments is valid."
        echo
    else
        echo "Please provide a DOMAIN_NAME and an IP_ADDRESS"
        echo
        exit 1
fi

DOMAIN_NAME=$1
IP_ADDRESS=$2

rm -rf certificates

mkdir certificates

echo "subjectAltName=DNS:${DOMAIN_NAME},IP:${IP_ADDRESS}" > certificates/server-ext.cnf

# 1. Generate CA's private key and self-signed certificate
openssl req -x509 -newkey rsa:4096 -days 1825 -nodes -keyout certificates/ca-key.pem -out certificates/ca-cert.pem -subj "/C=NO/ST=Vestlandet/L=Bergen/O=TV2/OU=Media/CN=*.${DOMAIN_NAME}/emailAddress=andrei.gaspar@${DOMAIN_NAME}"

echo "CA's self-signed certificate"
openssl x509 -in certificates/ca-cert.pem -noout -text

# 2. Generate web server's private key and certificate signing request (CSR)
openssl req -newkey rsa:4096 -nodes -keyout certificates/server-key.pem -out certificates/server-req.pem -subj "/C=NO/ST=Vestlandet/L=Bergen/O=TV2/OU=Computer/CN=*.${DOMAIN_NAME}/emailAddress=andrei.gaspar@${DOMAIN_NAME}"

# 3. Use CA's private key to sign web server's CSR and get back the signed certificate
openssl x509 -req -in certificates/server-req.pem -days 365 -CA certificates/ca-cert.pem -CAkey certificates/ca-key.pem -CAcreateserial -out certificates/server-cert.pem -extfile certificates/server-ext.cnf

echo "Server's signed certificate"
openssl x509 -in certificates/server-cert.pem -noout -text

