# Cognito

### Inicialización
```
aws cognito-idp initiate-auth --auth-flow USER_PASSWORD_AUTH --client-id 3c75q9a02alnprodik0loij9dj --auth-parameters USERNAME=sergiohidalgocaceres@gmail.com,PASSWORD=ElGigante2025?
```
### Generar una nueva contraseña 
```
aws cognito-idp respond-to-auth-challenge --client-id 3c75q9a02alnprodik0loij9dj --challenge-name NEW_PASSWORD_REQUIRED --challenge-responses USERNAME=sergiohidalgocaceres@gmail.com,NEW_PASSWORD=eLanchoMund0? --session AYABeGa3HtoQ5QLJocjAPw3ArwoAHQABAAdTZXJ2aWNlABBDb2duaXRvVXNlclBvb2xzAAEAB2F3cy1rbXMAS2Fybjphd3M6a21zOnVzLWVhc3QtMTo3NDU2MjM0Njc1NTU6a2V5L2IxNTVhZmNhLWJmMjktNGVlZC1hZmQ4LWE5ZTA5MzY1M2RiZQC4AQIBAHjHL4WD3WpekpFe85nxP9Nwg99u3bPN6BTSaB-uHZcTLAF3PYT7R-w3E-pE08aU6QA2AAAAfjB8BgkqhkiG9w0BBwagbzBtAgEAMGgGCSqGSIb3DQEHATAeBglghkgBZQMEAS4wEQQMN8PoT-_5DqnDVWJwAgEQgDsiejOweZiOmyJ1Z0u0WBrMEJchCZFwr7iKDAVaaoe35WIjki_D1Z0ni_r804mqwFVzV6nN2iB6iXrD4AIAAAAADAAAEAAAAAAAAAAAAAAAAADPd3MnXejeTwGAuy1Jum76_____wAAAAEAAAAAAAAAAAAAAAEAAADxtMtTosVXkq3ORH3h2WMPhZWUot_LbUfmPQ94M6OUkmulNYOKe2Cwc4c5SIJ26djquXiypjJhaJyklsNS6G96wg27J2__PJkkNLGdAcQuK4ojbvpXaJrTVYnQitCd8AuhjP6rm_px9SvsWdc2qg29MBLtcRLWoaMVAq7M0TTzzGPBR8FeyXOAjnWXbP3JX_hKNroMqFM3EjV4XfHNoo4SVz6E5iRETOfLBgaEGlS-0F-xfmu_lrPBR3GLhMuG0bfKabs7nKDOM6zwzbP1pI9HeE6nPhJJ47vKkNiNF3DQPP_SRlLl8u8Dx4J7UBEFHlfwulYyxHRIZlJMlikrUlXx_i4
```

### Login
```
aws cognito-idp initiate-auth --auth-flow USER_PASSWORD_AUTH --client-id 3c75q9a02alnprodik0loij9dj --auth-parameters USERNAME=sergiohidalgocaceres@gmail.com,PASSWORD=eLanchoMund0?
```