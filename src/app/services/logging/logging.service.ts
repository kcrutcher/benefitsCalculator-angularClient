import { Injectable } from '@angular/core';

@Injectable()
export abstract class LoggingService {

  public logError(message?: any, args?: any): void { }
  public logWarning(message?: any, args?: any): void { }
  public logInformation(message?: any, args?: any): void { }
}
