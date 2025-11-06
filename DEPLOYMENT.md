# GitHub Pages Deployment Anleitung

## Schritt 1: Repository auf GitHub erstellen

1. Gehe zu [GitHub](https://github.com) und erstelle ein neues Repository
2. Name: z.B. `coaching-card` oder `eishockey-coaching-card`
3. Setze es auf **Public** (für kostenloses GitHub Pages)
4. Erstelle das Repository **ohne** README, .gitignore oder License

## Schritt 2: Dateien hochladen

### Option A: Mit Git (empfohlen)

```bash
# Im Projekt-Verzeichnis
git init
git add .
git commit -m "Initial commit: Coaching Card Web App"
git branch -M main
git remote add origin https://github.com/[DEIN-USERNAME]/[REPOSITORY-NAME].git
git push -u origin main
```

### Option B: Über GitHub Web-Interface

1. Gehe zu deinem Repository auf GitHub
2. Klicke auf "uploading an existing file"
3. Ziehe alle Dateien aus dem Projekt-Ordner hinein
4. Committe die Änderungen

## Schritt 3: GitHub Pages aktivieren

1. Gehe zu deinem Repository auf GitHub
2. Klicke auf **Settings** (Einstellungen)
3. Scrolle nach unten zu **Pages**
4. Unter **Source** wähle:
   - Branch: `main` (oder `master`)
   - Folder: `/ (root)`
5. Klicke auf **Save**

## Schritt 4: App aufrufen

Nach ein paar Minuten ist deine App verfügbar unter:
```
https://[DEIN-USERNAME].github.io/[REPOSITORY-NAME]/
```

Beispiel:
```
https://noelguyaz.github.io/coaching-card/
```

## PWA Installation

Nutzer können die App auf mobilen Geräten installieren:
- **iOS Safari**: Teilen → Zum Home-Bildschirm
- **Android Chrome**: Menü → "Zur Startseite hinzufügen"

## Updates

Bei Änderungen einfach committen und pushen:
```bash
git add .
git commit -m "Update: Beschreibung der Änderungen"
git push
```

Die Änderungen sind nach wenigen Minuten live!

