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

  it('should render two visible buttons', fakeAsync(() => {
    tick();
    fixture.whenStable().then(() => {
      let element = fixture.nativeElement as HTMLElement;
      expect(element.querySelectorAll('sky-action-button').length).toBe(2);
    });
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
    element.querySelector('.sky-action-button').click();
    fixture.whenStable().then(() => {
      expect(spy.calls.any()).toBe(true);
    });
  }));
});
