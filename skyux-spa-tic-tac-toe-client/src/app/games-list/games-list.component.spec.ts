import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { expect, SkyAppTestModule } from '@blackbaud/skyux-builder/runtime/testing/browser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

import { GamesListComponent } from './games-list.component';
import { GamesService, GameModel } from '../shared/games.service';

function game(id): GameModel {
  return {
    id: id,
    startedOn: new Date(),
    board: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
    humanPlayerFirst: true
  };
}

describe('GamesListComponent', () => {
  let component: GamesListComponent;
  let fixture: ComponentFixture<GamesListComponent>;
  let service: GamesService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ SkyAppTestModule ],
      providers: [ GamesService ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesListComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(GamesService);
  });

  it('should render a list of games', fakeAsync(() => {
    let spy = spyOn(service, 'getAll')
      .and.returnValue(Observable.from<GameModel[]>([[game(3), game(4)]]));
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    let element = fixture.nativeElement as HTMLElement;
    let list = element.querySelector('ul');
    expect(list.children.length).toBe(2);
  }));

  it('should render no games on error', fakeAsync(() => {
    let spy = spyOn(service, 'getAll')
      .and.returnValue(Observable.throw<string>("ERROR!"));
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    let element = fixture.nativeElement as HTMLElement;
    let list = element.querySelector('ul');
    expect(list.children.length).toBe(0);
  }));

  it('should render an error message on error', fakeAsync(() => {
    let spy = spyOn(service, 'getAll')
      .and.returnValue(Observable.throw<string>("ERROR!"));
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    let element = fixture.nativeElement as HTMLElement;
    expect(element.innerHTML).toContain('ERROR!');
  }));
});
