import { Injectable, OnModuleInit, OnApplicationBootstrap, OnModuleDestroy, BeforeApplicationShutdown, OnApplicationShutdown } from '@nestjs/common';

@Injectable()
export class AppService implements OnModuleInit, OnApplicationBootstrap, OnModuleDestroy, BeforeApplicationShutdown, OnApplicationShutdown{
  constructor() {
    console.log('1. Constructor');
  }

  onModuleInit() {
    console.log('2. Module Init');
  }

  onApplicationBootstrap() {
    console.log('3. App Bootstrap');
  }

  onModuleDestroy() {
    console.log('4. Module Destroy');
  }

  beforeApplicationShutdown(signal?: string) {
    console.log('5. Before Shutdown', signal);
  }

  onApplicationShutdown(signal?: string) {
    console.log('6. App Shutdown', signal);
  }

  getHello(): string {
    return 'Hello World!';
  }
}