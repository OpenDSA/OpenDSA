
RoleAdjuster = do(namespace={}) ->
  menuselection = ->

    _create_menulabel = (content) ->
      el = document.createElement 'span'
      el.className = 'menu'
      el.textContent = content
      return el
    window.addEventListener 'load', ->
      menuselections = document.querySelectorAll '.menuselection'
      for menuselection in menuselections
        content = menuselection.textContent
        menuselection.textContent = ''  # clear default value
        menu_elements = (
          _create_menulabel menu_text.replace(/^\s+|\s+$/g, "") for menu_text in content.split '‣')
        for m in menu_elements
          menuselection.appendChild m
          menuselection.appendChild do ->
            el = document.createElement 'span'
            el.className = 'menu-separator icon-rightarrow'
            # el.textContent = MENU_SEPARATOR  #use web font
            return el
      return

  namespace.menuselection = menuselection
  return namespace

RoleAdjuster.menuselection()
