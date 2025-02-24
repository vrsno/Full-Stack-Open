```memaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: El usuario escribe una nota y presiona "Guardar"

    Note right of browser: La SPA agrega la nueva nota a la lista localmente sin recargar la página

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note right of server: El servidor recibe la nueva nota y la almacena en la base de datos
    server-->>browser: Respuesta 201 Created
    deactivate server

    Note right of browser: La nueva nota ya está visible en la página sin necesidad de recargarla


```
