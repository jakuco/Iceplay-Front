import {
  HttpClient
} from "./chunk-2QF6PXYN.js";
import {
  Injectable,
  Pipe,
  catchError,
  effect,
  firstValueFrom,
  inject,
  of,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable,
  ɵɵdefinePipe
} from "./chunk-HGKGTKMW.js";
import {
  __spreadValues
} from "./chunk-VUJOFXKG.js";

// src/app/core/services/i18n.service.ts
var I18nService = class _I18nService {
  http = inject(HttpClient);
  // Private signals for internal state management
  _translations = signal({}, __spreadValues({}, ngDevMode ? { debugName: "_translations" } : {}));
  _currentLanguage = signal("es", __spreadValues({}, ngDevMode ? { debugName: "_currentLanguage" } : {}));
  _isLoading = signal(true, __spreadValues({}, ngDevMode ? { debugName: "_isLoading" } : {}));
  /** Read-only signal for current language - use in templates/components */
  language = this._currentLanguage.asReadonly();
  /** Read-only signal for translations object - use in pipes to trigger re-evaluation */
  translations = this._translations.asReadonly();
  /** Read-only signal indicating if translations are currently loading */
  isLoading = this._isLoading.asReadonly();
  static VALID_LANGUAGES = ["es", "en"];
  constructor() {
    if (typeof localStorage !== "undefined") {
      const savedLang = localStorage.getItem("iceplay-language");
      if (_I18nService.VALID_LANGUAGES.includes(savedLang)) {
        this._currentLanguage.set(savedLang);
      }
    }
    this.loadLanguage(this._currentLanguage());
    effect(() => {
      const lang = this._currentLanguage();
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("iceplay-language", lang);
      }
    });
  }
  /**
   * Changes the application language and loads the corresponding translation file.
   * @param lang - The language code to switch to ('es' or 'en')
   */
  setLanguage(lang) {
    if (this._currentLanguage() !== lang) {
      this._currentLanguage.set(lang);
      this.loadLanguage(lang);
    }
  }
  /**
   * Loads translation file for the specified language from /i18n/{lang}.json
   * Uses firstValueFrom to convert Observable to Promise for better async/await support
   *
   * @param lang - The language code to load
   */
  async loadLanguage(lang) {
    this._isLoading.set(true);
    try {
      const translations = await firstValueFrom(this.http.get(`/i18n/${lang}.json`).pipe(catchError((error) => {
        console.error(`Failed to load language: ${lang}`, error);
        return of({});
      })));
      this._translations.set(translations);
    } finally {
      this._isLoading.set(false);
    }
  }
  /**
   * Translates a key using dot notation (e.g., 'common.sports' -> translations.common.sports)
   * @param key - Translation key in dot notation format
   * @param params - Optional parameters to replace in the translation (e.g., {{name}})
   * @returns Translated string or the key if translation not found
   */
  translate(key, params) {
    const translations = this._translations();
    if (!translations || Object.keys(translations).length === 0) {
      return key;
    }
    const keys = key.split(".");
    let value = translations;
    for (const k of keys) {
      if (value?.[k] !== void 0) {
        value = value[k];
      } else {
        return key;
      }
    }
    if (typeof value !== "string") {
      return key;
    }
    if (params) {
      return value.replace(/\{\{(\w+)\}\}/g, (match, paramKey) => {
        return params[paramKey] ?? match;
      });
    }
    return value;
  }
  /** Returns list of available languages with their display information */
  get availableLanguages() {
    return [
      { code: "es", label: "Espa\xF1ol", flag: "\u{1F1EA}\u{1F1F8}" },
      { code: "en", label: "English", flag: "\u{1F1EC}\u{1F1E7}" }
    ];
  }
  /**
   * Formats a date according to the current language locale.
   * @param date - Date object to format
   * @param options - Intl.DateTimeFormatOptions (default: { month: 'long', year: 'numeric' })
   * @returns Formatted date string in the current language
   */
  formatDate(date, options = { month: "long", year: "numeric" }) {
    const locale = this._currentLanguage() === "es" ? "es-ES" : "en-US";
    return date.toLocaleDateString(locale, options);
  }
  /**
   * Gets the locale string for the current language (e.g., 'es-ES', 'en-US')
   */
  getLocale() {
    return this._currentLanguage() === "es" ? "es-ES" : "en-US";
  }
  static \u0275fac = function I18nService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _I18nService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _I18nService, factory: _I18nService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(I18nService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [], null);
})();

// src/app/core/pipes/translate.pipe.ts
var TranslatePipe = class _TranslatePipe {
  i18n = inject(I18nService);
  transform(key, params) {
    this.i18n.language();
    this.i18n.translations();
    this.i18n.isLoading();
    return this.i18n.translate(key, params);
  }
  static \u0275fac = function TranslatePipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TranslatePipe)();
  };
  static \u0275pipe = /* @__PURE__ */ \u0275\u0275definePipe({ name: "translate", type: _TranslatePipe, pure: false });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TranslatePipe, [{
    type: Pipe,
    args: [{
      name: "translate",
      standalone: true,
      pure: false
      // Must be impure to react to signal changes
    }]
  }], null, null);
})();

export {
  I18nService,
  TranslatePipe
};
//# sourceMappingURL=chunk-DECWEXJP.js.map
