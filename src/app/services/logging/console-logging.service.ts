import { Injectable } from '@angular/core';
import { LoggingService } from './logging.service';

@Injectable()
export class ConsoleLoggingService implements LoggingService {

  public logError(message?: any, args?: any): void {
    console.error(message, args);
  }

  public logWarning(message?: any, args?: any): void {
    console.warn(message, args);
  }

  public logInformation(message?: any, args?: any): void {
    console.log(message, args);
  }
}
