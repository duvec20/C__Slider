$(function() {
  var $c__slider = $('.c__hover_slider');
  if (!$c__slider.length) { return; }

  var $c__Track     = $c__slider.find('.c__track'),
      $c__slide     = $c__Track.children('.c__slide'),
      $bg_container = $c__slider.find('.background-container'),
      $slideCount   = $c__slide.length,
      $mqshiftVal   = 25,
      $unit         = 'vw',
      $maxShift     = 0,
      $nextCLick    = 0,
      $shiftVal     = 0;

  /* set breakpoints */
  var mqls = [
    window.matchMedia('(max-width: 980px)'),
    window.matchMedia('(max-width: 768px)')
  ];

  function mediaqueryresponse() {
    var $maxvisible;
    if (mqls[1].matches)      { $mqshiftVal = 80; $maxvisible = 1; }
    else if (mqls[0].matches) { $mqshiftVal = 50; $maxvisible = 2; }
    else                      { $mqshiftVal = 25; $maxvisible = 4; }

    $maxShift  = $slideCount - $maxvisible;
    $nextCLick = 0;
    $shiftVal  = 0;
    $c__Track.css({'transform': 'translateX(0vw)'});
  }

  for (var i = 0; i < mqls.length; i++) {
    mqls[i].addEventListener('change', mediaqueryresponse);
  }
  mediaqueryresponse();

  /* active state + background image */
  $c__slide.filter('.is-active').find('.slide-img').clone().appendTo($bg_container);

  $c__slide.on('mouseenter', function(e) {
    $c__slide.removeClass('is-active');
    $bg_container.find('.slide-img').addClass('old-img').fadeOut(300, function() { $(this).remove(); });

    var $currentTarget = $(e.currentTarget);
    $currentTarget.find('.slide-img').clone().appendTo($bg_container);
    $currentTarget.addClass('is-active');
  });

  /* track movement */
  function moveLeft() {
    $nextCLick++;
    if ($nextCLick <= $maxShift) {
      $shiftVal = -$mqshiftVal * $nextCLick;
    } else {
      $nextCLick = 0;
      $shiftVal  = 0;
    }
    $c__Track.css({'transform': 'translateX(' + $shiftVal + $unit + ')'});
  }

  function moveRight() {
    if (($mqshiftVal + $shiftVal) <= 0) {
      $nextCLick--;
      $shiftVal = $mqshiftVal + $shiftVal;
      $c__Track.css({'transform': 'translateX(' + $shiftVal + $unit + ')'});
    }
  }

  $c__slider.find('.next-slider-arrow').on('click', moveLeft);
  $c__slider.find('.prev-slider-arrow').on('click', moveRight);

  /* swipe */
  var mc = new Hammer(document.getElementById('c__Track'));
  mc.on('swipeleft', moveLeft);
  mc.on('swiperight', moveRight);
});
