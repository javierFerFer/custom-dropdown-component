import { animate, animateChild, query, state, style, transition, trigger } from "@angular/animations";

export const showHideTriggerAnimation = trigger('showOpenClose', [
    transition(':enter', [
      query('@*', animateChild(), {optional: true}),
      style({
        gridTemplateRows: '0fr',
      }),
      animate(
        '0.3s',
        style({
          gridTemplateRows: '1fr',
        })
      ),
    ]),
    transition(':leave', [
      style({
        gridTemplateRows: '1fr',
      }),
      animate(
        '0.3s',
        style({
          gridTemplateRows: '0fr',
        })
      ),
    ]),
  ]);


  export const rotate90Degrees = trigger('rotate', [
    // ...
    state(
      'normal',
      style({
      }),
    ),
    state(
      'rotate',
      style({
        transform: 'rotate(-90deg)',
      }),
    ),
    transition('normal <=> rotate', [animate('0.3s')]),
  ]);

  export const fadeInFadeOut = trigger('fadeInFadeOut', [
    transition(':enter', [
      style({
        opacity: '0',
      }),
      animate(
        '0.4s',
        style({
          opacity: '1',
        })
      ),
    ]),
    // transition(':leave', [
    //   style({
    //     opacity: '1',
    //   }),
    //   animate(
    //     '0.4s',
    //     style({
    //       opacity: '0',
    //     })
    //   ),
    // ]),
  ]);