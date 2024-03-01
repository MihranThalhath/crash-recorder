/** @odoo-module **/

import {RPCErrorDialog} from "@web/core/errors/error_dialogs";
import {patch} from "@web/core/utils/patch";
import rpc from "web.rpc";


/**
 * Start recording when Odoo loads
 * In Odoo 14, CrashManager was used to handle this, but I am really not sure
 * about how to handle this in Odoo 15+. So trying this approach for now.
 * TODO: improve the code by moving this to a specific Odoo class
 */
let rrwebBufferA = [];
let rrwebBufferB = [];
let rrwebWritingToBufferA = true;

rrweb.record({
    emit(event, isCheckout) {
        if (isCheckout) {
            if (rrwebWritingToBufferA) {
                rrwebBufferB = [];
            } else {
                rrwebBufferA = [];
            }

            rrwebWritingToBufferA = !rrwebWritingToBufferA;
        }

        if (rrwebWritingToBufferA) {
            rrwebBufferA.push(event);
        } else {
            rrwebBufferB.push(event);
        }
    },
    checkoutEveryNms: 30 * 1000,  // checkout every 30 seconds
});

// Patch RPCErrorDialog to save events when an error occurs
patch(
    RPCErrorDialog.prototype,
    "crash_recorder/static/src/js/rrweb.js",
    {
        setup() {
            this._super();
            this.show_error();
        },

        rrwebSaveEvents(traceback) {
            var toSave = [];

            if (rrwebWritingToBufferA) {
                toSave = rrwebBufferB.concat(rrwebBufferA);
            } else {
                toSave = rrwebBufferA.concat(rrwebBufferB);
            }

            rpc.query({
                model: "rrweb.recording",
                method: "create",
                args: [{events: JSON.stringify({toSave}), error: traceback}],
            });
        },

        /**
         * A delayed wrapper around rrwebSaveEvents to still capture
         * part of the error screen.
         */
        rrwebSaveEventsSoon(traceback) {
            setTimeout(() => this.rrwebSaveEvents(traceback), 3000);
        },

        show_error() {
            const traceback = this.props.data.debug;
            this.rrwebSaveEventsSoon(traceback);
        },
    }
);
