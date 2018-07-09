import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SettingsComponent } from './components/settings/settings.component';

import { SettingsRemoteService } from './services/settings-remote.service';
import { LoggingService } from '../../services/logging/logging.service';
import { ConsoleLoggingService } from '../../services/logging/console-logging.service';

@NgModule({
    imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
    ],
    declarations: [
        SettingsComponent,
    ],
    providers: [
        { provide: 'ISettingsService', useClass: SettingsRemoteService },
        { provide: LoggingService, useClass: ConsoleLoggingService },
    ],
    exports: [
        SettingsComponent,
    ],
  })
  export class SettingsModule {
  }
