/** @odoo-module **/

import { BinaryField, binaryField } from "@web/views/fields/binary/binary_field";
import { onMounted, useRef } from "@odoo/owl";
import { registry } from "@web/core/registry";

export class RRWebPlayer extends BinaryField {

    setup() {
        this._field_rrweb = useRef('field_rrweb');
        onMounted(this.onMounted);
    }

    onMounted() {
        this.initializeRRWebPlayer();
    }

    initializeRRWebPlayer() {
        if (this._field_rrweb && this._field_rrweb.el) {
            setTimeout(() => { // TODO
                fetch(`/web/content/rrweb.recording/${this.props.record.model.config.resId}/events`)
                    .then((response) => response.json())
                    .then((events) => {
                        new rrwebPlayer({
                            target: this._field_rrweb.el,
                            data: {
                                events: events.toSave,
                                autoPlay: true
                            }
                        });
                    });
            }, 2000);
        }
    }

}

RRWebPlayer.template = "FieldRRWeb";

export const rrWebPlayer = {
    ...binaryField,
    component: RRWebPlayer,
};

registry.category("fields").add("rrweb_player", rrWebPlayer);
