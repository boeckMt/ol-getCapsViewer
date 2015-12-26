/// <reference path="../../../typings/tsd.d.ts" />

import {Pipe} from 'angular2/core';

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
@Pipe({ name: 'startsWith' })
export class StartsWithPipe {
  transform(value, [field, letter]) {  // 1: value passed in, 2: array
    return value.filter((item) => {
      return item[field].startsWith(letter);
    })
  }
}
