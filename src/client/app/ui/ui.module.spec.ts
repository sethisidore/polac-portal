import { UiModule } from './ui.module';

describe('UiModule', () => {
  let uiModule: UiModule;

  beforeEach(() => {
    uiModule = new UiModule();
  });

  it('should create an instance', () => {
    expect(uiModule).toBeTruthy();
  });

  it('should throw an error if its imported by another', () => {
    const importModule = new UiModule(UiModule);
    expect(importModule).toThrowError('Should only be imported by AppModule');
  });
});
