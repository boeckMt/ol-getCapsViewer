/// <reference path="../../../typings/tsd.d.ts" />
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
/* http://www.cnblogs.com/Answer1215/p/4916192.html
 * Filter Object key starts with
 *
 * Usage:
 *   value | startsWith: 'key': 'letter'
 * Example:
 *   {{ {title: 'sep'} |  exponentialStrength:'title': 's'}}
 *   return {title: 'sep'}
 *
 *  {{ {title: 'sep'} |  exponentialStrength:'title': 'x'}}
 *   no return
*/
var StartsWithPipe = (function () {
    function StartsWithPipe() {
    }
    StartsWithPipe.prototype.transform = function (value, _a) {
        var field = _a[0], letter = _a[1];
        return value.filter(function (item) {
            return item[field].startsWith(letter);
        });
    };
    StartsWithPipe = __decorate([
        core_1.Pipe({ name: 'startsWith' }), 
        __metadata('design:paramtypes', [])
    ], StartsWithPipe);
    return StartsWithPipe;
})();
exports.StartsWithPipe = StartsWithPipe;
