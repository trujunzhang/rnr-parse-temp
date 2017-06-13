/**
 * Copyright 2016 Facebook, Inc.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to
 * use, copy, modify, and distribute this software in source code or binary
 * form for use in connection with the web services and APIs provided by
 * Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use
 * of this software is subject to the Facebook Developer Principles and
 * Policies [http://developers.facebook.com/policy/]. This copyright notice
 * shall be included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE
 *
 * @flow
 */


const Parse = require('parse');

import type { ThunkAction } from './types';

const Maps = Parse.Object.extend('Maps');
const Notification = Parse.Object.extend('Notification');

const ShippingTask = Parse.Object.extend('ShippingTask');

function loadParseQuery(type: string, query: Parse.Query): ThunkAction {
  return (dispatch) => {
    return query.find({
        success: (list) => {
          // Flow can't guarantee {type, list} is a valid action
          dispatch(({type, list}: any));
      },
        error: (error)=>{
            debugger
        }
    });
  };
}

module.exports = {
  loadSessions: (): ThunkAction =>
    loadParseQuery(
      'LOADED_SESSIONS',
      new Parse.Query('Agenda')
        .include('speakers')
        .ascending('startTime')
    ),

  loadMaps: (): ThunkAction =>
    loadParseQuery('LOADED_MAPS', new Parse.Query(Maps)),

  loadNotifications: (): ThunkAction =>
        loadParseQuery('LOADED_NOTIFICATIONS', new Parse.Query(Notification)),


    loadShippingTasks: (): ThunkAction => {
        var query = new Parse.Query(ShippingTask);
        return loadParseQuery('LOADED_SHIPPING_TASKS', query);
    },
};
