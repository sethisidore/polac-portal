import { UiModule } from './ui.module';

describe('UiModule', () => {
  let uiModule: UiModule;

  beforeEach(() => {
    uiModule = new UiModule(UiModule);
  });

  it('should create an instance', () => {
    expect(uiModule).toBeTruthy();
  });
});
