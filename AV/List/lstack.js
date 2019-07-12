// Helper function for creating a pointer
function setPointer(pname, obj) {
  "use strict";
  return obj.jsav.pointer(pname, obj, {visible: true,
    anchor: "left top", myAnchor: "right bottom",
    left: 20, top: -20});
}
