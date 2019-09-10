export var SelectType;

(function (SelectType) {
  SelectType[SelectType["None"] = 0] = "None";
  SelectType[SelectType["Single"] = 1] = "Single";
  SelectType[SelectType["All"] = 2] = "All";
  SelectType[SelectType["Only"] = 3] = "Only";
  SelectType[SelectType["Start"] = 4] = "Start";
  SelectType[SelectType["Middle"] = 5] = "Middle";
  SelectType[SelectType["End"] = 6] = "End";
})(SelectType || (SelectType = {}));