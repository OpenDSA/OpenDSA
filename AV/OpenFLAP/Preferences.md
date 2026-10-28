# OpenFLAP preferences

Preferences use plain JavaScript and browser local storage. No additional libraries
or build step are required.

## Files

- `PreferencesStore.js`: the definitions, defaults, allowed choices, validation,
  storage key, loading/saving, and shared palette application.
- `Preferences.html`: the preferences form and its labels. Each control's `name`
  matches a key in the shared definitions.
- `Preferences.js`: fills the form and saves its named controls. It also handles
  Save, Close, Cancel, and Escape.
- `OpenFLAP.js`: applies preferences to the launcher and responds to changes saved
  from the preferences window.
- `css/OpenFLAP.css`: the palette colors and layout.

Both HTML pages load `PreferencesStore.js` before their page script using `defer`.
The shared API is `window.OpenFLAPPreferences`.

## Add a preference

1. Add a definition in `PreferencesStore.js`. For a select, provide a default and
   its choices. The default must be one of those choices:

   ```javascript
   toolOrder: {
     defaultValue: "standard",
     choices: [
       { value: "standard", label: "Standard order" },
       { value: "alphabetical", label: "Alphabetical order" }
     ]
   }
   ```

2. Add a labeled control inside the form in `Preferences.html`:

   ```html
   <label for="tool-order">Tool order</label>
   <select id="tool-order" name="toolOrder"></select>
   ```

   The form fills select options from the shared definition and automatically
   loads and saves registered named controls. No change to the form script is
   needed. Boolean preferences use `{ defaultValue: true }` (or `false`) and an
   `<input type="checkbox" name="preferenceName">` with a matching label.
   The generic form currently supports selects, checkboxes, and string inputs;
   number inputs or more complex controls need explicit conversion/validation.

3. Implement the effect in the page that uses it. For launcher behavior, add it
   to `applyPreferences()` in `OpenFLAP.js`. The existing storage/focus listeners
   already reload saved values. Machine editor pages would need to load the
   store and apply the relevant setting themselves.

4. Check first-visit defaults, Save followed by reload, Cancel, and behavior in
   an already open launcher.

To add a palette, add a choice to the `palette` definition and a matching
`:root[data-palette="value"]` block in `css/OpenFLAP.css`.

## Storage behavior

The existing key `openflap.preferences` and saved values remain compatible.
`load()` returns a fresh settings object, using defaults for missing/invalid
registered values. Malformed JSON and unavailable storage do not break loading.
`save(changes)` merges registered fields with existing data and returns the saved
settings. It preserves keys it does not recognize, so older open windows do not
silently erase newer settings. It throws for invalid registered changes or failed
writes; the form reports failure and remains open. Closing does not save.

When the storage key changes in another window, the launcher reloads settings.
The palette applies to the launcher and Preferences page, not existing editors.
Preferences belong to the same browser profile and origin (scheme, host, port).
