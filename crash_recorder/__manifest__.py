# Copyright (c) 2021, Joren Van Onder <joren@jvo.sh>
#
# This file is part of crash-recorder.
#
# crash-recorder is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# crash-recorder is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with crash-recorder.  If not, see <https://www.gnu.org/licenses/>.
{
    "name": "Crash Recorder",
    "category": "Tools",
    "summary": "Automatically record user actions leading to errors.",
    "version": "17.0.1.0.0",
    "depends": ["web"],
    "data": [
        "views/rrweb_recording_views.xml",
        "security/ir.model.access.csv",
    ],
    "assets": {
        "web.assets_backend": [
            "crash_recorder/static/lib/rrweb/js/rrweb-all.min.js",
            "crash_recorder/static/src/js/rrweb.js",
            "crash_recorder/static/lib/rrweb/css/style.min.css",
            "crash_recorder/static/lib/rrweb/js/index.min.js",
            "crash_recorder/static/src/js/rrweb_field.js",
            "crash_recorder/static/src/js/rrweb_systray.js",
            "crash_recorder/static/src/scss/crash_recorder_systray.scss",
            "crash_recorder/static/src/xml/*.xml",
        ],
    },
    "author": "Joren Van Onder, Mihran Thalhath",
    "license": "LGPL-3",
}
