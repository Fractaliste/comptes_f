import { ErrorHandler as AngularErrorHandler, Injectable } from "@angular/core";
import { BackendService } from "../services/backend.service";
import { BusService } from "../services/bus/bus.service";

@Injectable()
export class ErrorHandler implements AngularErrorHandler {

    constructor(private eventBus: BusService, private backendService: BackendService) {
    }

    handleError(error: any) {
        this.eventBus.emit(BusService.ErrorMessageEventType, error)
    }
}