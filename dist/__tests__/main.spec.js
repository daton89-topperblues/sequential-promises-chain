"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
Object.defineProperty(exports, "__esModule", { value: true });
var main_1 = require("../src/main");
describe('Async', function () {
    test('success', function () { return __awaiter(_this, void 0, void 0, function () {
        var spc, array, fn, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    spc = new main_1.default();
                    array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
                    fn = function (element, index, fnArray) {
                        return new Promise(function (resolve, reject) {
                            var randInterval = (Math.floor(Math.random() * 9) + 1) * 10;
                            setTimeout(function () {
                                return resolve(element);
                            }, randInterval);
                        });
                    };
                    return [4 /*yield*/, spc.resolve(array, fn)];
                case 1:
                    res = _a.sent();
                    expect(array).toEqual(res);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('Async with iteratee', function () {
    test('success', function () { return __awaiter(_this, void 0, void 0, function () {
        var spc, users, predicate, iteratee, final;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    spc = new main_1.default();
                    users = [{ name: 'Jonathan' }, { name: 'Toni' }, { name: 'Nicola' }];
                    predicate = function (user, index) {
                        return new Promise(function (resolve, reject) {
                            user.id = index;
                            setTimeout(function () {
                                resolve(user);
                            }, 1000);
                        });
                    };
                    iteratee = function (user) {
                        return user;
                    };
                    return [4 /*yield*/, spc.resolve(users, predicate, iteratee)];
                case 1:
                    final = _a.sent();
                    expect(final.length).toBe(3);
                    expect(final[0].name).toBe(users[0].name);
                    expect(final[0].id).toBe(0);
                    expect(final[1].name).toBe(users[1].name);
                    expect(final[1].id).toBe(1);
                    expect(final[2].name).toBe(users[2].name);
                    expect(final[2].id).toBe(2);
                    return [2 /*return*/];
            }
        });
    }); });
    test('fail', function () { return __awaiter(_this, void 0, void 0, function () {
        var spc, users, predicate, iteratee, final, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    spc = new main_1.default();
                    users = [{ name: 'Jonathan' }, { name: 'Toni' }, { name: 'Nicola' }];
                    predicate = function (user, index) {
                        return new Promise(function (resolve, reject) {
                            user.id = index;
                            setTimeout(function () {
                                if (index === 1) {
                                    var error = new Error('Fake error');
                                    reject({ index: index, error: error });
                                }
                                else {
                                    resolve(user);
                                }
                            }, 1000);
                        });
                    };
                    iteratee = function (user) {
                        return user;
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, spc.resolve(users, predicate, iteratee)];
                case 2:
                    final = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    expect(error_1.index).toBe(1);
                    expect(error_1.error.message).toBe('Fake error');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    test('fail and force continue', function () { return __awaiter(_this, void 0, void 0, function () {
        var force, spc, users, predicate, iteratee, final, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    force = true;
                    spc = new main_1.default(force);
                    users = [{ name: 'Jonathan' }, { name: 'Toni' }, { name: 'Nicola' }];
                    predicate = function (user, index) {
                        return new Promise(function (resolve, reject) {
                            user.id = index;
                            setTimeout(function () {
                                if (index === 1) {
                                    var error = new Error('Fake error');
                                    reject({ index: index, error: error });
                                }
                                else {
                                    resolve(user);
                                }
                            }, 1000);
                        });
                    };
                    iteratee = function (user) {
                        return user;
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, spc.resolve(users, predicate, iteratee)];
                case 2:
                    final = _a.sent();
                    expect(final.final.length).toBe(2);
                    expect(final.fail.length).toBe(1);
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    expect(error_2).toBeUndefined();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=main.spec.js.map