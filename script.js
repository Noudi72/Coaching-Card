// Team Rosters (korrigiert - U18 und U21 vertauscht)
let rosters = {
    u21: {
        defense: [
            { number: 2, name: 'Michel' },
            { number: 3, name: 'Gfeller' },
            { number: 4, name: 'Fuhrer' },
            { number: 5, name: 'Bichsel' },
            { number: 6, name: 'Grossniklaus' },
            { number: 7, name: 'Moser' },
            { number: 8, name: 'Haag' },
            { number: 14, name: 'Kyburz Joan' },
            { number: 24, name: 'Hölz' },
            { number: 27, name: 'Blessing' },
            { number: 29, name: 'Sommer' }
        ],
        offense: [
            { number: 9, name: 'Cattin' },
            { number: 10, name: 'Reidzans' },
            { number: 11, name: 'Binder' },
            { number: 12, name: 'Trauffer' },
            { number: 13, name: 'von Rohr' },
            { number: 15, name: 'Guinchard' },
            { number: 16, name: 'Christen' },
            { number: 17, name: 'Braillard' },
            { number: 18, name: 'Stékoffer' },
            { number: 19, name: 'Kaser' },
            { number: 20, name: 'Neuenschw.' },
            { number: 21, name: 'Sahli' },
            { number: 22, name: 'Villard' },
            { number: 25, name: 'Stengel' },
            { number: 26, name: 'Cabré' },
            { number: 27, name: 'Tarchini' },
            { number: 28, name: 'Jaberg' }
        ],
        goalies: [
            { number: 1, name: 'Scheu' },
            { number: 1, name: 'Ackermann' },
            { number: 30, name: 'Wehrli' },
            { number: 40, name: 'Marthaler' }
        ]
    },
    u18: {
        defense: [
            { number: 2, name: 'Hirtzlin' },
            { number: 3, name: 'Gfeller' },
            { number: 5, name: 'Schütz' },
            { number: 6, name: 'Michel' },
            { number: 7, name: 'Bracelli' },
            { number: 8, name: 'Binder' },
            { number: 14, name: 'Cattin' },
            { number: 19, name: 'Grossnik. K.' },
            { number: 26, name: 'Cserpes' },
            { number: 27, name: 'Grossnik. F.' },
            { number: 28, name: 'Ryser' }
        ],
        offense: [
            { number: 9, name: 'Giron' },
            { number: 10, name: 'Natoli' },
            { number: 11, name: 'Blatter' },
            { number: 12, name: 'Reidzans' },
            { number: 13, name: 'von Aesch' },
            { number: 15, name: 'Cabré' },
            { number: 16, name: 'Krebs' },
            { number: 17, name: 'Saxer' },
            { number: 18, name: 'Jaberg' },
            { number: 20, name: 'Reinhard' },
            { number: 21, name: 'Wyss' },
            { number: 22, name: 'Kuhn' },
            { number: 23, name: 'Ruchti' },
            { number: 24, name: 'Stengel' },
            { number: 25, name: 'Donatsch' },
            { number: 31, name: 'Matthey' }
        ],
        goalies: [
            { number: 29, name: 'Joder' },
            { number: 30, name: 'Rytz' },
            { number: 35, name: 'Neufeld' }
        ]
    }
};

// Load/save rosters in localStorage
const STORAGE_KEY = 'coaching-card-rosters-v1';
function loadRosters() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) rosters = JSON.parse(raw);
    } catch (e) { /* ignore */ }
}
function saveRosters() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rosters));
}

// Load/save lineups in localStorage
const LINEUP_STORAGE_VERSION = 'v3'; // Erhöhe Version bei Key-Änderungen
const LINEUP_STORAGE_KEY = `coaching-card-lineups-${LINEUP_STORAGE_VERSION}`;
const COLORS_STORAGE_KEY = `coaching-card-colors-${LINEUP_STORAGE_VERSION}`;

function saveLineups() {
    try {
        const lineupData = {};
        const selects = document.querySelectorAll('.player-select');
        console.log('Speichere Lineups von', selects.length, 'Selects');
        
        selects.forEach(select => {
            // Erstelle eindeutigen Key aus allen Attributen
            const line = select.getAttribute('data-line') || '';
            const unit = select.getAttribute('data-unit') || '';
            const position = select.getAttribute('data-position') || '';
            const pos = select.getAttribute('data-pos') || '';
            
            // Erstelle eindeutigen Key - konsistente Reihenfolge
            const parts = [];
            if (line) parts.push(`line_${line}`);
            if (unit) parts.push(`unit_${unit}`);
            if (position) parts.push(`position_${position}`);
            if (pos) parts.push(`pos_${pos}`);
            
            const key = parts.join('_') || 'unknown';
            const value = select.value || '';
            lineupData[key] = value;
            
            if (value) {
                console.log(`  Speichere: ${key} = ${value}`);
            }
        });
        
        // Speichere auch Game Day Felder
        const gameDayData = {
            game: document.getElementById('game')?.value || '',
            date: document.getElementById('date')?.value || '',
            opponent: document.getElementById('opponent')?.value || ''
        };
        
        // Speichere auch Shootout Felder
        const shootoutInputs = document.querySelectorAll('.shootout input');
        const shootoutData = {};
        shootoutInputs.forEach((input, index) => {
            shootoutData[`shootout_${index}`] = input.value || '';
        });
        
        // Speichere auch Farben der Dropdowns
        const colorsData = {};
        selects.forEach(select => {
            const line = select.getAttribute('data-line') || '';
            const unit = select.getAttribute('data-unit') || '';
            const position = select.getAttribute('data-position') || '';
            const pos = select.getAttribute('data-pos') || '';
            
            const parts = [];
            if (line) parts.push(`line_${line}`);
            if (unit) parts.push(`unit_${unit}`);
            if (position) parts.push(`position_${position}`);
            if (pos) parts.push(`pos_${pos}`);
            
            const key = parts.join('_') || 'unknown';
            const color = select.style.color || '';
            if (color) {
                colorsData[key] = color;
            }
        });
        
        const dataToSave = {
            lineups: lineupData,
            gameDay: gameDayData,
            shootout: shootoutData,
            team: currentTeam,
            version: LINEUP_STORAGE_VERSION
        };
        
        localStorage.setItem(LINEUP_STORAGE_KEY, JSON.stringify(dataToSave));
        localStorage.setItem(COLORS_STORAGE_KEY, JSON.stringify(colorsData));
        console.log('✓ Lineups gespeichert:', Object.keys(lineupData).length, 'Werte');
        console.log('  Gespeicherte Keys (erste 10):', Object.keys(lineupData).slice(0, 10));
    } catch (e) {
        console.error('Fehler beim Speichern der Lineups:', e);
    }
}

function loadLineups() {
    try {
        // Lösche alte Versionen
        ['coaching-card-lineups-v1', 'coaching-card-lineups-v2'].forEach(oldKey => {
            if (localStorage.getItem(oldKey)) {
                console.log(`🗑️ Lösche alte Daten: ${oldKey}`);
                localStorage.removeItem(oldKey);
            }
        });
        
        const raw = localStorage.getItem(LINEUP_STORAGE_KEY);
        if (!raw) {
            console.log('Keine gespeicherten Lineups gefunden');
            return;
        }
        const data = JSON.parse(raw);
        console.log('Lineups geladen:', data);
        console.log('Anzahl gespeicherter Lineups:', Object.keys(data.lineups || {}).length);
        
        // Lade Team falls vorhanden
        if (data.team && data.team !== currentTeam) {
            console.log('Team wechseln von', currentTeam, 'zu', data.team);
            currentTeam = data.team;
            if (teamSelectEl) teamSelectEl.value = currentTeam;
            initializeSelects();
            // Warte bis Selects neu initialisiert sind
            setTimeout(() => {
                loadLineupsData(data);
            }, 100);
            return;
        }
        
        loadLineupsData(data);
    } catch (e) { 
        console.error('Fehler beim Laden der Lineups:', e);
    }
}

function loadLineupsData(data) {
    // Lade Farben
    let colorsData = {};
    try {
        const colorsRaw = localStorage.getItem(COLORS_STORAGE_KEY);
        if (colorsRaw) {
            colorsData = JSON.parse(colorsRaw);
        }
    } catch (e) {
        console.error('Fehler beim Laden der Farben:', e);
    }
    
    // Lade Lineup-Werte
    if (data.lineups) {
        const selects = document.querySelectorAll('.player-select');
        console.log('Gefundene Selects:', selects.length);
        console.log('Gespeicherte Keys (erste 10):', Object.keys(data.lineups).slice(0, 10));
        
        let loadedCount = 0;
        let notFoundCount = 0;
        let optionNotFoundCount = 0;
        const notFoundKeys = [];
        
        selects.forEach(select => {
            const line = select.getAttribute('data-line') || '';
            const unit = select.getAttribute('data-unit') || '';
            const position = select.getAttribute('data-position') || '';
            const pos = select.getAttribute('data-pos') || '';
            
            // Erstelle denselben Key wie beim Speichern - GLEICHE REIHENFOLGE
            const parts = [];
            if (line) parts.push(`line_${line}`);
            if (unit) parts.push(`unit_${unit}`);
            if (position) parts.push(`position_${position}`);
            if (pos) parts.push(`pos_${pos}`);
            
            const key = parts.join('_') || 'unknown';
            const savedValue = data.lineups[key];
            
            // Lade Farbe für dieses Feld
            if (colorsData[key]) {
                select.style.color = colorsData[key];
                // Aktualisiere auch den Button, falls vorhanden
                const colorBtn = select.nextElementSibling;
                if (colorBtn && colorBtn.classList.contains('color-picker-btn')) {
                    updateButtonColor(colorBtn, select);
                }
            }
            
            if (savedValue) {
                // Prüfe ob Option existiert
                const optionExists = Array.from(select.options).some(opt => opt.value === savedValue);
                if (optionExists) {
                    select.value = savedValue;
                    loadedCount++;
                    console.log(`✓ Geladen: ${key} = ${savedValue}`);
                } else {
                    // Versuche trotzdem zu setzen
                    try {
                        select.value = savedValue;
                        // Prüfe ob es wirklich gesetzt wurde
                        if (select.value === savedValue) {
                            loadedCount++;
                            console.log(`✓ Geladen (direkt): ${key} = ${savedValue}`);
                        } else {
                            optionNotFoundCount++;
                            notFoundKeys.push({key, value: savedValue, available: Array.from(select.options).map(o => o.value).slice(0, 3)});
                            console.warn(`✗ Option nicht gefunden für ${key}: "${savedValue}"`);
                            console.log('  Verfügbare Optionen:', Array.from(select.options).map(o => o.value).slice(0, 5));
                            console.log('  Gesuchter Wert:', savedValue);
                        }
                    } catch (e) {
                        optionNotFoundCount++;
                        console.warn(`✗ Fehler beim Setzen von ${key}: "${savedValue}"`, e);
                    }
                }
            } else {
                // Debug: Zeige welche Keys nicht gefunden wurden
                if (line || unit || position || pos) {
                    notFoundCount++;
                    // Nur die ersten 5 nicht gefundenen Keys loggen
                    if (notFoundCount <= 5) {
                        console.log(`  Kein Wert für Key: ${key}`);
                    }
                }
            }
        });
        
        console.log(`📊 Ergebnis: Geladen: ${loadedCount}, Option nicht gefunden: ${optionNotFoundCount}, Kein Wert: ${notFoundCount}`);
        
        if (notFoundKeys.length > 0) {
            console.warn('⚠️ Keys mit fehlenden Optionen:', notFoundKeys.slice(0, 3));
        }
        
        // Wenn viele Optionen nicht gefunden wurden, versuche nochmal nach kurzer Verzögerung
        if (optionNotFoundCount > 0 && loadedCount === 0) {
            console.log('⚠️ Versuche erneut zu laden nach 500ms...');
            setTimeout(() => {
                loadLineupsData(data);
            }, 500);
        }
    }
    
    // Lade Game Day Felder
    if (data.gameDay) {
        if (document.getElementById('game')) {
            document.getElementById('game').value = data.gameDay.game || '';
        }
        if (document.getElementById('date')) {
            document.getElementById('date').value = data.gameDay.date || '';
        }
        if (document.getElementById('opponent')) {
            document.getElementById('opponent').value = data.gameDay.opponent || '';
        }
        console.log('Game Day Felder geladen');
    }
    
    // Lade Shootout Felder
    if (data.shootout) {
        const shootoutInputs = document.querySelectorAll('.shootout input');
        shootoutInputs.forEach((input, index) => {
            const key = `shootout_${index}`;
            if (data.shootout[key]) {
                input.value = data.shootout[key];
            }
        });
        console.log('Shootout Felder geladen');
    }
    
    setTimeout(applyTextAlignment, 100);
}

let currentTeam = 'u21';

// Initialize player selects
function populatePlayerSelect(select, position) {
    // Speichere aktuellen Wert, falls vorhanden
    const currentValue = select.value;
    
    const allPlayers = [];
    if (position === 'goalie1' || position === 'goalie2') {
        allPlayers.push(...rosters[currentTeam].goalies);
    } else {
        // For ALL skater positions (lw/c/rw/ld/rd/pp/pk/setup) show both forwards and defense
        allPlayers.push(...rosters[currentTeam].offense);
        allPlayers.push(...rosters[currentTeam].defense);
    }

    // Add empty option
    select.innerHTML = '<option value="">-</option>';

    // Add players (ohne Farben aus dem Roster)
    allPlayers.forEach(player => {
        const option = document.createElement('option');
        const playerValue = `${player.number} ${player.name}`;
        option.value = playerValue;
        option.textContent = playerValue;
        select.appendChild(option);
    });
    
    // Stelle den vorherigen Wert wieder her, falls er noch existiert
    if (currentValue && Array.from(select.options).some(opt => opt.value === currentValue)) {
        select.value = currentValue;
    }
    
    // Event Listener für Farbänderung beim Auswählen entfernt - Farben werden jetzt direkt am Feld gesetzt
}

// Initialize all selects
function initializeSelects() {
    const allSelects = document.querySelectorAll('.player-select');
    console.log('🔧 Initialisiere', allSelects.length, 'Selects...');
    allSelects.forEach((select, index) => {
        const position = select.getAttribute('data-position') || 
                        select.getAttribute('data-pos') || 
                        select.getAttribute('data-unit');
        populatePlayerSelect(select, position);
    });
    
    // Buttons nach dem Populieren hinzufügen
    setTimeout(() => {
        allSelects.forEach(select => {
            setupColorPicker(select);
        });
        const buttons = document.querySelectorAll('.color-picker-btn');
        console.log('✅ Selects initialisiert,', buttons.length, 'Farb-Buttons erstellt');
    }, 50);
}

// Farbauswahl für Dropdown-Felder (ähnlich wie Excel)
function setupColorPicker(select) {
    // Prüfe ob Button bereits existiert (direkt nach dem Select)
    let colorBtn = select.nextElementSibling;
    
    if (colorBtn && colorBtn.classList.contains('color-picker-btn')) {
        // Button existiert bereits - aktualisiere nur die Farbe und stelle sicher, dass Event Listener vorhanden ist
        updateButtonColor(colorBtn, select);
        
        // Prüfe ob Event Listener bereits vorhanden ist
        if (!colorBtn.hasAttribute('data-listener-attached')) {
            colorBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                openColorPicker(select, colorBtn);
            });
            colorBtn.setAttribute('data-listener-attached', 'true');
        }
        
        // Stelle sicher, dass MutationObserver aktiv ist
        if (!select.hasAttribute('data-observer-attached')) {
            const observer = new MutationObserver(() => {
                updateButtonColor(colorBtn, select);
            });
            observer.observe(select, { 
                attributes: true, 
                attributeFilter: ['style'] 
            });
            select.setAttribute('data-observer-attached', 'true');
        }
        
        return;
    }
    
    // Erstelle neuen Farb-Button direkt nach dem Select
    colorBtn = document.createElement('button');
    colorBtn.type = 'button';
    colorBtn.className = 'color-picker-btn';
    colorBtn.innerHTML = '🎨';
    colorBtn.title = 'Farbe ändern';
    colorBtn.setAttribute('data-select-id', select.getAttribute('data-position') || 
                                         select.getAttribute('data-pos') || 
                                         select.getAttribute('data-line') || 
                                         select.getAttribute('data-unit') || 
                                         'unknown');
    
    // Setze aktuelle Farbe als Hintergrund
    updateButtonColor(colorBtn, select);
    
    // Füge Button direkt nach dem Select ein
    select.parentNode.insertBefore(colorBtn, select.nextSibling);
    
    // Event Listener für Button-Klick
    colorBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        openColorPicker(select, colorBtn);
    });
    colorBtn.setAttribute('data-listener-attached', 'true');
    
    // Update Button-Farbe wenn Select-Farbe geändert wird
    const observer = new MutationObserver(() => {
        updateButtonColor(colorBtn, select);
    });
    
    observer.observe(select, { 
        attributes: true, 
        attributeFilter: ['style'] 
    });
    select.setAttribute('data-observer-attached', 'true');
}

function updateButtonColor(btn, select) {
    if (select.style.color && select.style.color !== '') {
        btn.style.backgroundColor = select.style.color;
        btn.style.color = select.style.color;
    } else {
        btn.style.backgroundColor = 'white';
        btn.style.color = '#000';
    }
}

function openColorPicker(select, colorBtn) {
    // Erstelle temporären Farbpicker
    const colorInput = document.createElement('input');
    colorInput.type = 'color';
    colorInput.value = select.style.color || '#000000';
    colorInput.style.position = 'fixed';
    colorInput.style.opacity = '0';
    colorInput.style.pointerEvents = 'none';
    colorInput.style.width = '1px';
    colorInput.style.height = '1px';
    
    document.body.appendChild(colorInput);
    
    colorInput.addEventListener('change', () => {
        const color = colorInput.value;
        if (color === '#000000') {
            // Schwarz = Standard, entferne Farbe
            select.style.color = '';
            if (colorBtn) {
                colorBtn.style.backgroundColor = 'white';
                colorBtn.style.color = '#000';
            }
        } else {
            select.style.color = color;
            if (colorBtn) {
                colorBtn.style.backgroundColor = color;
                colorBtn.style.color = color;
            }
        }
        saveLineups(); // Speichere automatisch
        document.body.removeChild(colorInput);
    });
    
    colorInput.addEventListener('blur', () => {
        if (document.body.contains(colorInput)) {
            document.body.removeChild(colorInput);
        }
    });
    
    // Öffne Farbpicker
    colorInput.click();
}

// Handle team change
const teamSelectEl = document.getElementById('team-select');
if (teamSelectEl) {
    teamSelectEl.addEventListener('change', (e) => {
        saveLineups(); // Speichere vor Team-Wechsel
        currentTeam = e.target.value;
        initializeSelects();
        // Stelle sicher, dass Buttons erstellt wurden
        setTimeout(() => {
            const selects = document.querySelectorAll('.player-select');
            const buttons = document.querySelectorAll('.color-picker-btn');
            if (buttons.length < selects.length) {
                console.log('⚠️ Buttons fehlen nach Team-Wechsel, erstelle neu...');
                initializeSelects();
            }
        }, 100);
        loadLineups(); // Lade Lineups für neues Team
    });
}

// Event-Listener für automatisches Speichern hinzufügen
let autoSaveSetup = false;
function setupAutoSave() {
    // Nur einmal einrichten
    if (autoSaveSetup) return;
    autoSaveSetup = true;
    
    console.log('Auto-Save wird eingerichtet...');
    
    // Alle Player-Selects (auch zukünftige) - Event Delegation
    document.addEventListener('change', (e) => {
        if (e.target.classList.contains('player-select')) {
            console.log('Player-Select geändert:', e.target.value);
            saveLineups();
        }
    });
    
    // Game Day Inputs
    ['game', 'date', 'opponent'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', () => {
                console.log('Game Day Feld geändert:', id);
                saveLineups();
            });
        }
    });
    
    // Shootout Inputs (auch zukünftige) - Event Delegation
    document.addEventListener('input', (e) => {
        if (e.target.closest('.shootout')) {
            console.log('Shootout Feld geändert');
            saveLineups();
        }
    });
    
    console.log('Auto-Save eingerichtet');
}

// Auto-fill date
function setDefaultDate() {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateStr = today.toLocaleDateString('de-CH', options);
    const dateEl = document.getElementById('date');
    if (dateEl) dateEl.value = dateStr;
}

// Apply text alignment to selects after initialization
function applyTextAlignment() {
    document.querySelectorAll('.forwards select[data-pos="c"]').forEach(select => {
        select.style.textAlign = 'center';
    });
    document.querySelectorAll('.forwards select[data-pos="rw"], .defense select[data-pos="rd"]').forEach(select => {
        select.style.textAlign = 'right';
        select.style.direction = 'rtl';
        Array.from(select.options).forEach(option => {
            option.style.direction = 'ltr';
            option.style.textAlign = 'right';
        });
    });
}

// Start screen logic
function buildRosterRow(player = { number: '', name: '', pos: 'F' }) {
    const tr = document.createElement('tr');
    const tdNum = document.createElement('td');
    const tdName = document.createElement('td');
    const tdPos = document.createElement('td');
    const tdDel = document.createElement('td');

    tdNum.innerHTML = `<input type="number" min="0" value="${player.number ?? ''}">`;
    tdName.innerHTML = `<input type="text" value="${player.name ?? ''}">`;
    tdPos.innerHTML = `<select><option value="F">F</option><option value="D">D</option><option value="G">G</option></select>`;
    tdPos.querySelector('select').value = player.pos || (player.isGoalie ? 'G' : 'F');
    const delBtn = document.createElement('button');
    delBtn.textContent = '✕';
    delBtn.className = 'start-btn secondary';
    delBtn.onclick = () => tr.remove();
    tdDel.appendChild(delBtn);

    tr.append(tdNum, tdName, tdPos, tdDel);
    return tr;
}

function openStartScreen() {
    const start = document.getElementById('start-screen');
    if (!start) return;
    const rosterTableBody = document.querySelector('#roster-table tbody');
    const rosterTeamLabel = document.getElementById('roster-team-label');

    function fillEditor(teamKey) {
        rosterTeamLabel.textContent = teamKey.toUpperCase();
        rosterTableBody.innerHTML = '';
        const team = rosters[teamKey];
        const rows = [];
        team.offense.forEach(p => rows.push({ number: p.number, name: p.name, pos: 'F' }));
        team.defense.forEach(p => rows.push({ number: p.number, name: p.name, pos: 'D' }));
        team.goalies.forEach(p => rows.push({ number: p.number, name: p.name, pos: 'G' }));
        rows.forEach(p => rosterTableBody.appendChild(buildRosterRow(p)));
    }

    let editorTeam = 'u21';
    document.querySelectorAll('.start-btn[data-team]').forEach(btn => {
        btn.addEventListener('click', () => {
            editorTeam = btn.getAttribute('data-team');
            fillEditor(editorTeam);
        });
    });

    document.getElementById('add-player').addEventListener('click', () => {
        rosterTableBody.appendChild(buildRosterRow());
    });

    document.getElementById('save-roster').addEventListener('click', () => {
        const newOff = []; const newDef = []; const newGol = [];
        rosterTableBody.querySelectorAll('tr').forEach(tr => {
            const [numEl, nameEl, posEl] = tr.querySelectorAll('input, select');
            const num = parseInt(numEl.value, 10) || '';
            const name = nameEl.value.trim();
            const pos = posEl.value;
            if (!name) return;
            if (pos === 'G') newGol.push({ number: num, name });
            else if (pos === 'D') newDef.push({ number: num, name });
            else newOff.push({ number: num, name });
        });
        rosters[editorTeam] = { offense: newOff, defense: newDef, goalies: newGol };
        saveRosters();
        currentTeam = editorTeam;
        start.style.display = 'none';
        if (teamSelectEl) teamSelectEl.value = currentTeam;
        console.log('💾 Roster gespeichert, initialisiere Selects...');
        initializeSelects();
        setTimeout(() => {
            const selects = document.querySelectorAll('.player-select');
            const buttons = document.querySelectorAll('.color-picker-btn');
            console.log(`🔍 Nach Roster-Speichern: ${selects.length} Selects, ${buttons.length} Buttons`);
            if (buttons.length < selects.length) {
                console.log('⚠️ Buttons fehlen, erstelle erneut...');
                initializeSelects();
            }
        }, 100);
        setTimeout(applyTextAlignment, 100);
    });

    fillEditor(currentTeam);
}

// Header open-start button shows the start overlay again
function wireHeaderBackButton() {
    const btn = document.getElementById('open-start');
    const start = document.getElementById('start-screen');
    if (!btn || !start) return;
    btn.onclick = () => {
        start.style.display = 'flex';
    };
}

// Print button handler
function wirePrintButton() {
    const btn = document.getElementById('print-btn');
    if (!btn) return;
    btn.addEventListener('click', () => {
        const start = document.getElementById('start-screen');
        let prevDisplay;
        if (start && start.style.display !== 'none') {
            prevDisplay = start.style.display;
            start.style.display = 'none';
        }
        window.print();
        // restore overlay shortly after print dialog opens/closes
        setTimeout(() => {
            if (start && prevDisplay) start.style.display = prevDisplay;
        }, 300);
    });
}

// Save button handler
function wireSaveButton() {
    const btn = document.getElementById('save-lineups-btn');
    if (!btn) return;
    btn.addEventListener('click', () => {
        saveLineups();
        // Zeige Bestätigung
        const originalText = btn.textContent;
        btn.textContent = '✓ Gespeichert!';
        btn.style.background = '#2e7d32';
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
        }, 2000);
    });
}

// Test-Funktion zum Prüfen des localStorage
window.testLineups = function() {
    const raw = localStorage.getItem(LINEUP_STORAGE_KEY);
    if (!raw) {
        console.log('❌ Keine Daten im localStorage');
        return;
    }
    const data = JSON.parse(raw);
    console.log('📦 Gespeicherte Daten:', data);
    console.log('📊 Anzahl Lineup-Keys:', Object.keys(data.lineups || {}).length);
    console.log('🔑 Erste 10 Keys:', Object.keys(data.lineups || {}).slice(0, 10));
    console.log('👥 Team:', data.team);
    return data;
};

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    loadRosters();
    setupAutoSave(); // Einmalig einrichten
    openStartScreen();
    setDefaultDate();
    // Warte bis DOM vollständig geladen ist
    setTimeout(() => {
        console.log('🔄 Initialisiere Selects und lade Lineups...');
        initializeSelects(); // Initialisiere Selects
        // Warte bis Selects initialisiert sind, dann lade Lineups
        setTimeout(() => {
            console.log('🔄 Starte Laden der Lineups...');
            loadLineups(); // Lade gespeicherte Lineups
            applyTextAlignment();
            // Stelle sicher, dass alle Buttons erstellt wurden
            setTimeout(() => {
                const selects = document.querySelectorAll('.player-select');
                const buttons = document.querySelectorAll('.color-picker-btn');
                console.log(`🔍 Prüfung: ${selects.length} Selects, ${buttons.length} Buttons`);
                if (buttons.length < selects.length) {
                    console.log('⚠️ Nicht alle Buttons wurden erstellt, versuche erneut...');
                    initializeSelects();
                }
            }, 200);
        }, 200);
    }, 100);
    wireHeaderBackButton();
    wirePrintButton();
    wireSaveButton();
});

