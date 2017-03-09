import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { expect, SkyAppTestModule } from '@blackbaud/skyux-builder/runtime/testing/browser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

import { CreateGameComponent } from './create-game.component';
import { GamesService, GameModel } from '../shared/games.service';

describe('CreateGameComponent', () => {
  let component: CreateGameComponent;
  let fixture: ComponentFixture<CreateGameComponent>;
  let service: GamesService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ SkyAppTestModule ],
      providers: [ GamesService ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGameComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(GamesService);
  });

  it('should render a visible button', () => {
    let element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('button')).toBeVisible();
  });

  it('should render a checked checkbox by default', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    let element = fixture.nativeElement as HTMLElement;
    let checkbox = element.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  }));

  it('should render an unchecked checkbox when human player first is false', fakeAsync(() => {
    component.isHumanPlayerFirst = false;
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    let element = fixture.nativeElement as HTMLElement;
    let checkbox = element.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
  }));

  it('should create a game when the button is clicked', async(() => {
    let model = {
      id: 3,
      startedOn: new Date(),
      board: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      humanPlayerFirst: false
    };
    let spy = spyOn(service, 'create')
      .and.returnValue(Observable.from<GameModel>([model]));
    let element = fixture.nativeElement as HTMLElement;
    element.querySelector('button').click();
    fixture.whenStable().then(() => {
      expect(spy.calls.any()).toBe(true);
    });
  }));
});
