/** @odoo-module **/

import SystrayMenu from 'web.SystrayMenu';
import Widget from 'web.Widget';

const RecordingNoticeWidget = Widget.extend({
    template: 'crash_recorder.recording_notice',
    name: 'recording_notice',
});

SystrayMenu.Items.push(RecordingNoticeWidget);

export default RecordingNoticeWidget;
