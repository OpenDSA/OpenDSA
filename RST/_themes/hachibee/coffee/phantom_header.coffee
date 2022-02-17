SELECTOR_OF_HEADER = '#top-header'
ELEMENT_OF_HEADER = document.querySelector SELECTOR_OF_HEADER

SELECTOR_OF_RAISETOP_BUTTON = '#raise-top'
ELEMENT_OF_RAISETOP_BUTTON = document.querySelector SELECTOR_OF_RAISETOP_BUTTON

ElementAdjuster = do(namespace=ElementAdjuster || {}) ->
  namespace.phantom_header = ->
    scroll_y = document.documentElement.scrollTop || document.body.scrollTop
    if scroll_y <= 30
      ELEMENT_OF_HEADER.className = ""
    else
      ELEMENT_OF_HEADER.className = "modest"

  namespace.phantom_raise_top_button = ->
    scroll_y = document.documentElement.scrollTop || document.body.scrollTop
    raiser_style = ELEMENT_OF_RAISETOP_BUTTON.style
    if scroll_y <= 30
      raiser_style.bottom = "-70px"
    else if scroll_y <= 330
      raiser_style.bottom = "#{70 - (330 - scroll_y)}px"
    else
      raiser_style.bottom = "70px"

  return namespace


window.addEventListener 'scroll', ElementAdjuster.phantom_header
window.addEventListener 'scroll', ElementAdjuster.phantom_raise_top_button
