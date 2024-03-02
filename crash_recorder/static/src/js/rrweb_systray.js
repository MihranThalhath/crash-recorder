/** @odoo-module **/

import { Component } from '@odoo/owl';
import { registry } from "@web/core/registry";

export class RecordingNoticeWidget extends Component { }
RecordingNoticeWidget.template = "crash_recorder.recording_notice";

export const systrayItem = {
    Component: RecordingNoticeWidget,
};
registry.category("systray").add("crash_recorder.recording_notice", systrayItem, { sequence: 100 });
