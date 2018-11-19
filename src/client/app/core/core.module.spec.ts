import { CoreModule } from './core.module';

describe('CoreModule', () => {
  let coreModule: CoreModule;

  beforeEach(() => {
    coreModule = new CoreModule();
  });

  it('should create an instance', () => {
    expect(coreModule).toBeTruthy();
  });

  it('should throw an error if its imported by another', () => {
    const importModule = new CoreModule(CoreModule);
    expect(importModule).toThrowError('Should only be imported by AppModule');
  });
});
