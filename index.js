"use strict";
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
        while (_) try {
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
exports.__esModule = true;
var query_string_1 = require("query-string");
var axios_1 = require("axios");
var url_join_1 = require("url-join");
var poster_1 = require("./poster");
exports.poster = poster_1.poster;
var PosterApiClient = /** @class */ (function () {
    function PosterApiClient(options) {
        this.options = options;
    }
    PosterApiClient.prototype._post = function (path, body, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, axios_1["default"].post(url_join_1["default"](this.getApiRoot(), path), body, options).then(function (result) { return result.data.response; })];
            });
        });
    };
    PosterApiClient.prototype._get = function (path, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, axios_1["default"].get(url_join_1["default"](this.getApiRoot(), path), options).then(function (result) { return result.data.response; })];
            });
        });
    };
    PosterApiClient.prototype.preRun = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.options.accessToken) {
                    return [2 /*return*/, Promise.resolve(this.options.accessToken)];
                }
                throw new Error("accessToken does not exist in api client options");
            });
        });
    };
    // Common
    PosterApiClient.prototype.getApiRoot = function () {
        return this.options.apiRoot || poster_1.poster.DEFAULT_API_ROOT;
    };
    PosterApiClient.prototype.setAccessToken = function (accessToken) {
        this.options.accessToken = accessToken;
    };
    // Authorization
    PosterApiClient.prototype.getAuthorizationRedirectUrl = function () {
        var query = query_string_1["default"].stringify({
            application_id: this.options.applicationId,
            redirect_uri: this.options.returnUrl,
            response_type: "code"
        });
        return url_join_1["default"](this.getApiRoot(), "/api/auth?" + query);
    };
    PosterApiClient.prototype.getAccessToken = function (account, code) {
        return __awaiter(this, void 0, void 0, function () {
            var url, body, options;
            return __generator(this, function (_a) {
                url = "https://" + account + ".joinposter.com/api/v2/auth/access_token";
                body = {
                    application_id: this.options.applicationId,
                    application_secret: this.options.applicationSecret,
                    redirect_uri: this.options.returnUrl,
                    code: code,
                    grant_type: "authorization_code"
                };
                options = {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                };
                return [2 /*return*/, axios_1["default"].post(url, body, options).then(function (result) { return result.data; })];
            });
        });
    };
    // Products
    PosterApiClient.prototype.getProductById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.preRun().then(function (accessToken) { return _this._get("/api/menu.getProduct?token=" + accessToken + "&product_id=" + id); })];
            });
        });
    };
    // Categories
    PosterApiClient.prototype.getCategoryById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.preRun().then(function (accessToken) { return _this._get("/api/menu.getCategory?token=" + accessToken + "&category_id=" + id); })];
            });
        });
    };
    // Orders
    PosterApiClient.prototype.createIncomingOrder = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.preRun().then(function (accessToken) { return _this._post("/api/incomingOrders.createIncomingOrder?token=" + accessToken, body); })];
            });
        });
    };
    PosterApiClient.prototype.getIncomingOrderById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.preRun().then(function (accessToken) { return _this._get("/api/incomingOrders.getIncomingOrder?token=" + accessToken + "&incoming_order_id=" + id); })];
            });
        });
    };
    return PosterApiClient;
}());
exports.PosterApiClient = PosterApiClient;
