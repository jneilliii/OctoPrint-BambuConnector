/*
 * View model for OctoPrint-BambuConnector
 *
 * Author: jneilliii
 * License: AGPL-3.0-or-later
 */
$(function () {
    function Bambu_connectorViewModel(parameters) {
        var self = this;

        self.settingsViewModel = parameters[0];

        self.starting_print = ko.observable(false);

        self.onBeforePrintStart = function(start_print_command, data) {
            if (data.origin && data.origin === "printer") {
                self.start_print_command = function() {
                    start_print_command();
                    self.starting_print(false);
                    $("#bambu_connector_print_options").modal('hide');
                };
                $("#bambu_connector_print_options").modal('show');
                return false;
            }
            return true;
        };

        self.accept_print_options = function() {
            self.starting_print(true);
            self.settingsViewModel.saveData(undefined, self.start_print_command);
        };

        self.cancel_print_options = function() {
            $("#bambu_connector_print_options").modal('hide');
        };
    }

    OCTOPRINT_VIEWMODELS.push({
        construct: Bambu_connectorViewModel,
        dependencies: ["settingsViewModel"],
        elements: ["#settings_plugin_bambu_connector", "#bambu_connector_print_options"]
    });
});
