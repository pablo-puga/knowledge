---
title: Creating a self-singed CA certificate and generating SSL certificates with it.
date: 2022-03-17T10:50
---
# Creating a self-singed CA certificate and generating SSL certificates with it.
### 1. Generate a singing key for our Certification Authority
```bash
openssl genrsa [-des3] -out cakey.key 2048
```

### 2. Generate CA certificate with the key

```bash
openssl req -x509 -new -nodes -key cakey.key -sha256 -days 1825 -out cacert.crt
```

### 3. Generate signing key for our certificate

```bash
openssl genrsa [-des3] -out domain.key 2048
```

### 4. Generate signing request for the certificate with the key

```bash
openssl req -new -key domain.key -out domain.csr
```

### 5. Generate certificate from signing request with CA certificate and key

```bash
openssl x509 -req -in domain.csr -CA cacert.crt -CAkey cakey.key -CAcreateserial -out domain.crt -days 1825 -sha256
```

