import * as Mixpanel from 'mixpanel';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MixpanelService {
  private mixpanel: any;

  constructor() {
    this.mixpanel = Mixpanel.init('e153c58da1bdd4341c1fe8533dd2291d', {
      protocol: 'http',
    });
  }

  public track(eventName: string, action: any = {}): void {
    this.mixpanel.track(eventName, action);
  }
}