var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
var w = window;
var loadResources = function () { return __awaiter(_this, void 0, void 0, function () {
    var storage, _a, SHAREPOINT_SITE_PATH, METADATA_API_URL, METADATA_API_DIRECTORY, LIST_API_SITE, LIST_API_URL, SEARCH_API_URL, SEARCH_CLIENT_ID, SEARCH_TENANT_ID, response, result, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                storage = w.sessionStorage;
                return [4 /*yield*/, fetch("./js/appsettings.json").then(function (res) { if (!res.ok) throw new Error("appsettings.json no encontrado"); return res.json(); }).catch(function () { return {}; })];
            case 1:
                _a = _b.sent(), SHAREPOINT_SITE_PATH = _a.SHAREPOINT_SITE_PATH, METADATA_API_URL = _a.METADATA_API_URL, METADATA_API_DIRECTORY = _a.METADATA_API_DIRECTORY, LIST_API_SITE = _a.LIST_API_SITE, LIST_API_URL = _a.LIST_API_URL, SEARCH_API_URL = _a.SEARCH_API_URL, SEARCH_CLIENT_ID = _a.SEARCH_CLIENT_ID, SEARCH_TENANT_ID = _a.SEARCH_TENANT_ID;
                w.LIST_API_SITE = LIST_API_SITE;
                w.LIST_API_URL = LIST_API_URL;
                w.SEARCH_API_URL = SEARCH_API_URL;
                w.SEARCH_CLIENT_ID = SEARCH_CLIENT_ID;
                w.SEARCH_TENANT_ID = SEARCH_TENANT_ID;
                _b.label = 2;
            case 2:
                _b.trys.push([2, 6, , 7]);
                return [4 /*yield*/, fetch(METADATA_API_URL, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json;charset=utf-8",
                        },
                        body: JSON.stringify({
                            query: "query getMetadataSite($site: String!, $type: DIRECTORY!) {\r\n  getMetadataGlobal(type: $type) {\r\n    title\r\n    scope\r\n    structure\r\n    data\r\n    props\r\n    type\r\n    target\r\n    date\r\n    allowedTypes\r\n  }\r\n  getMetadataSite(site: $site, type: $type) {\r\n    title\r\n    scope\r\n    structure\r\n    data\r\n    props\r\n    type\r\n    target\r\n    date\r\n    allowedTypes\r\n  }\r\n  getMetadataPage(site: $site, type: $type) {\r\n    title\r\n    scope\r\n    structure\r\n    data\r\n    props\r\n    type\r\n    target\r\n    date\r\n    allowedTypes\r\n  }\r\n}\r\n",
                            variables: {
                                site: SHAREPOINT_SITE_PATH,
                                type: METADATA_API_DIRECTORY,
                            },
                        }),
                    })];
            case 3:
                response = _b.sent();
                if (!response.ok) return [3 /*break*/, 5];
                return [4 /*yield*/, response.json()];
            case 4:
                result = _b.sent();
                w.YL_SHAREPOINT_SITE = SHAREPOINT_SITE_PATH;
                storage.setItem("ylite.metadataLocal" + "." + SHAREPOINT_SITE_PATH, JSON.stringify(result.data.getMetadataSite));
                storage.setItem("ylite.metadataGlobal", JSON.stringify(result.data.getMetadataGlobal));
                storage.setItem("ylite.metadataPage" + "." + SHAREPOINT_SITE_PATH, JSON.stringify(result.data.getMetadataPage));
                _b.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                err_1 = _b.sent();
                console.error("Error loading metadata", err_1);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
loadResources();
var createApp = w.Vue.createApp;
var setRawHTML = w.ylComponents.useData().setRawHTML;
var currentPage = w.ylComponents.useMetadata().currentPage;
w.YL_CURRENT_PAGE = currentPage.value;
var countComponent = 0;
var components = Array.from(document.querySelectorAll("[is^='vue:']"));
components.forEach(function (comp) {
    var ylid = "comp__" + countComponent++;
    comp.setAttribute("data-yl-id", ylid);
    setRawHTML(ylid, comp.outerHTML);
});
var templates = Array.from(document.querySelectorAll("template"));
templates.forEach(function (template) {
    var components = Array.from(template.content.querySelectorAll("[is^='vue:']"));
    components.forEach(function (comp) {
        var ylid = "comp__" + countComponent++;
        comp.setAttribute("data-yl-id", ylid);
        setRawHTML(ylid, comp.outerHTML);
    });
});
var app = createApp({});
app.directive("ylite", {});
w.ylComponents.components.forEach(function (component) {
    app.component(component.id, component.constructor);
});
w.ylComponents.dependencies.forEach(function (dep) {
    app.component(dep.id, dep.constructor);
});
app.mount("#rootcontent");
