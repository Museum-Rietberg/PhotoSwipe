# PhotoSwipe Bildergalerie
Bildergalerie für Ausstellungen im Museum Rietberg Zürich

### Setup
#### App
- `photoswipe-module.js` implementiert [PhotoSwipe v5.4.2](https://photoswipe.com/) von Dmytro Semenov als Fotogalerie [(GitHub)](https://github.com/dimsemenov/photoswipe) 
- `content-generator.js` generiert Inhalt aus
    - `metadaten-xyz.json` exportiert aus MuseumPlus mit Voreinstellung _JSON MRZ PhotoSwipe_
- `mrz-corporate-design.css` allgemeines MRZ Corporate Design
- `gallery-styling.css` spezifisches Styling für das UI
- `idle-screen.css` Animation/Styling für Idle Screen
- `index.html` Call to action für Idle Screen anpassen (in `<div id="idle-slider">`)
- `photos` Ordner für hochauflösende Bilder exportiert aus MuseumPlus mit Voreinstellung _Bildexport Standardbilder_
    - `photos/thumbs` Ordner für Thumbnails (Empfehlung lange Kante 320px; max. Dateigrösse 80KB)
- `fonts` Ordner für Schriften
#### Kiosk-PC
- `BIOS` regelt Start-Zeiten
- `Windows 10/11 Kiosk-Mode` eingerichtet via Admin-Account
- `Windows Aufgabenplanung` regelt Shut Down-Zeiten
- `startBrowsersync.bat` startet BrowserSync als lokalen Server 
    - `reloadBrowsersync.bat` führt eine Minute nach Start Browser-Refresh aus um Bildlade-Probleme zu beheben
    - Ordnerpfad in beiden .bat-Dateien einfügen
#### Reporting
- `logger.js` schreibt jede Start Button-Aktivierung und jede Stunde einen Ping in `localStorage`; regelt Timing durch `setInterval` auch für
    - `saveLog.js` lädt jeden Abend `localStorage` als JSON-Datei runter
- `UsageReport_...` JSON-Dateien müssen am Kiosk-PC via Windows Admin-Account aus dem Kiosk-User Download-Ordner händisch abgeholt werden (haben .txt-Endung um .json-Blockade zu umgehen)
