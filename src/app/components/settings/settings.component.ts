import { Component, Inject, OnInit } from '@angular/core';
import { ISettingsService } from '../../services/settings/isettings.service';
import { IPayrollSettings } from '../../entities/payrollSettings';
import { LoggingService } from '../../services/logging/logging.service';
import { payInterval } from '../../entities/globals';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {

  settings: IPayrollSettings;

  constructor(@Inject('ISettingsService') private settingsService: ISettingsService,
              private loggingService: LoggingService) {
  }

  ngOnInit() {
    this.settingsService.get()
    .subscribe(
      (data) => {
        this.settings = data;
      },
      (error) => {
        this.loggingService.logError(error);
        this.settings = null;
      },
    );
  }

  getPayIntervalString() {
    if (this.settings == null) {
      return null;
    }

    return payInterval[this.settings.payInterval];
  }
}
