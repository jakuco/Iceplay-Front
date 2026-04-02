import {
  HttpClient,
  HttpParams
} from "./chunk-2QF6PXYN.js";
import {
  Injectable,
  inject,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-HGKGTKMW.js";

// src/environments/environment.ts
var environment = {
  baseUrl: "http://localhost:3001/api"
};

// src/app/core/services/api.service.ts
var ApiService = class _ApiService {
  http = inject(HttpClient);
  baseUrl = environment.baseUrl;
  get(path, params) {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach((key) => {
        if (params[key] !== null && params[key] !== void 0) {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }
    return this.http.get(`${this.baseUrl}/${path}`, { params: httpParams });
  }
  post(path, body, options) {
    console.log("POST request to:", `${this.baseUrl}/${path}`, "with body:", body);
    return this.http.post(`${this.baseUrl}/${path}`, body, options);
  }
  put(path, body) {
    return this.http.put(`${this.baseUrl}/${path}`, body);
  }
  patch(path, body) {
    return this.http.patch(`${this.baseUrl}/${path}`, body);
  }
  delete(path) {
    return this.http.delete(`${this.baseUrl}/${path}`);
  }
  subscribe(path) {
    const source = new EventSource(`${this.baseUrl}/${path}`);
    return source;
  }
  static \u0275fac = function ApiService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ApiService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ApiService, factory: _ApiService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ApiService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  ApiService
};
//# sourceMappingURL=chunk-I4DDBC3P.js.map
