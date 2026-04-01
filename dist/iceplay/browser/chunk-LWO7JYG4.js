import {
  DomSanitizer,
  MatIcon,
  MatIconModule
} from "./chunk-AAICBOD7.js";
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  ViewChild,
  computed,
  inject,
  input,
  output,
  setClassMetadata,
  signal,
  viewChild,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵqueryAdvance,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeResourceUrl,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuerySignal
} from "./chunk-HGKGTKMW.js";
import {
  __spreadValues
} from "./chunk-VUJOFXKG.js";

// src/app/shared/ui/file-upload/file-upload.component.ts
var _c0 = ["fileInput"];
function FileUploadComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2)(1, "mat-icon", 6);
    \u0275\u0275text(2, "description");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 7);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 8);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 9);
    \u0275\u0275listener("click", function FileUploadComponent_Conditional_1_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.clear());
    });
    \u0275\u0275elementStart(8, "mat-icon", 10);
    \u0275\u0275text(9, "close");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.selectedFile().name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.selectedFileSize());
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-label", "Eliminar " + ctx_r2.selectedFile().name);
  }
}
function FileUploadComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 3)(1, "mat-icon", 11);
    \u0275\u0275text(2, "description");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "a", 12);
    \u0275\u0275text(4, "Ver documento actual");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 13);
    \u0275\u0275listener("click", function FileUploadComponent_Conditional_2_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.triggerFileInput());
    });
    \u0275\u0275elementStart(6, "mat-icon", 14);
    \u0275\u0275text(7, "swap_horiz");
    \u0275\u0275elementEnd();
    \u0275\u0275text(8, " Cambiar ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("href", ctx_r2.currentUrl(), \u0275\u0275sanitizeUrl);
  }
}
function FileUploadComponent_Conditional_3_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.hint());
  }
}
function FileUploadComponent_Conditional_3_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("M\xE1x ", ctx_r2.maxSizeMb(), " MB");
  }
}
function FileUploadComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 15);
    \u0275\u0275listener("click", function FileUploadComponent_Conditional_3_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.triggerFileInput());
    });
    \u0275\u0275elementStart(1, "mat-icon", 16);
    \u0275\u0275text(2, "attach_file");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, FileUploadComponent_Conditional_3_Conditional_4_Template, 2, 1, "p", 17)(5, FileUploadComponent_Conditional_3_Conditional_5_Template, 2, 1, "p", 17);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" Seleccionar ", ctx_r2.label(), "... ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.hint() ? 4 : 5);
  }
}
function FileUploadComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 4)(1, "mat-icon", 18);
    \u0275\u0275text(2, "warning");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r2.error(), " ");
  }
}
function formatBytes(bytes) {
  if (bytes < 1024 * 1024)
    return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
var FileUploadComponent = class _FileUploadComponent {
  currentUrl = input(null, __spreadValues({}, ngDevMode ? { debugName: "currentUrl" } : {}));
  accept = input(".pdf", __spreadValues({}, ngDevMode ? { debugName: "accept" } : {}));
  maxSizeMb = input(50, __spreadValues({}, ngDevMode ? { debugName: "maxSizeMb" } : {}));
  label = input("archivo", __spreadValues({}, ngDevMode ? { debugName: "label" } : {}));
  hint = input("", __spreadValues({}, ngDevMode ? { debugName: "hint" } : {}));
  fileChange = output();
  fileInputRef = viewChild.required("fileInput");
  selectedFile = signal(null, __spreadValues({}, ngDevMode ? { debugName: "selectedFile" } : {}));
  error = signal("", __spreadValues({}, ngDevMode ? { debugName: "error" } : {}));
  selectedFileSize = computed(() => this.selectedFile() ? formatBytes(this.selectedFile().size) : "", __spreadValues({}, ngDevMode ? { debugName: "selectedFileSize" } : {}));
  triggerFileInput() {
    this.fileInputRef().nativeElement.click();
  }
  onFileSelected(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file)
      return;
    if (file.size > this.maxSizeMb() * 1024 * 1024) {
      this.error.set(`El archivo no puede superar ${this.maxSizeMb()} MB`);
      return;
    }
    this.error.set("");
    this.selectedFile.set(file);
    this.fileChange.emit(file);
  }
  clear() {
    this.selectedFile.set(null);
    this.error.set("");
    this.fileChange.emit(null);
  }
  static \u0275fac = function FileUploadComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FileUploadComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FileUploadComponent, selectors: [["app-file-upload"]], viewQuery: function FileUploadComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.fileInputRef, _c0, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance();
    }
  }, inputs: { currentUrl: [1, "currentUrl"], accept: [1, "accept"], maxSizeMb: [1, "maxSizeMb"], label: [1, "label"], hint: [1, "hint"] }, outputs: { fileChange: "fileChange" }, decls: 7, vars: 4, consts: [["fileInput", ""], [1, "flex", "flex-col", "gap-1.5"], [1, "flex", "items-center", "gap-2.5", "px-3", "py-2.5", "rounded-lg", "bg-blue-50", "border", "border-blue-200", "text-[13px]"], [1, "flex", "items-center", "gap-2.5", "px-3", "py-2.5", "rounded-lg", "bg-gray-50", "border", "border-gray-200", "text-[13px]"], [1, "m-0", "flex", "items-center", "gap-1.5", "text-[12px]", "text-red-600"], ["type", "file", 1, "sr-only", 3, "change"], [1, "!size-[18px]", "!text-[18px]", "text-blue-500", "shrink-0"], [1, "flex-1", "truncate", "text-gray-800", "font-medium"], [1, "text-[11px]", "text-gray-400", "shrink-0"], ["type", "button", 1, "size-5", "flex", "items-center", "justify-center", "rounded", "text-gray-400", "bg-transparent", "border-none", "cursor-pointer", "hover:text-red-500", "transition-colors", 3, "click"], [1, "!size-[16px]", "!text-[16px]"], [1, "!size-[18px]", "!text-[18px]", "text-gray-400", "shrink-0"], ["target", "_blank", "rel", "noopener noreferrer", 1, "flex-1", "truncate", "text-blue-600", "hover:underline", "font-medium", 3, "href"], ["type", "button", 1, "inline-flex", "items-center", "gap-1", "px-2", "py-1", "rounded-md", "bg-white", "border", "border-gray-300", "text-[11.5px]", "font-medium", "text-gray-600", "cursor-pointer", "hover:bg-gray-100", "transition-colors", 3, "click"], [1, "!size-[13px]", "!text-[13px]"], ["type", "button", 1, "inline-flex", "items-center", "gap-2", "px-3", "py-2.5", "rounded-lg", "bg-white", "border", "border-dashed", "border-gray-300", "text-[13px]", "font-medium", "text-gray-600", "cursor-pointer", "hover:border-blue-400", "hover:bg-blue-50", "hover:text-blue-600", "transition-colors", "w-full", "justify-center", 3, "click"], [1, "!size-[17px]", "!text-[17px]"], [1, "m-0", "text-[11px]", "text-gray-400", "text-center"], [1, "!size-[14px]", "!text-[14px]"]], template: function FileUploadComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 1);
      \u0275\u0275conditionalCreate(1, FileUploadComponent_Conditional_1_Template, 10, 3, "div", 2)(2, FileUploadComponent_Conditional_2_Template, 9, 1, "div", 3)(3, FileUploadComponent_Conditional_3_Template, 6, 2);
      \u0275\u0275conditionalCreate(4, FileUploadComponent_Conditional_4_Template, 4, 1, "p", 4);
      \u0275\u0275elementStart(5, "input", 5, 0);
      \u0275\u0275listener("change", function FileUploadComponent_Template_input_change_5_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onFileSelected($event));
      });
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.selectedFile() ? 1 : ctx.currentUrl() ? 2 : 3);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.error() ? 4 : -1);
      \u0275\u0275advance();
      \u0275\u0275attribute("accept", ctx.accept())("aria-label", "Seleccionar " + ctx.label());
    }
  }, dependencies: [MatIconModule, MatIcon], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n}\n.sr-only[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n}\n/*# sourceMappingURL=file-upload.component.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FileUploadComponent, [{
    type: Component,
    args: [{ selector: "app-file-upload", changeDetection: ChangeDetectionStrategy.OnPush, imports: [MatIconModule], template: `
    <div class="flex flex-col gap-1.5">

      @if (selectedFile()) {
        <!-- State B: file selected -->
        <div class="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-blue-50
                    border border-blue-200 text-[13px]">
          <mat-icon class="!size-[18px] !text-[18px] text-blue-500 shrink-0">description</mat-icon>
          <span class="flex-1 truncate text-gray-800 font-medium">{{ selectedFile()!.name }}</span>
          <span class="text-[11px] text-gray-400 shrink-0">{{ selectedFileSize() }}</span>
          <button
            class="size-5 flex items-center justify-center rounded text-gray-400
                   bg-transparent border-none cursor-pointer hover:text-red-500 transition-colors"
            type="button"
            (click)="clear()"
            [attr.aria-label]="'Eliminar ' + selectedFile()!.name"
          >
            <mat-icon class="!size-[16px] !text-[16px]">close</mat-icon>
          </button>
        </div>

      } @else if (currentUrl()) {
        <!-- State C: existing URL -->
        <div class="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-gray-50
                    border border-gray-200 text-[13px]">
          <mat-icon class="!size-[18px] !text-[18px] text-gray-400 shrink-0">description</mat-icon>
          <a
            [href]="currentUrl()!"
            target="_blank"
            rel="noopener noreferrer"
            class="flex-1 truncate text-blue-600 hover:underline font-medium"
          >Ver documento actual</a>
          <button
            class="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white border
                   border-gray-300 text-[11.5px] font-medium text-gray-600 cursor-pointer
                   hover:bg-gray-100 transition-colors"
            type="button"
            (click)="triggerFileInput()"
          >
            <mat-icon class="!size-[13px] !text-[13px]">swap_horiz</mat-icon>
            Cambiar
          </button>
        </div>

      } @else {
        <!-- State A: empty -->
        <button
          class="inline-flex items-center gap-2 px-3 py-2.5 rounded-lg bg-white
                 border border-dashed border-gray-300 text-[13px] font-medium
                 text-gray-600 cursor-pointer hover:border-blue-400 hover:bg-blue-50
                 hover:text-blue-600 transition-colors w-full justify-center"
          type="button"
          (click)="triggerFileInput()"
        >
          <mat-icon class="!size-[17px] !text-[17px]">attach_file</mat-icon>
          Seleccionar {{ label() }}...
        </button>
        @if (hint()) {
          <p class="m-0 text-[11px] text-gray-400 text-center">{{ hint() }}</p>
        } @else {
          <p class="m-0 text-[11px] text-gray-400 text-center">M\xE1x {{ maxSizeMb() }} MB</p>
        }
      }

      @if (error()) {
        <p class="m-0 flex items-center gap-1.5 text-[12px] text-red-600">
          <mat-icon class="!size-[14px] !text-[14px]">warning</mat-icon>
          {{ error() }}
        </p>
      }

      <input
        #fileInput
        type="file"
        [attr.accept]="accept()"
        class="sr-only"
        [attr.aria-label]="'Seleccionar ' + label()"
        (change)="onFileSelected($event)"
      />
    </div>
  `, styles: ["/* angular:styles/component:scss;ffbdfcf735d6d37916a16e3bad1a7856cb7317fa5749f874de64b4df368606cc;D:/Fropen/Iceplay/Iceplay-Front/src/app/shared/ui/file-upload/file-upload.component.ts */\n:host {\n  display: block;\n}\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n}\n/*# sourceMappingURL=file-upload.component.css.map */\n"] }]
  }], null, { currentUrl: [{ type: Input, args: [{ isSignal: true, alias: "currentUrl", required: false }] }], accept: [{ type: Input, args: [{ isSignal: true, alias: "accept", required: false }] }], maxSizeMb: [{ type: Input, args: [{ isSignal: true, alias: "maxSizeMb", required: false }] }], label: [{ type: Input, args: [{ isSignal: true, alias: "label", required: false }] }], hint: [{ type: Input, args: [{ isSignal: true, alias: "hint", required: false }] }], fileChange: [{ type: Output, args: ["fileChange"] }], fileInputRef: [{ type: ViewChild, args: ["fileInput", { isSignal: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FileUploadComponent, { className: "FileUploadComponent", filePath: "src/app/shared/ui/file-upload/file-upload.component.ts", lineNumber: 100 });
})();

// src/app/shared/ui/pdf-viewer/pdf-viewer.component.ts
function PdfViewerComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h2", 5);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.title());
  }
}
var PdfViewerComponent = class _PdfViewerComponent {
  url = input.required(__spreadValues({}, ngDevMode ? { debugName: "url" } : {}));
  title = input("", __spreadValues({}, ngDevMode ? { debugName: "title" } : {}));
  close = output();
  sanitizer = inject(DomSanitizer);
  safeUrl = computed(() => this.sanitizer.bypassSecurityTrustResourceUrl(this.url()), __spreadValues({}, ngDevMode ? { debugName: "safeUrl" } : {}));
  static \u0275fac = function PdfViewerComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PdfViewerComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PdfViewerComponent, selectors: [["app-pdf-viewer"]], inputs: { url: [1, "url"], title: [1, "title"] }, outputs: { close: "close" }, decls: 11, vars: 3, consts: [["role", "dialog", "aria-modal", "true", 1, "fixed", "inset-0", "z-[200]", "flex", "items-center", "justify-center", "p-4", 2, "background", "rgba(0,0,0,0.55)", 3, "click"], [1, "flex", "flex-col", "bg-white", "rounded-2xl", "shadow-2xl", "w-full", "overflow-hidden", 2, "max-width", "900px", "max-height", "92vh", 3, "click"], [1, "flex", "items-center", "justify-between", "px-5", "py-3.5", "border-b", "border-gray-100", "shrink-0"], [1, "flex", "items-center", "gap-2.5", "min-w-0"], [1, "!size-5", "!text-[20px]", "text-gray-400", "shrink-0"], [1, "m-0", "text-[15px]", "font-semibold", "text-gray-900", "truncate"], ["type", "button", "aria-label", "Cerrar visor de documento", 1, "size-8", "flex", "items-center", "justify-center", "rounded-lg", "text-gray-400", "hover:bg-gray-100", "border-none", "bg-transparent", "cursor-pointer", "transition-colors", "shrink-0", "ml-3", 3, "click"], [1, "!size-[18px]", "!text-[18px]"], ["title", "Visor de documento", 1, "flex-1", "w-full", "border-none", 2, "min-height", "0", "height", "80vh", 3, "src"]], template: function PdfViewerComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275listener("click", function PdfViewerComponent_Template_div_click_0_listener() {
        return ctx.close.emit();
      });
      \u0275\u0275elementStart(1, "div", 1);
      \u0275\u0275listener("click", function PdfViewerComponent_Template_div_click_1_listener($event) {
        return $event.stopPropagation();
      });
      \u0275\u0275elementStart(2, "div", 2)(3, "div", 3)(4, "mat-icon", 4);
      \u0275\u0275text(5, "description");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(6, PdfViewerComponent_Conditional_6_Template, 2, 1, "h2", 5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "button", 6);
      \u0275\u0275listener("click", function PdfViewerComponent_Template_button_click_7_listener() {
        return ctx.close.emit();
      });
      \u0275\u0275elementStart(8, "mat-icon", 7);
      \u0275\u0275text(9, "close");
      \u0275\u0275elementEnd()()();
      \u0275\u0275element(10, "iframe", 8);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275attribute("aria-label", ctx.title() || "Visor de documento");
      \u0275\u0275advance(6);
      \u0275\u0275conditional(ctx.title() ? 6 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275property("src", ctx.safeUrl(), \u0275\u0275sanitizeResourceUrl);
    }
  }, dependencies: [MatIconModule, MatIcon], encapsulation: 2, changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PdfViewerComponent, [{
    type: Component,
    args: [{
      selector: "app-pdf-viewer",
      changeDetection: ChangeDetectionStrategy.OnPush,
      imports: [MatIconModule],
      template: `
    <!-- Overlay -->
    <div
      class="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style="background: rgba(0,0,0,0.55);"
      (click)="close.emit()"
      role="dialog"
      [attr.aria-label]="title() || 'Visor de documento'"
      aria-modal="true"
    >
      <!-- Card -->
      <div
        class="flex flex-col bg-white rounded-2xl shadow-2xl w-full overflow-hidden"
        style="max-width: 900px; max-height: 92vh;"
        (click)="$event.stopPropagation()"
      >
        <!-- Header -->
        <div class="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 shrink-0">
          <div class="flex items-center gap-2.5 min-w-0">
            <mat-icon class="!size-5 !text-[20px] text-gray-400 shrink-0">description</mat-icon>
            @if (title()) {
              <h2 class="m-0 text-[15px] font-semibold text-gray-900 truncate">{{ title() }}</h2>
            }
          </div>
          <button
            class="size-8 flex items-center justify-center rounded-lg text-gray-400
                   hover:bg-gray-100 border-none bg-transparent cursor-pointer transition-colors
                   shrink-0 ml-3"
            type="button"
            (click)="close.emit()"
            aria-label="Cerrar visor de documento"
          >
            <mat-icon class="!size-[18px] !text-[18px]">close</mat-icon>
          </button>
        </div>

        <!-- PDF iframe -->
        <iframe
          [src]="safeUrl()"
          class="flex-1 w-full border-none"
          style="min-height: 0; height: 80vh;"
          title="Visor de documento"
        ></iframe>
      </div>
    </div>
  `
    }]
  }], null, { url: [{ type: Input, args: [{ isSignal: true, alias: "url", required: true }] }], title: [{ type: Input, args: [{ isSignal: true, alias: "title", required: false }] }], close: [{ type: Output, args: ["close"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PdfViewerComponent, { className: "PdfViewerComponent", filePath: "src/app/shared/ui/pdf-viewer/pdf-viewer.component.ts", lineNumber: 58 });
})();

export {
  FileUploadComponent,
  PdfViewerComponent
};
//# sourceMappingURL=chunk-LWO7JYG4.js.map
